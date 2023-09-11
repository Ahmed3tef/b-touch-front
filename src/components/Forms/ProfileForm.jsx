import React from 'react';
import './_forms.scss'
const ProfileForm = props => {
  return (
    <div className='form-profile'>
      <span className='form-profile__title'>{props.title}</span>
      {props.children}
    </div>
  );
};

export default ProfileForm;
