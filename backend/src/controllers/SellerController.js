import SellerService from "../service/SellerService.js";
const sellerService = new SellerService();

export const signupSeller = async (req, res) => {
    try {
        const { userResponse, seller, token } = await sellerService.createSeller(req.body);
        res.cookie('jwt', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        });
        return res.status(201).json({
            data: { user: userResponse, seller },
            success: true,
            message: 'Seller account created successfully',
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const loginSeller = async (req, res) => {
    try {
        const { userResponse, seller, token } = await sellerService.signin(req.body);
        res.cookie('jwt', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        });
        return res.status(200).json({
            data: { user: userResponse, seller },
            success: true,
            message: 'Seller logged in successfully',
            error: null
        });
    } catch (error) {
        if(error.isOperational) {
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                error: error.message
            });
        }
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const logoutSeller = (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        });
        return res.status(200).json({
            data: {},
            success: true,
            message: 'Seller logged out successfully',
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
}

export const checkSellerAuth = (req, res) => {
    try {
        // Check if user is a seller
        if (req.user.role !== 'seller') {
            return res.status(403).json({
                data: {},
                success: false,
                message: 'Access denied. Only sellers can access this resource.',
                error: 'Forbidden'
            });
        }
        return res.status(200).json({
            data: req.user,
            success: true,
            message: 'Seller Authenticated',
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to authenticate seller',
            error: error.message
        });
    }
} 