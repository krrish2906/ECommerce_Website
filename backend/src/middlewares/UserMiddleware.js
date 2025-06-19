import { verifyToken } from '../utils/passwordUtils.js';

export const validateUserInfo = (req, res, next) => {
    if(!req.body) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }

    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            error: 'Some credentials are missing'
        });
    }
    next();
}

export const validateUserLoginInfo = (req, res, next) => {
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

export const isAuthenticated = (req, res, next) => {
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