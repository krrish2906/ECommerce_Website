import razorpayInstance from "../config/razorpayConfig.js";
import serverConfig from "../config/serverConfig.js";
import crypto from 'crypto'
import { RazorpayError } from './errors.js';

export const createRazorpayOrder = async (amount, receipt = null) => {
    // Generate unique receipt if not provided;
    const orderReceipt = receipt || `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    try {
        const order = await razorpayInstance.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: orderReceipt
        });
        if(!order) {
            throw new RazorpayError("Order cannot be created");
        }
        return order;
    } catch (error) {
        throw error;
    }
}

export const generateSignature = (orderId, paymentId) => {
    // 1.) Get Razorpay Secret;
    const secret = serverConfig.RAZORPAY_KEY_SECRET;
    
    // 2.) Generate Hmac using sha256 algorithm and Razorpay secret;
    const hmac = crypto.createHmac("sha256", secret);
    
    // 3.) Update Hmac ---> orderId + "|" + paymentId
    hmac.update(orderId + "|" + paymentId);
    
    // 4.) Digest Hmac ---> hmac.digest('hex');
    const generatedSignature = hmac.digest('hex');

    // 5.) Return the generated signature;
    return generatedSignature;
}