import React, {useRef} from 'react'
import Slider from 'react-slick';
import './_carrousel.scss'
import {BannerCard1, BannerCard2, BannerCard3} from '..';

import nextArr from '../../assets/images/nextArr1.svg';
import prevArr from '../../assets/images/prevArr-1.svg';

const CarrouselContainer = ({data, type}) => {

    const sliderRef = useRef();
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        arrows: false
    };

    const nextHandler = () => {
        sliderRef.current.slickNext()
    }
    const prevHandler = () => {
        sliderRef.current.slickPrev();
    }

    return (
        <div className="responsive xl:mx-auto relative">

            {type === 1 && <span className='slider-prev' onClick={prevHandler}>
        <img src={prevArr} alt=""/>
      </span>}

            {type === 1 && <span className='slider-next' onClick={nextHandler}>
        <img src={nextArr} alt=""/>
      </span>}

            <Slider {...settings} ref={sliderRef}>
                {type === 1 && data && data.map((e, i) => <BannerCard1
                    key={i} data={e} prevHandler={prevHandler}
                    nextHandler={nextHandler}/>)}
                {type === 2 && data && data.map((e, i) => <BannerCard2
                    key={i} data={e}/>)}
                {type === 3 && data && data.map((e, i) => <BannerCard3
                    key={i} data={e}/>)}
            </Slider>
        </div>
    )
}

export default CarrouselContainer;


