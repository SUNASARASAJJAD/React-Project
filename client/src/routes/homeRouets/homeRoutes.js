import React from "react";
import { Routes, Route } from "react-router-dom"
import Layout from "../../components/clientCompo/layout";
import NotFound from "../../pages/error/notFoundPage";
import Home from "../../pages/client/home"
import SignUp from "../../pages/client/signUp";
import Login from "../../pages/client/login"
import Cart from "../../components/clientCompo/cart";
import CheckoutPage from "../../components/clientCompo/checkOutPage";
import OrderTracking from "../../components/clientCompo/orderTrackingPage";
import CategoryProduct from "../../components/clientCompo/categoryProduct";
import ProductDetail from "../../components/clientCompo/productsDetail";
import AllProducts from "../../components/clientCompo/allProduct";
import ScrollToTop from "../../components/ScrollToTop";
import PrivacyPolicy from "../../components/clientCompo/PrivacyPocicy";
import  Contact  from "../../components/clientCompo/Contact";
import FAQ from "../../components/clientCompo/FAQ";
import TermsOfUse from "../../components/clientCompo/TermOfUse";
import WatchlistPage from "../../components/clientCompo/WatchList";
import My_Account from "../../components/clientCompo/My_Account";

const HomeRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/categoryproduct/:category_id" element={<CategoryProduct />} />
                    <Route path="/productsdetail/:id" element={<ProductDetail />} />
                    <Route path="/allproduct" element={<AllProducts />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/ordertrack" element={<OrderTracking />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/termsofuse" element={<TermsOfUse />} />
                    <Route path="/watchlist" element={<WatchlistPage />} />
                    <Route path="/myaccount" element={<My_Account />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default HomeRoutes