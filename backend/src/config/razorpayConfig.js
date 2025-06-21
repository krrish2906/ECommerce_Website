import razorpay from 'razorpay';
import serverConfig from './serverConfig.js';

const razorpayInstance = new razorpay({
    key_id: serverConfig.RAZORPAY_KEY_ID,
    key_secret: serverConfig.RAZORPAY_KEY_SECRET
});

export default razorpayInstance;