export const validateAddressInfo = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some address details are missing'
        });
    }

    const { firstName, lastName, street, city, state, zipcode, country, phone } = req.body;
    if (!firstName || !lastName || !street || !city || !state || !zipcode || !country || !phone) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some address details are missing'
        });
    }
    next();
}