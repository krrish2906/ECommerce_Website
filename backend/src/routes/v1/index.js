import express from 'express';
const router = express.Router();


// User Middlewares, Controllers & Routes:-
import { validateUserInfo, validateUserLoginInfo, isAuthenticated } from '../../middlewares/UserMiddleware.js'
import { signup, login, logout, checkAuth, updateUserCart } from '../../controllers/UserController.js';

router.post('/user/signup', validateUserInfo, signup);
router.post('/user/login', validateUserLoginInfo, login);
router.post('/user/logout', isAuthenticated, logout);
router.get('/user/auth/verify', isAuthenticated, checkAuth);
router.patch('/user/cart', isAuthenticated, updateUserCart);


// Seller Middlewares, Controllers & Routes:-
import { validateSellerInfo, validateSellerLoginInfo, isSellerAuthenticated } from '../../middlewares/SellerMiddleware.js';
import { signupSeller, loginSeller, logoutSeller, checkSellerAuth } from '../../controllers/SellerController.js'

router.post('/seller/signup', validateSellerInfo, signupSeller);
router.post('/seller/login', validateSellerLoginInfo, loginSeller);
router.post('/seller/logout', isSellerAuthenticated, logoutSeller);
router.get('/seller/auth/verify', isSellerAuthenticated, checkSellerAuth);


// Product Middlewares, Controllers & Routes:-
import { validateProductInfo } from '../../middlewares/ProductMiddleware.js';
import { multiUploader } from '../../middlewares/MulterMiddleware.js';
import { addProduct, getAllProducts, getProductById, updateStock, getProductsBySellerId } from '../../controllers/ProductController.js';

router.post('/product/add', multiUploader, isSellerAuthenticated, validateProductInfo, addProduct);
router.get('/products/seller', isSellerAuthenticated, getProductsBySellerId);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.patch('/product/:id/stock', isSellerAuthenticated, updateStock);


// Address Middlewares, Controllers & Routes:-
import { validateAddressInfo } from '../../middlewares/AddressMiddleware.js';
import { addAddress, getAddressesByUserId } from '../../controllers/AddressController.js';

router.post('/address/add', isAuthenticated, validateAddressInfo, addAddress);
router.get('/address/user/:userId', isAuthenticated, getAddressesByUserId);


// Order Middlewares, Controllers & Routes:-
import { validatePlaceCODOrder } from '../../middlewares/OrderMiddleware.js';
import { placeCashOnDeliveryOrder, getOrdersByUserId, getOrdersBySellerId } from '../../controllers/OrderController.js';

router.post('/order/place-cod', isAuthenticated, validatePlaceCODOrder, placeCashOnDeliveryOrder);
router.get('/orders/user/:userId', isAuthenticated, getOrdersByUserId);
router.get('/orders/seller', isSellerAuthenticated, getOrdersBySellerId);


export default router;