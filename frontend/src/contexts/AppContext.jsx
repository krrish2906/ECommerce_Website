import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { dummyProducts } from "../assets/assets";
import { toast } from 'react-hot-toast'
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    
    const currency = import.meta.env.VITE_CURRENCY;
    const isFirstCartSync = useRef(true);

    // Navigate:-
    const navigate = useNavigate();

    // States:-
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [sellerProducts, setSellerProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});


    // Functions:-
    const fetchSellerStatus = async () => {
        try {
            const { data } = await axios.get('/api/v1/seller/auth/verify');
            if(data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            error;
            setIsSeller(false);
        }
    }
    
    const fetchUserStatus = async () => {
        try {
            const { data } = await axios.get('/api/v1/user/auth/verify');
            if(data.success) {
                // set User:-
                setUser(data.data);
                const cartObj = {};
                data.data.cart.forEach(item => {
                    cartObj[item.product] = item.quantity;
                });
                // set Cart:-
                setCartItems(cartObj);
            } else {
                setUser(null);
            }
        } catch (error) {
            error;
            setUser(null);
        }
    }

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products`);
            if(data.success) {
                setProducts(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    const fetchSellerProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/products/seller`);
            if(data.success) {
                setSellerProducts(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getCartItemsCount = () => {
        let totalCount = 0;
        if(cartItems) {
            for(const item in cartItems) {
                totalCount += cartItems[item];
            }
        }
        return totalCount;
    }

    const getCartTotalAmount = () => {
        let totalCost = 0;
        for(const item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);
            if(itemInfo && cartItems[item] > 0) {
                totalCost += cartItems[item] * (itemInfo.offerPrice || itemInfo.price);
            }
        }
        return Math.floor(totalCost * 100 ) / 100;
    }

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to Cart!');
    }
    
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart Updated!')
    }
    
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('Removed from Cart!');
        setCartItems(cartData);
    }


    // useEffect:-
    useEffect(() => {
        fetchSellerStatus();
        fetchUserStatus();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (user) {
            if (isFirstCartSync.current) {
                isFirstCartSync.current = false;
                return;
            }
            const updateUserCartItems = async () => {
                try {
                    const cartData = Object.entries(cartItems).filter(([product, quantity]) => product && quantity > 0)
                    .map(([product, quantity]) => ({
                        product,
                        quantity
                    }));

                    const { data } = await axios.patch('/api/v1/user/cart', { cartData }, {
                        validateStatus: function (status) {
                            return status < 500; 
                        }
                    });
                    
                    if(!data.success) {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
            updateUserCartItems();
        }
    }, [cartItems, user]);


    const value = {
        navigate, axios,
        user, setUser,
        isSeller, setIsSeller,
        showUserLogin, setShowUserLogin,
        products, sellerProducts, fetchSellerProducts,
        cartItems, currency,
        addToCart, updateCartItem, removeFromCart,
        getCartItemsCount, getCartTotalAmount,
        searchQuery, setSearchQuery
    };

    return <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
};

export const useAppContext = () => {
    return useContext(AppContext);
}