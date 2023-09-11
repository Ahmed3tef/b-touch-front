import React, { useEffect, useRef, useState } from 'react';
import { HomeSectionTitle, LayeredCarousel } from '..';
// import { Carousel } from '../../util/carousel';
import { Box } from '@mui/material';
import styles from './styles/home-arrivals.module.css';

import nextArr from '../../assets/images/nextArr2.svg';
import prevArr from '../../assets/images/prevArr-2.svg';

const HomeArrivals = (props) => {
  //REFS
  // const farLeft = useRef();
  // const left = useRef();
  // const middle = useRef();
  // const right = useRef();
  // const farRight = useRef();

  // const [carouselState, setCarouselState] = useState(null);

  // const onPrevClick = () => {
  //   carouselState.previous();
  // };
  // const onNextClick = () => {
  //   carouselState.next();
  // };

  // useEffect(() => {
  //   if (carouselState) return;

  //   const el = document.querySelector('.carousel');
  //   const carousel = new Carousel(el, props.data);
  //   carousel.mounted();
  //   setCarouselState(carousel);
  // }, []);

  return (
    <div className="my-10 responsive container-mx">
      <HomeSectionTitle title="NEW ARRIVALS" path="/arrivals" />
      <div className="flex items-center justify-center gap-4">
        {/* <Box onClick={onPrevClick}>
          <img src={prevArr} className='cursor-pointer' />
        </Box> */}

        {/* <div className="w-full carousel"></div> */}
        <LayeredCarousel data={props.data} />
        {/* <Box onClick={onNextClick}>
          <img src={nextArr} className='cursor-pointer' />
        </Box> */}
      </div>
    </div>
  );
};

export default HomeArrivals;
