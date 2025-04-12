import React from 'react'
import { Outlet } from "react-router-dom";
import Header from './header';
import Footer from './footer';
import ScrollProgressBar from './ProgressBar';


const Layout = () => {
    return (
        <div>
            <ScrollProgressBar/>
            <Header />
            <main className="px-4 pb-3 mt-[84px]">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout