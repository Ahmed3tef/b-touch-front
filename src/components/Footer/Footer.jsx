import React from 'react'
import FooterMain from './FooterMain'
import FooterMini from './FooterMini'
import './_footer.scss';

const Footer = () => {
    return (
        <footer className='bg-black text-white'>
            <div className="responsive">
                <FooterMain/>
            </div>
            <FooterMini/>
        </footer>
    )
}

export default Footer
