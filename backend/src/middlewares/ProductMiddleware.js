export const validateProductInfo = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some product details are missing'
        });
    }

    const { name, description, price, category } = req.body;
    const hasImages = req.files && req.files.length > 0;
    if (!name || !description || !price || !category || !hasImages) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some product details are missing'
        });
    }
    next();
}