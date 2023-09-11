import React from 'react'
import spinnerGif from '../../assets/images/spinner.gif'

const Spinner = () => {
  return (
    <div className='h-[30vh] w-[100wv] bg-white flex justify-center items-center'>
      <img src={spinnerGif} alt="loading spinner" className='h-[15%]' />
    </div>
  )
}

export default Spinner
