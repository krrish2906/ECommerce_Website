import UserService from "../service/UserService.js";
const userService = new UserService();

export const signup = async (req, res) => {
    try {
        const { userResponse, token } = await userService.createUser(req.body);
        res.cookie('jwt', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        });
        return res.status(201).json({
            data: userResponse,
            success: true,
            message: 'Account created successfully',
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

export const login = async (req, res) => {
    try {
        const { userResponse, token } = await userService.signin(req.body);
        res.cookie('jwt', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        });
        return res.status(200).json({
            data: userResponse,
            success: true,
            message: 'User logged in successfully',
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

export const logout = (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development'
        });
        return res.status(200).json({
            data: {},
            success: true,
            message: 'User logged out successfully',
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

export const checkAuth = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await userService.getUserById(userId);
        return res.status(200).json({
            data: user,
            success: true,
            message: 'User Authenticated',
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to authenticate user',
            error: error.message
        });
    }
}

export const updateUserCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { cartData } = req.body;
        const updatedUser = await userService.updateUserCart(userId, cartData);
        return res.status(200).json({
            data: updatedUser,
            success: true,
            message: 'User cart updated successfully',
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to update user cart',
            error: error.message
        });
    }
}