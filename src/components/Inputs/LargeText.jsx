import React from 'react';
import './_UploadForm.scss';
const LargeText = props => {
  return (
    <div className={`input-container input-text-large ${props.classes}`}>
      {props.label && (
        <div className='input-label' >
          <p >{props.label}</p>
        </div>
      )}
      {props.btn && <div className='form-btn'>{props.btn}</div>}
      <textarea
        placeholder={props.placeholder}
        value={props.desc}
        required={props.required ? props.required : false}
        onChange={e => props.setDesc(e.target.value)}
        style={{
          direction: props.direction ? 'rtl' : 'ltr',
          height: props.height ? props.height : '15rem',
          width: props.width ? props.width : '85.5%',
        }}
      />
    </div>
  );
};

export default LargeText;
