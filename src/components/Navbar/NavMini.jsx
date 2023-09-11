import React from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from './mini-nav-data'

const NavMini = () => {
    return (
        <div className="nav-mini">
            <NavLink to="/" className="link">
                home
            </NavLink>
            {navLinks.map((e, i) => <NavLink to={`/models/${e.id}`} className='link' key={i}>
                <img src={e.icon} alt={e.name} />
                <span>{e.name}</span>
            </NavLink>
            )}
            <NavLink to='/brands' className="link">
                others
            </NavLink>
        </div>
    )
}

export default NavMini