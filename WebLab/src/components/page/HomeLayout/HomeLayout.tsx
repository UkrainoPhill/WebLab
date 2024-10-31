import React, {Fragment} from 'react';
import Header from "../../features/Header/Header";
import Footer from "../../features/Footer/Footer";
import {Outlet} from "react-router-dom";

const HomeLayout = () => {
    return (
        <Fragment>
            <Header/>
            <Outlet/>
            <Footer/>
        </Fragment>
    );
};

export default HomeLayout;