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