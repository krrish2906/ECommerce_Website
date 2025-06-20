import CrudRepository from "./CrudRepository.js";
import Product from "../models/Product.js";

class ProductRepository extends CrudRepository {
    constructor() {
        super(Product)
    }

    async findProductByIdAndUpdate(productId, productData) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async findProductsBySellerId(sellerId) {
        try {
            const products = await Product.find({ seller: sellerId });
            return products;
        } catch (error) {
            throw error;
        }
    }
}

export default ProductRepository;