import React from 'react'

const HomeSectionLayout = (props) => {
  return (

    <div className='container-mx'>
      <div className="section-layout">
        {props.children}
      </div>
    </div>
  )
}

export default HomeSectionLayout
