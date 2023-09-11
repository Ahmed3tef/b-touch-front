import React from 'react'

const ModelsLayout = ({ children }) => {
  return (
    <div className="container-mx p-0">

      <div className="models-layout">
        {children}
      </div>
    </div>
  )
}

export default ModelsLayout