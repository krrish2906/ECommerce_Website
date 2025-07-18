import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

function AddProduct() {
    const { axios } = useAppContext();

    const [isAdding, setIsAdding] = useState(false);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsAdding(true);
        try {
            const productData = {
                name, description, category,
                price, offerPrice
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for(let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            
            const { data } = await axios.post('/api/v1/product/add', formData, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });
            
            if (data.success) {
                toast.success(data.message);
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsAdding(false);
        }
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={submitHandler} className="md:px-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {
                            Array(4).fill('').map((item, index) => (
                                <label key={index} htmlFor={`image${index}`}>
                                    <input
                                        onChange={(e) => {
                                            const updatedFiles = [...files];
                                            updatedFiles[index] = e.target.files[0];
                                            setFiles(updatedFiles);
                                        }}
                                        accept="image/*"
                                        type="file"
                                        id={`image${index}`}
                                        hidden
                                    />
                                    <img
                                        className="max-w-24 cursor-pointer"
                                        src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                        alt="uploadArea"
                                        width={100} height={100}
                                    />
                                </label>
                            ))
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">
                        Product Name
                    </label>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">
                        Product Description
                    </label>
                    <textarea
                        id="product-description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                        placeholder="Type here">
                    </textarea>
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {
                            categories.map((item, index) => (
                                <option key={index} value={item.path}>{ item.path }</option>
                            ))
                        }
                    </select>
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">
                            Product Price
                        </label>
                        <input
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">
                            Offer Price
                        </label>
                        <input
                            id="offer-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button
                className={`px-8 py-2.5  hover:bg-primary-dull cursor-pointer text-white font-medium rounded
                ${ isAdding ? 'bg-gray-400 hover:bg-gray-400' : 'bg-primary' }`}>
                    {
                        isAdding ? 'ADDING...' :  'ADD'
                    }
                </button>
            </form>
        </div>
    );
}

export default AddProduct;