import React from 'react';
import img from "../../../assets/location-merchant.png";

const BeMerchant = () => {
    return (
        <div data-aos="zoom-in-up" className="hero  bg-base-200 ">
            <div className="max-w-6xl mx-auto px-15 py-15 bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] rounded-3xl">
                <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={img}
                    alt="Be a Merchant"
                    className="max-w-sm  "
                />
                <div>
                    <h1 className="text-3xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex gap-2'>
                        <button className="btn btn-soft rounded-full bg-[#CAEB66] ">Become a Merchant</button>
                        <button className="btn btn-outline btn-primary rounded-full text-[#CAEB66] border-[#CAEB66]">Earn with ZapShift Courier</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default BeMerchant;