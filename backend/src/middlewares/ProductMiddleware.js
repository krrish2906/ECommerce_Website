export const validateProductInfo = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some product details are missing'
        });
    }

    const productData = JSON.parse(req.body.productData);
    const { name, description, price, category } = productData;
    const hasImages = req.files && req.files.length > 0;
    
    if (!name || !description || !price || !category || !hasImages) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some product details are missing'
        });
    }
    req.body.productData = productData;
    next();
}