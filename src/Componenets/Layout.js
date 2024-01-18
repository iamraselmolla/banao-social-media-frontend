import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Banner from './Header/page/home/Banner/Banner';

const Layout = () => {
    return (
        <main>
            <Header></Header>
            <Banner></Banner>
            <Outlet></Outlet>
            <Footer></Footer>
        </main>
    );
};

export default Layout;