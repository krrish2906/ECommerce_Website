import UserRepository from "../repository/UserRepository.js";
import { hashPassword, generateToken, comparePassword } from '../utils/passwordUtils.js';
import { AuthenticationError, NotFoundError, AlreadyExistsError } from '../utils/errors.js'

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data) {
        try {
            // Find User
            const existingUser = await this.userRepository.findByEmail(data.email);
            if (existingUser) {
                throw new AlreadyExistsError('User already exists!');
            }

            // Hash password
            const hashedPassword = await hashPassword(data.password);
            const userData = { ...data, password: hashedPassword }
            
            // Create user
            const user = await this.userRepository.create(userData);

            // Generate token
            const payload = {
                userId: user._id,
                email: user.email,
                role: user.role
            }
            const token = generateToken(payload);

            // Exclude password from response, add token
            const { password, ...userResponse } = user.toObject();
            return { userResponse, token };
        } catch (error) {
            if(error.isOperational) throw error;
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.userRepository.findById(userId);
            return user;
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    async signin(data) {
        try {
            // Find User
            const user = await this.userRepository.findByEmail(data.email);
            if (!user) {
                throw new NotFoundError('User not found');
            }
            
            // Verify password
            const isPasswordValid = await comparePassword(data.password, user.password);
            if (!isPasswordValid) {
                throw new AuthenticationError('Invalid Credentials');
            }

            // Generate token
            const payload = {
                userId: user._id,
                email: user.email,
                role: user.role
            }
            const token = generateToken(payload);

            // Exclude password from response, add token
            const { password, ...userResponse } = user.toObject();
            return { userResponse, token };
        } catch (error) {
            if(error.isOperational) throw error;
            throw new Error(`Error signing in user: ${error.message}`);
        }
    }
}

export default UserService;