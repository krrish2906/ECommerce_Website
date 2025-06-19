import OrderRepository from "../repository/OrderRepository.js";
import ProductRepository from "../repository/ProductRepository.js";
import UserRepository from "../repository/UserRepository.js";

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

            // Create the order;
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
}