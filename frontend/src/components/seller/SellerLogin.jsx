import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

function SellerLogin() {
    const { isSeller, setIsSeller, navigate, axios } = useAppContext();

    const [state, setState] = useState('login');
    const [name, setName] = useState('');
    const [storeName, setStoreName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isSeller) {
            navigate('/seller');
        }
    }, [isSeller]);

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const payload = state === 'signup' ?
            {
                name: name.trim(),
                storeName: storeName.trim(),
                email: email.trim(),
                password
            } :
            {
                email: email.trim(),
                password
            };

            const { data } = await axios.post(`/api/v1/seller/${state}`, payload, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });

            if (data.success) {
                setIsSeller(true);
                navigate('/seller');
                toast.success(data.message);
                setName('');
                setStoreName('');
                setEmail('');
                setPassword('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return !isSeller && (
        <form onSubmit={submitHandler} className="min-h-screen flex items-center text-sm text-gray-600">
            <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">
                        Seller
                    </span>
                    {state === 'login' ? 'Login' : 'Sign Up'}
                </p>
                {
                    state === 'signup' && (
                        <>
                            <div className="w-full">
                                <p>Name</p>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    required
                                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                />
                            </div>
                            <div className="w-full">
                                <p>Store Name</p>
                                <input
                                    type="text"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    placeholder="Store Name"
                                    required
                                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                                />
                            </div>
                        </>
                    )
                }
                <div className="w-full">
                    <p>Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                    />
                </div>

                <p>
                    {
                        state === 'login' ? (
                            <>
                                Don't have an account?{' '}
                                <span
                                    onClick={() => setState('signup')}
                                    className="text-primary cursor-pointer"
                                >
                                    Sign Up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <span
                                    onClick={() => setState('login')}
                                    className="text-primary cursor-pointer"
                                >
                                    Login
                                </span>
                            </>
                        )
                    }
                </p>

                <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
                    { state === 'login' ? 'Login' : 'Create Account' }
                </button>
            </div>
        </form>
    );
}

export default SellerLogin;