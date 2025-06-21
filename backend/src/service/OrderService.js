import OrderRepository from "../repository/OrderRepository.js";
import ProductRepository from "../repository/ProductRepository.js";
import UserRepository from "../repository/UserRepository.js";
import { createRazorpayOrder, generateSignature } from "../utils/razorpayUtils.js";

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();
        this.productRepository = new ProductRepository();
        this.userRepository = new UserRepository();
    }

    async placeCashOnDeliveryOrder(orderData) {
        try {
            // Check if user is a buyer/seller, if 'seller' can't proceed;
            const user = await this.userRepository.findById(orderData.userId);
            if (user.role === 'seller') {
                throw new Error("Sellers are not allowed to place orders");
            }

            // Calculate total order amount;
            let amount = 0;
            for (const item of orderData.items) {
                const product = await this.productRepository.findById(item.product);
                const price = product.offerPrice ? product.offerPrice : product.price;
                amount += price * item.quantity;
            }

            // Add tax (considering 2% only i.e hardcoded);
            amount += Math.floor(amount * 0.02);

            // Create the order with paymentType: 'Cash On Delivery';
            const order = await this.orderRepository.create({
                ...orderData, amount,
                paymentType: 'Cash On Delivery'
            });
            return order;
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByUserId(userId) {
        try {
            const orders = await this.orderRepository.findOrdersByUserId(userId);
            return orders;
        } catch (error) {
            throw error;
        }
    }
    
    async getOrdersBySellerId(sellerId) {
        try {
            const orders = await this.orderRepository.findAllOrders();
            const sellerOrders = orders.filter(order =>
                order.items.some(item =>
                    item.product && item.product.seller && item.product.seller.toString() === sellerId
                )
            ).map(order => {
                // Filter items to only those belonging to seller with sellerId;
                const filteredItems = order.items.filter(item =>
                    item.product && item.product.seller && item.product.seller.toString() === sellerId
                );

                // Calculate sellerAmount for these items (considers only base amount);
                const sellerAmount = filteredItems.reduce((sum, item) => {
                    const price = item.product.offerPrice || item.product.price;
                    return sum + price * item.quantity;
                }, 0);

                return {
                    ...order.toObject(),
                    items: filteredItems,
                    amount: sellerAmount
                };
            });
            return sellerOrders;
        } catch (error) {
            throw error;
        }
    }

    async placeOnlinePaymentOrder(orderData) {
        try {
            // Check if user is a buyer/seller, if 'seller' can't proceed;
            const user = await this.userRepository.findById(orderData.userId);
            if (user.role === 'seller') {
                throw new Error("Sellers are not allowed to place orders");
            }

            // Calculate total order amount;
            let amount = 0;
            for (const item of orderData.items) {
                const product = await this.productRepository.findById(item.product);
                const price = product.offerPrice ? product.offerPrice : product.price;
                amount += price * item.quantity;
            }

            // Add tax (considering 2% only i.e hardcoded);
            amount += Math.floor(amount * 0.02);
            
            // Create the order in MongoDB first with paymentType: 'Online Payment';
            const order = await this.orderRepository.create({
                ...orderData, amount,
                paymentType: 'Online Payment'
            });
            
            // Create Razorpay order using MongoDB order ID as receipt
            const razorpayOrder = await createRazorpayOrder(amount, order._id.toString());
            return {
                order,
                razorpayOrder
            };
        } catch (error) {
            throw error;
        }
    }

    async validatePayment(paymentData) {
        try {
            const { orderId, paymentId, signature, _id } = paymentData;
            const generatedSignature = generateSignature(orderId, paymentId);
            const isValid = generatedSignature === signature;

            if (isValid) {
                // If valid, update isPaid status from false -> true;
                const updatedOrder = await this.orderRepository.updateOrderPaymentStatus(_id, isValid);
            } else {
                // else, delete the order from Database;
                const deletedOrder = await this.orderRepository.destroy(_id);
            }
            return isValid;
        } catch (error) {
            throw error;
        }
    }

    async trashOrder(orderId) {
        try {
            const trashedOrder = await this.orderRepository.destroy(orderId);
            return trashedOrder;
        } catch (error) {
            throw error;
        }
    }
}

export default OrderService;