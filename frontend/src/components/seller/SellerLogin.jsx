import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'

function SellerLogin() {
    const { isSeller, setIsSeller, navigate } = useAppContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(isSeller) {
            navigate('/seller')
        }
    }, [isSeller]);

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsSeller(true);
    }

    return !isSeller && (
        <form onSubmit={submitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'>
                    <span className='text-primary'>Seller</span> Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                    />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>
                    Login
                </button>
            </div>
        </form>
    )
}

export default SellerLogin