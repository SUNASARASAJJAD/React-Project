import React from 'react'
import Slider from './Slider'
import Category from './category'
import Product from './product'
import Banner from './banner'
import WhyUs from './whyUs'
import SearchbarSmall from './SearchbarSmall'
import Adverties from '../../../components/clientCompo/Adverties'

const index = () => {
    return (
        <div>
            <SearchbarSmall />
            <Slider />
            <Category />
            <Adverties/>
            <Product />
            <Banner />
            <WhyUs />
        </div>
    )
}

export default index