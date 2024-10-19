import React from 'react';
import Header from "../../features/Header/Header";
import Footer from "../../features/Footer/Footer";
import {Outlet} from "react-router-dom";

const HomeLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default HomeLayout;