import React, { useEffect, useState } from 'react'
import { useAppContext } from '../contexts/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

function CartPage() {
    const {
        products, currency, cartItems, setCartItems, navigate, axios, user,
        removeFromCart, getCartItemsCount, getCartTotalAmount, updateCartItem
    } = useAppContext();

    const [cart, setCart] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("Cash On Delivery");

    const getCart = () => {
        let array = [];
        if(cartItems) {
            for(const key in cartItems) {
                const product = products.find((item) => item._id === key);
                product.quantity = cartItems[key];
                array.push(product);
            }
        }
        setCart(array);
    }

    const getUserAddress = async (userId) => {
        try {
            const { data } = await axios.get(`/api/v1/address/user/${userId}`)
            if(data.success) {
                const fetchedAddresses = data.data;
                setAddresses(fetchedAddresses);
                if(fetchedAddresses.length > 0) {
                    setSelectedAddress(fetchedAddresses[fetchedAddresses.length - 1]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    const placeOrder = async () => {
        try {
            // If address isn't selected;
            if(!selectedAddress) {
                return toast.error('Please select delivery address');
            }

            // prepare Order Data;
            const orderData = {
                address: selectedAddress._id,
                items: cart.map(item => ({
                    product: item._id,
                    quantity: item.quantity
                }))
            };

            if(paymentOption === "Cash On Delivery") {
                // Cash on Delivery Order Api Call;
                const { data } = await axios.post('/api/v1/order/place-cod', { ...orderData }, {
                    validateStatus: function (status) {
                        return status < 500; 
                    }
                });

                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/myorders')
                } else {
                    toast.error(data.message);
                }
            }
            else {
                // Online Payment Order Api Call;
                // do something;
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    useEffect(() => {
        if (user) {
            getUserAddress(user._id);
        }
    }, [user])

    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart {" "}
                    <span className="text-[16px] text-primary pl-2">
                        { `(${ getCartItemsCount() } Items)` }
                    </span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {
                    cart.map((product, index) => (
                        <div
                        key={index}
                        className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            {/*  */}
                            <div className="flex items-center md:gap-6 gap-3">
                                {/*  */}
                                <div
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded" onClick={() => {
                                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                    scrollTo(0,0);
                                }}>
                                    <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                                </div>

                                {/*  */}
                                <div>
                                    <p className="hidden md:block font-semibold">{ product.name }</p>
                                    <div className="font-normal text-gray-500/70">
                                        <p>Weight: <span>{ product.weight || "N/A" }</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <select
                                            value={cartItems[product._id]}
                                            className='outline-none'
                                            onChange={(e) => {
                                                updateCartItem(product._id, Number(e.target.value))
                                            }}>
                                                {
                                                    Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9)
                                                    .fill('').map((item, index) => (
                                                        <option key={index} value={index + 1}>
                                                            { index + 1 }
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*  */}
                            <p className="text-center">
                                { currency }{ (product.offerPrice || product.price) * product.quantity }
                            </p>
                            <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                                <img src={assets.remove_icon} alt="remove" className='inline-block w-6 h-6' />
                            </button>
                        </div>
                    ))
                }

                <button onClick={() => {
                    navigate('/products');
                    scrollTo(0,0);
                }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img src={assets.arrow_right_icon_colored} alt="arrow" className='group-hover:-translate-x-1 transition' />
                    Continue Shopping
                </button>
            </div>
            
            {/* Right Side */}
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {
                                selectedAddress ? 
                                `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` 
                                : 'No address found'
                            }
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {
                            showAddress && (
                                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                    {
                                        addresses.map((address, index) => (
                                            <p
                                                key={index}
                                                onClick={() => {
                                                    setSelectedAddress(address);
                                                    setShowAddress(false);
                                                }}
                                                className="text-gray-500 p-2 hover:bg-gray-100"
                                            >
                                                {address.street}, {address.city}, {address.state}, {address.country}
                                            </p>
                                        ))
                                    }
                                    <p onClick={() => navigate('/add-address')}
                                    className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                        Add address
                                    </p>
                                </div>
                            )
                        }
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select
                    onChange={(e) => setPaymentOption(e.target.value)}
                    className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span>
                        <span>{ currency }{ getCartTotalAmount() }</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span>
                        <span>{ currency }{ getCartTotalAmount() * 2 / 100 }</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span>
                        <span>{ currency }{ getCartTotalAmount() + getCartTotalAmount() * 2 / 100 }</span>
                    </p>
                </div>

                <button
                onClick={placeOrder}
                className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {
                        paymentOption === 'Cash On Delivery' ? 'Place Order' : 'Proceed to Checkout'
                    }
                </button>
            </div>
        </div>
    ) : null;
}

export default CartPage;