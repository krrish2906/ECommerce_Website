import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer';
import Login from './components/Login';
import { useAppContext } from './contexts/AppContext';
import AllProducts from './pages/AllProducts';
import ProductCategory from './components/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AddressPage from './pages/AddressPage';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductsList from './pages/seller/ProductsList';
import Orders from './pages/seller/Orders';

function App() {
    const isSellerPath = useLocation().pathname.includes('seller');
    const { showUserLogin, isSeller } = useAppContext();

    return (
        <div className='text-default min-h-screen text-gray-700 bg-white'>
            { !isSellerPath && <Navbar /> }
            { showUserLogin && <Login /> }
            <div className={`${ isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32' }`}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<AllProducts />} />
                    <Route path='/products/:category' element={<ProductCategory />} />
                    <Route path='/products/:category/:id' element={<ProductDetails />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/add-address' element={<AddressPage />} />
                    <Route path='/myorders' element={<MyOrders />} />
                    <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
                        <Route index element={ isSeller ? <AddProduct /> : null } />
                        <Route path='product-list' element={<ProductsList />} />
                        <Route path='orders' element={<Orders />} />
                    </Route>
                </Routes>
            </div>
            { !isSellerPath && <Footer /> }
        </div>
    )
}

export default App
