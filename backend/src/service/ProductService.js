import ProductRepository from "../repository/ProductRepository.js";
import uploadImagesOnCloudinary from "../utils/cloudinaryUtils.js";

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async addProduct(productData) {
        try {
            // upload product images:-
            const imageUrls = await uploadImagesOnCloudinary(productData.images);
            productData.images = imageUrls;
            const newProduct = await this.productRepository.create(productData);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const  products = await this.productRepository.findAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.productRepository.findById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateStock(productId, productData) {
        try {
            const product = this.productRepository.findProductByIdAndUpdate(productId, productData);
            return product;
        } catch (error) {
            throw error;
        }
    }
}

export default ProductService;