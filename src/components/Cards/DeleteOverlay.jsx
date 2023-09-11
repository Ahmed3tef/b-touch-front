import { Fade } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const DeleteOverlay = (props) => {
  const { t } = useTranslation();

  return (
    // <Fade in={props.overlay} timeout={500}>
    <div className="delete-overlay">
      <div className="delete-overlay-content">
        <h3 className="overlay-header">
          {`Are you sure you want to permanently delete this ${props.deleteTitle}?`}
        </h3>
        <div className="form-btns">
          <div className="form-btn bg-white text-black hover:bg-staticBlue" onClick={props.deleteHandler}>
            {t('yes')}
          </div>
          <div className="form-btn bg-white text-black hover:bg-staticBlue" onClick={() => props.setDeleteOverlay(false)}>
            {t('no')}
          </div>
        </div>
      </div>
    </div>
    // </Fade>
  )
}

export default DeleteOverlay