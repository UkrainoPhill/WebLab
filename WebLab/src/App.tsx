import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./components/page/Home/Home";
import HomeLayout from "./components/page/HomeLayout/HomeLayout";
import Catalog from "./components/page/Catalog/Catalog";
import ItemPage from "./components/page/ItemPage/ItemPage";
import Cart from "./components/page/Cart/Cart";
import Checkout from "./components/page/Checkout/Checkout";
import SuccessPage from "./components/page/SuccessPage/SuccessPage";
import RegisterPage from "./components/page/RegisterPage/RegisterPage";
import LoginPage from "./components/page/LoginPage/LoginPage";
import ProtectedRoute from "./components/enities/ProtectedRoute/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
                <Route path="catalog" element={<ProtectedRoute><Catalog/></ProtectedRoute>} />
                <Route path="catalog/:id" element={<ProtectedRoute><ItemPage/></ProtectedRoute>} />
                <Route path="cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
                <Route path="checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
                <Route path="success" element={<ProtectedRoute><SuccessPage/></ProtectedRoute>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;