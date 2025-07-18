import OrderService from "../service/OrderService.js";
const orderService = new OrderService();

export const placeCashOnDeliveryOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await orderService.placeCashOnDeliveryOrder({
            ...orderData,
            userId: req.user.userId
        });
        return res.status(201).json({
            data: order,
            success: true,
            message: "Order placed successfully",
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

export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderService.getOrdersByUserId(userId);
        return res.status(200).json({
            data: orders,
            success: true,
            message: "Orders fetched successfully",
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

export const getOrdersBySellerId = async (req, res) => {
    try {
        const sellerId = req.user.userId;
        const orders = await orderService.getOrdersBySellerId(sellerId);
        return res.status(200).json({
            data: orders,
            success: true,
            message: "Orders fetched successfully",
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

export const placeOnlinePaymentOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await orderService.placeOnlinePaymentOrder({
            ...orderData,
            userId: req.user.userId
        });
        return res.status(201).json({
            data: order,
            success: true,
            message: "Online payment order created successfully",
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

export const verifyPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const response = await orderService.validatePayment(paymentData);
        return res.status(200).json({
            data: response,
            success: response,
            message: response ? "Payment verified successfully!" : "Payment verification failed!",
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

export const trashOrderonFailure = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.trashOrder(id);
        return res.status(200).json({
            data: order,
            success: true,
            message: "Order trashed successfully",
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
}