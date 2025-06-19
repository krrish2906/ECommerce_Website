import express from 'express';
const router = express.Router();

// User Middlewares, Controllers & Routes:-
import { validateUserInfo, validateUserLoginInfo, isAuthenticated } from '../../middlewares/UserMiddleware.js'
import { signup, login, logout, checkAuth } from '../../controllers/UserController.js';

router.post('/user/signup', validateUserInfo, signup);
router.post('/user/login', validateUserLoginInfo, login);
router.post('/user/logout', isAuthenticated, logout);
router.get('/user/auth/verify', isAuthenticated, checkAuth);


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
import { addProduct, getAllProducts, getProductById, updateStock } from '../../controllers/ProductController.js';

router.post('/product/add', multiUploader, isSellerAuthenticated, validateProductInfo, addProduct);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.patch('/product/:id/stock', isSellerAuthenticated, updateStock);

export default router;