import CrudRepository from "./CrudRepository.js";
import Order from "../models/Order.js";

class OrderRepository extends CrudRepository {
    constructor() {
        super(Order);
    }

    async findOrdersByUserId(userId) {
        try {
            const orders = await Order.find({ userId }).populate('items.product')
            .populate('address').sort({ createdAt: -1 });
            return orders;
        } catch (error) {
            throw new Error(`Error finding orders for user ${userId}: ${error.message}`);
        }
    }

    async updateOrderStatus(orderId, status) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
            return updatedOrder;
        } catch (error) {
            throw new Error(`Error updating order status: ${error.message}`);
        }
    }
    
    async updateOrderPaymentStatus(orderId, isPaid) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { isPaid }, { new: true });
            return updatedOrder;
        } catch (error) {
            throw new Error(`Error updating order status: ${error.message}`);
        }
    }

    async findAllOrders() {
        try {
            const orders = await Order.find({}).populate('items.product address').sort({ createdAt: -1 });
            return orders;
        } catch (error) {
            throw error;
        }
    }
}

export default OrderRepository;
