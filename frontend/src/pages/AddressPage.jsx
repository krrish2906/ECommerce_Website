import React, { useState } from 'react'
import { assets } from '../assets/assets'

function Input({ type, placeholder, name, handleChange, address }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            value={address[name]}
            required
            className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        />
    );
}

function AddressPage() {

    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        zipcode: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitHandler = async (event) => {
        event.preventDefault();
    }

    return (
        <div className='mt-12 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping {" "}
                <span className='font-semibold text-primary'>
                    Address
                </span>
            </p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-8'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={submitHandler} className='space-y-3 mt-2 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <Input
                                handleChange={handleChange} address={address}
                                name='firstname' type='text' placeholder='First Name'
                            />
                            <Input
                                handleChange={handleChange} address={address}
                                name='lastname' type='text' placeholder='Last Name'
                            />
                        </div>
                        <Input
                            handleChange={handleChange} address={address}
                            name='email' type='email' placeholder='Email Address'
                        />
                        <Input
                            handleChange={handleChange} address={address}
                            name='street' type='text' placeholder='Street'
                        />
                        <div className='grid grid-cols-2 gap-4'>
                            <Input
                                handleChange={handleChange} address={address}
                                name='city' type='text' placeholder='City'
                            />
                            <Input
                                handleChange={handleChange} address={address}
                                name='state' type='text' placeholder='State'
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <Input
                                handleChange={handleChange} address={address}
                                name='zipcode' type='number' placeholder='ZIP Code'
                            />
                            <Input
                                handleChange={handleChange} address={address}
                                name='country' type='text' placeholder='Country'
                            />
                        </div>
                        <Input
                            handleChange={handleChange} address={address}
                            name='phone' type='text' placeholder='Phone number'
                        />
                        <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase rounded-lg'>
                            Save Address
                        </button>
                    </form>
                </div>
                <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_image} alt="Add address" />
            </div>
        </div>
    )
}

export default AddressPage