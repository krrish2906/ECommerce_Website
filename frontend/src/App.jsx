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

function App() {
    const isSellerPath = useLocation().pathname.includes('seller');
    const { showUserLogin } = useAppContext();

    return (
        <div>
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
                </Routes>
            </div>
            { !isSellerPath && <Footer /> }
        </div>
    )
}

export default App
