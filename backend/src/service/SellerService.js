import SellerRepository from "../repository/SellerRepository.js";
import UserRepository from "../repository/UserRepository.js";
import { hashPassword, generateToken, comparePassword } from '../utils/passwordUtils.js';
import { AppError, AuthenticationError, NotFoundError, ValidationError } from '../utils/errors.js';

class SellerService {
    constructor() {
        this.sellerRepository = new SellerRepository();
        this.userRepository = new UserRepository();
    }

    async createSeller(data) {
        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findByEmail(data.email);
            let user = existingUser;

            if (existingUser) {
                if (existingUser.role === 'buyer') {
                    // Update user role to seller
                    existingUser.role = 'seller';
                    await existingUser.save();
                } else {
                    throw new Error('User/Seller already exists!');
                }
            } else {
                // Create new user with seller role
                const hashedPassword = await hashPassword(data.password);
                const userData = {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    role: 'seller'
                };
                user = await this.userRepository.create(userData);
            }

            // Create seller profile
            const sellerData = {
                user: user._id,
                storeName: data.storeName
            };
            const seller = await this.sellerRepository.create(sellerData);

            // Generate token
            const payload = {
                userId: user._id,
                email: user.email,
                role: user.role
            };
            const token = generateToken(payload);

            // Return response
            const { password, ...userResponse } = user.toObject();
            return { 
                userResponse, 
                seller: seller.toObject(),
                token 
            };
        } catch (error) {
            throw new Error(`Error creating seller: ${error.message}`);
        }
    }

    async signin(data) {
        try {
            // Find User
            const user = await this.userRepository.findByEmail(data.email);
            if (!user) {
                throw new NotFoundError('User not found');
            }

            // Check if user is a seller
            if (user.role !== 'seller') {
                throw new AuthenticationError('Access denied! Only sellers can sign in here.');
            }
            
            // Verify password
            const isPasswordValid = await comparePassword(data.password, user.password);
            if (!isPasswordValid) {
                throw new AuthenticationError('Invalid Credentials');
            }

            // Find seller profile
            const seller = await this.sellerRepository.findBySellerId(user._id);
            if (!seller) {
                throw new NotFoundError('Seller profile not found');
            }

            // Generate token
            const payload = {
                userId: user._id,
                email: user.email,
                role: user.role
            };
            const token = generateToken(payload);

            // Exclude password from response, add token
            const { password, ...userResponse } = user.toObject();
            return { 
                userResponse, 
                seller: seller.toObject(),
                token 
            };
        } catch (error) {
            if(error.isOperational) throw error;
            throw new Error(`Error signing in seller: ${error.message}`);
        }
    }
}

export default SellerService;