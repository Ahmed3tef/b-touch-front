import React, { useEffect, useState } from 'react'
import {
    AD,
    ErrorCard,
    Filter,
    HomeArrivals,
    HomeBrands,
    HomeCategories,
    HomeHeader,
    HomeOffers,
    HomeTestimonials,
    Spinner,
    VideoSection
} from '../components';


import { useDispatch, useSelector } from 'react-redux';
import { loadHome } from '../store/reducers/home';
// 
const Home = () => {

    const dispatch = useDispatch()
    const { mainAds, newArrivals, PopularCategories, sectionAds, brands, bestOffers, isLoading, error } = useSelector(state => state.home)

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        dispatch(loadHome());
    }, []);


    return (
        <>
            {!isLoading && !error && mainAds && <>

                {mainAds?.length > 0 && <HomeHeader data={mainAds} />}

                <div className="responsive">
                    <Filter />
                </div>

                {newArrivals?.length > 0 && <HomeArrivals data={newArrivals} />}

                {PopularCategories?.length > 0 && <HomeCategories categories={PopularCategories}
                    carrouselData={sectionAds} />
                }

                <VideoSection />

                {bestOffers?.length > 0 && <HomeOffers data={bestOffers} />}

                <AD />

                <HomeTestimonials />

                {brands?.length > 0 && <HomeBrands data={brands} />}

            </>
            }
            {isLoading && <Spinner />}

            {!isLoading && !brands && error &&
                <ErrorCard />
            }

            {/* no error no data */}
            {!isLoading && !error && !brands && <h3>No data found.</h3>}
        </>
    );
};

export default Home