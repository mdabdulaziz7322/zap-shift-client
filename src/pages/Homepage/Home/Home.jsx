import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientsSlider from '../ClientsSlider/ClientsSlider';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientsSlider></ClientsSlider>
            <FeaturesSection></FeaturesSection>
            <BeMerchant></BeMerchant>
           
        </div>
    );
};

export default Home;