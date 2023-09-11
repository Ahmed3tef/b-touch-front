import React from 'react'
import NavMain from './NavMain'
import NavMini from './NavMini'


const Navbar = () => {
  return (
    <nav className="bg-footer-mini text-white nav">
      <NavMain />
      <NavMini />
    </nav>
  )
}

export default Navbar
