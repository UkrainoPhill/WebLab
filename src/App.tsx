import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/page/Home/Home";
import HomeLayout from "./components/page/HomeLayout/HomeLayout";
import Catalog from "./components/page/Catalog/Catalog";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Home/>} />
                <Route path="catalog" element={<Catalog/>} />
            </Route>
        </Routes>
    );
}

export default App;