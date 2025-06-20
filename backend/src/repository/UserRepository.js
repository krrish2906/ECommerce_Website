import CrudRepository from "./CrudRepository.js";
import User from '../models/User.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findByEmail(userEmail) {
        try {
            const document = await User.findOne({ email: userEmail });
            return document;
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    async updateUserCart(userId, cartData) {
        try {
            const user = await User.findByIdAndUpdate(userId, { cart: cartData }, { new: true });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;