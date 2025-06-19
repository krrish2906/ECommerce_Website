export const validatePlaceCODOrder = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some product details are missing'
        });
    }
    
    const { items, address } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Order must contain at least one item.",
            error: "Missing or empty 'items' in request body."
        });
    }
    if (!address) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Order must have a delivery address.",
            error: "Missing 'address' in request body."
        });
    }
    next();
}; 