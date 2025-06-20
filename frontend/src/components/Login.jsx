import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppContext';
import toast from 'react-hot-toast';

function Login() {
    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(`/api/v1/user/${state}`, { name, email, password }, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });

            if(data.success) {
                navigate('/');
                setUser(data.data);
                setShowUserLogin(false);
                toast.success(data.message);
            } else {
                setUser(null);
                setShowUserLogin(true);
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div onClick={() => setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {
                    state === "signup" && (
                        <div className="w-full">
                            <p>Name</p>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="name"
                                className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary"
                                type="text"
                                required
                            />
                        </div>
                    )
                }
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email" className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password" className="border border-gray-300 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                </div>
                {  
                    state === "signup" ? (
                        <p>
                            Already have an account? {" "}
                            <span onClick={() => setState("login")} className="text-primary cursor-pointer">
                                click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Create an account? {" "}
                            <span onClick={() => setState("signup")} className="text-primary cursor-pointer">
                                click here
                            </span>
                        </p>
                    )
                }
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {
                        state === "signup" ? "Create Account" : "Login"
                    }
                </button>
            </form>
        </div>
    );
}

export default Login;