import React from 'react';
import './banner.css'

const Banner = () => {
    return (
        <section className='banner' style={{ backgroundImage: `url('img/homeBanner.png')` }}>
            <div className="container position-relative text-white">
                <div className='banner-header' style={{ marginTop: '20%' }}>
                    <h1 className=''>
                        Computer Engineering
                    </h1>
                    <p>
                        142,765 Computer Engineers follow this
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Banner;