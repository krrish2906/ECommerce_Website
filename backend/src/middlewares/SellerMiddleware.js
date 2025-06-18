import { verifyToken } from '../utils/passwordUtils.js';

export const validateSellerInfo = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }

    const { name, email, password, storeName } = req.body;
    if(!name || !email || !password || !storeName) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }
    next();
}

export const validateSellerLoginInfo = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }

    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }
    next();
}

export const isSellerAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) {
        return res.status(401).json({
            data: {},
            success: false,
            message: 'Please sign in to continue',
            error: 'No token provided'
        });
    }

    try {
        const response = verifyToken(token);
        if(!response) {
            return res.status(401).json({
                data: {},
                success: false,
                message: 'Unauthorized Access',
                error: 'Invalid token'
            });
        }

        // Check if user is a seller
        if(response.role !== 'seller') {
            return res.status(403).json({
                data: {},
                success: false,
                message: 'Access denied. Only sellers can access this resource.',
                error: 'Forbidden'
            });
        }

        req.user = response;
        next();
    } catch (error) {
        return res.status(401).json({
            data: {},
            success: false,
            message: 'Unauthorized Access',
            error: 'Invalid token'
        });
    }
}