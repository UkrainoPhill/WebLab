import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./components/page/Home/Home";
import HomeLayout from "./components/page/HomeLayout/HomeLayout";
import Catalog from "./components/page/Catalog/Catalog";
import ItemPage from "./components/page/ItemPage/ItemPage";
import Cart from "./components/page/Cart/Cart";
import Checkout from "./components/page/Checkout/Checkout";
import SuccessPage from "./components/page/SuccessPage/SuccessPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Home/>} />
                <Route path="catalog" element={<Catalog/>} />
                <Route path="catalog/:id" element={<ItemPage/>} />
                <Route path="cart" element={<Cart/>}/>
                <Route path="checkout" element={<Checkout/>}/>
                <Route path="success" element={<SuccessPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;