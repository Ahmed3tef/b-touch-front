import React from 'react';
import { Link } from 'react-router-dom';
import ADImg from '../../assets/images/AD 4.png';

const AD = () => {
  return (
    <Link className="xxl:responsive">
      <img className="responsive" src={ADImg} alt="ad" />
    </Link>
  );
};

export default AD;
