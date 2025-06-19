import ProductService from "../service/ProductService.js";
const productService = new ProductService();

export const addProduct = async (req, res) => {
    try {
        let productData = req.body;
        productData.seller = req.user.userId;
        if (req.files) {
            productData.images = [...req.files];
        }
        const newProduct = await productService.addProduct(productData);
        return res.status(201).json({
            data: newProduct,
            success: true,
            message: "Product added successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json({
            data: products,
            success: true,
            message: "Products fetched successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Product not found",
                error: "Product not found"
            });
        }
        return res.status(200).json({
            data: product,
            success: true,
            message: "Product fetched successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const updatedProduct = await productService.updateStock(id, productData);
        if (!updatedProduct) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Product not found or stock not updated",
                error: "Product not found or stock not updated"
            });
        }
        return res.status(200).json({
            data: updatedProduct,
            success: true,
            message: "Product stock updated successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};