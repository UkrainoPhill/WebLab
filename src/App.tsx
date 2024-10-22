import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/page/Home/Home";
import HomeLayout from "./components/page/HomeLayout/HomeLayout";
import Catalog from "./components/page/Catalog/Catalog";
import {DestinationProvider} from "./components/context/DestinationContext";
import ItemPage from "./components/page/ItemPage/ItemPage";

function App() {
    return (
        <DestinationProvider>
            <Routes>
                <Route path="/" element={<HomeLayout/>}>
                    <Route index element={<Home/>} />
                    <Route path="catalog" element={<Catalog/>} />
                    <Route path="catalog/:id" element={<ItemPage/>} />
                </Route>
            </Routes>
        </DestinationProvider>
    );
}

export default App;