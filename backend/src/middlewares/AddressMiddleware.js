export const validateAddressInfo = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some address details are missing'
        });
    }

    const { firstname, lastname, street, city, state, zipcode, country, phone, email } = req.body;
    if (!firstname || !lastname || !street || !city || !state || !zipcode || !country || !phone || !email) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some address details are missing'
        });
    }
    if (email !== req.user.email) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "The provided email does not match the user's email.",
            error: 'Email mismatch between address and user.'
        });
    }
    next();
}