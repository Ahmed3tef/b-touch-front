import React from 'react'

import {SearchBar} from '..'

import logo from '../../assets/images/Logo-nav.svg'

import account from '../../assets/images/Account.svg'

import cart from '../../assets/images/Shopping Cart Icon.svg'

import {Link} from 'react-router-dom'


const NavMain = () => {

    return (
        <div className="nav-main responsive">

            <Link to={'/'} className="logo">
                <img src={logo} alt="logo"/>
            </Link>

            <SearchBar/>

            <div className="nav-main-icons">
                <Link to={'/account'} className="">
                    <img src={account} alt="logo"/>
                </Link>
                <Link to={'/cart'} className="">
                    <img src={cart} alt="logo"/>
                </Link>
            </div>
        </div>
    )
}

export default NavMain