import React from 'react'

const ErrorCard = () => {
  const errorMsg = '⚠ Some error happened, please try again later.'
  return (
    <div className='container-mx flex justify-center items-center text-[3rem]'>{errorMsg}</div>
  )
}

export default ErrorCard
