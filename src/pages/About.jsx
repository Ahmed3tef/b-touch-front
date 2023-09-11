import React from 'react'
import about from '../assets/images/about.png'
const About = () => {
  return (
    <div className='max-width-[1600px]  '>
      
      <div className='max-width[1600px] mx-auto flex flex-col  justify-between  '>
       
        
        <div className='w-full relative  '>
         <img className='w-full' src={about}></img>
            <div className='absolute top-[25%] z-10 lg:pl-[50px] md:pl-[30px] sm:pl-[10px] text-white'>
            <h4 className='font-bold text-[25px] uppercase'>car accesssories</h4>
          <h2 className='font-bold text-[45px] uppercase'>that don't</h2>
          <h4 className='font-bold text-[25px] uppercase'>hurt warranty</h4>
            </div>
          
        </div>
        
       
        <div>

        </div>
        
      </div>
    </div>
  )
}

export default About