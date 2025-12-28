import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientsSlider from '../ClientsSlider/ClientsSlider';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorks from '../HowItWorks/HowItWorks';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import FaqSection from '../FaqSection/FaqSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <ClientsSlider></ClientsSlider>
            <FeaturesSection></FeaturesSection>
            <BeMerchant></BeMerchant>
            <TestimonialsSection></TestimonialsSection>
            <FaqSection></FaqSection>
           
        </div>
    );
};

export default Home;