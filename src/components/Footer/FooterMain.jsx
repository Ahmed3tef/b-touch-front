import React from 'react'
import { Link } from 'react-router-dom'
import appleStore from '../../assets/images/Apple Store.svg'
import googlePlay from '../../assets/images/Google Play.svg'
import appGallery from '../../assets/images/AppGallery.svg'
import faceBook from '../../assets/images/Facebook.svg';
import instagram from '../../assets/images/Instagram.svg';
import twitter from '../../assets/images/Twitter.svg';
import youtube from '../../assets/images/Youtube.svg';
import phoneIcon from '../../assets/images/phone.svg';
import msgIcon from '../../assets/images/msg.svg';

const FooterMain = () => {

  return (
    <div className="footer-main">

      <div className="w-full flex items-center gap-[3rem] pt-[2rem] px-[2rem] lg:px-[4rem] xxl:px-0">
        <h3 className="footer-links-header text-white">Join  the  Community!</h3>
        <ul className="flex text-socialLink gap-[1.5rem]">
          <li><Link to='about'>
            <img src={faceBook} alt="facebook" className='footer-social-link' />
          </Link></li>
          <li><Link to='about'>
            <img src={instagram} alt="instagram" className='footer-social-link' />

          </Link></li>
          <li><Link to='about'>
            <img src={twitter} alt="twitter" className='footer-social-link' />

          </Link></li>
          <li><Link to='about'>
            <img src={youtube} alt="youtube" className='footer-social-link' />

          </Link></li>

        </ul>
      </div>

      <div className="container-mx items-center flex flex-col gap-[2rem] justify-between md:flex-row font-Orelega">

        {/* links */}
        <div className="w-full md:w-[70%]  flex justify-between" >
          <div>
            <h3 className='footer-links-header  mb-4 '>Company</h3>
            <ul className='footer-links'>
              <li><Link to='about-us'>About US</Link></li>
              <li><Link to='contact-us'>Contact US</Link></li>
              <li><Link to='terms'>Terms&Conditions</Link></li>
              <li><Link to='privacy'>Privacy Policy</Link></li>

            </ul>
          </div>
          <div >
            <h3 className='footer-links-header   mb-4 '>Policy Info</h3>
            <ul className='footer-links'>
              <li><Link to='terms'>Terms & Conditions</Link></li>
              <li><Link to='privacy-policy'>Privacy Policy</Link></li>
              <li><Link to='delivery-policy'>Shipping & Delivery Policy</Link></li>

            </ul>
          </div>
          <div>
            <h3 className='footer-links-header   mb-4 '>Customer Support</h3>
            <ul className='footer-links'>
              <span>We are available all days from:
                <div>
                  OPEN  10AM  -  10PM
                </div>
              </span>
              <li><Link to=''>
                <div className="footer-info">
                  <img src={phoneIcon} />
                  <span >
                    00201012345678
                  </span>

                </div></Link></li>
              <li><Link to=''><div className="footer-info">
                <img src={msgIcon} />
                <span >
                  customercare@b-touch.com
                </span>

              </div></Link></li>

            </ul>
          </div>

        </div>



        {/* stores */}
        <div className='text-center footer-stores'>
          <h3 className='footer-links-header mb-4 '>Download The App</h3>
          <ul className='flex md:flex-col text-socialLink gap-2 items-center'>
            <li className='w-[10rem] md:w-60'><Link to='about'><img src={appleStore} alt="apple-store" className='w-full' /></Link></li>
            <li className='w-[10rem] md:w-60'><Link to='about'><img src={googlePlay} alt="google-play" className='w-full' /></Link></li>
            <li className='w-[10rem] md:w-60'><Link to='about'><img src={appGallery} alt="app-gallery" className='w-full' /></Link></li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default FooterMain
