import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../contexts/AppContext'
import toast from 'react-hot-toast';

function Navbar() {
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery,
        getCartItemsCount, axios } = useAppContext();
    const [open, setOpen] = useState(false)

    const logout = async () => {
        try {
            const { data } = await axios.post('/api/v1/user/logout', null, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });
            if(data.success) {
                setUser(null);
                navigate('/');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(searchQuery.length > 0) {
            navigate('/products');
        }
    }, [searchQuery]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3 border-b border-gray-300 bg-white relative transition-all">
            
            <NavLink to='/' onClick={() => setOpen(false)}>
                <img className="h-14" src={assets.basket_logo} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink to='/products'>
                    All Products
                </NavLink>
                <NavLink to='/contact'>
                    Contact
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-400 px-4 rounded-full">
                    <input
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img src={assets.search_icon} alt="search" className='size-4' />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        { getCartItemsCount() }
                    </button>
                </div>

                {
                    !user ? (
                        <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                            Login
                        </button>
                    ) : (
                        <div className='relative group'>
                            <img src={assets.profile_icon} alt="profile" className='size-10' />
                            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                                <li
                                onClick={() => navigate('/myorders')}
                                className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>
                                    My Orders
                                </li>
                                <li
                                onClick={logout}
                                className='p-1.5 pl-3 hover:bg-red-600/10 cursor-pointer'>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
            
            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        { getCartItemsCount() }
                    </button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${ open ? 'flex' : 'hidden' } absolute top-[80px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-4 px-5 text-sm md:hidden z-50`}>
                <NavLink
                    to='/'
                    onClick={() => setOpen(false)}
                    className='border-b w-full border-zinc-300 pb-1'
                >
                    Home
                </NavLink>
                <NavLink
                    to='/products'
                    onClick={() => setOpen(false)}
                    className='border-b w-full border-zinc-300 pb-1'
                >
                    All Products
                </NavLink>
                <NavLink to='/contact'
                    onClick={() => setOpen(false)}
                    className='border-b w-full border-zinc-300 pb-1'
                >
                    Contact
                </NavLink>
                {
                    user && (
                        <NavLink
                            to='/myorders'
                            onClick={() => setOpen(false)}
                            className='border-b w-full border-zinc-300 pb-1'
                        >
                            My Orders
                        </NavLink>
                    )
                }
                {
                    !user ? (
                        <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}>
                            Login
                        </button>
                    ) : (
                        <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        onClick={logout}>
                            Logout
                        </button>
                    )
                }
                
            </div>
        </nav>
    );
}

export default Navbar;