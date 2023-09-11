import React, { useEffect, useState } from 'react';

import './selector.css';
import './_UploadForm.scss';
import caretDown from '../../assets/images/carret down.svg'
const Selector = props => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    props.setId('');
  }, []);

  let direction;
  const width = props.width ? props.width : '80%';
  if (props.path === 'product') {
    // دا عشان ميحودش يمين غير ف البردوكت بس
    direction = props.direction;
  }
  const changeIdHandler = e => {
    props.setId(e.target.value);
    setIsLoading(false);
  };
  return (
    <div
      className={`${props.classes ? props.classes : ''} input-container custom-select justify-between flex`}
      style={{ direction: !props.turnText ? '' : direction }}
    >
      <div className='input-label '>
        <p>{props.label}</p>
      </div>
      <div className='flex' style={{
        width: props.width || '100%'
      }}>
        <select
          style={{
            direction: props.direction ? props.direction : 'ltr',
            width: '100%',
          }}
          onChange={changeIdHandler}
          value={isLoading ? '' : props.id}
          placeholder=''>
          <option
            value=''
            disabled
            defaultValue
            key={Math.round(Math.random() * 10000)}>
            {props.placeholder ? props.placeholder : 'Select option'}
          </option>
          {props.data && props.data.map((el, i) => {
            // console.log(el);
            const text = props.name === 'year' && el.year;
            return (
              <option value={el.id} key={el.id ?? i}>
                {text || `${props.path === 'filter' ? el.name?.en : el.name}`}
              </option>
            );
          })}
        </select>
        {/* <span className="selector-arrow w-[30%] flex-center bg-white">
          <img src={caretDown} alt="" />
        </span> */}
      </div>
    </div>
  );
};

export default Selector;
