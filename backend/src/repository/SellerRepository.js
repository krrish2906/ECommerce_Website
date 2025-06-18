import CrudRepository from "./CrudRepository.js";
import Seller from "../models/Seller.js";

class SellerRepository extends CrudRepository {
    constructor() {
        super(Seller);
    }

    async findBySellerId(sellerId) {
        try {
            const seller = await Seller.findOne({ user: sellerId });
            return seller;
        } catch (error) {
            throw error;
        }
    }
}

export default SellerRepository;