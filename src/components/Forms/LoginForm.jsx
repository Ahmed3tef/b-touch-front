import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../store/reducers/auth';
import MiniText from '../Inputs/MiniText';
import './_forms.scss';
import { useFormik } from 'formik';
import { loginUser } from '../../store/reducers/auth';
import * as YUP from 'yup';

const LoginForm = props => {


  const rememberMeRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userCreated = useSelector(state => state.user.userCreated);



  const formik = useFormik({

    initialValues: {
      email: '',
      password: ''
    },
    validateOnMount: true
    ,
    validationSchema: YUP.object({
      email: YUP.string().email().required('Email is required.'),
      password: YUP.string().required('Password is required.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (values) => {
      dispatch(
        loginUser({
          email: values.email,
          password: values.password,
        })
      )
        .then(unwrapResult)
        .then(promiseResponse => {
          // console.log(promiseResponse);
          if (promiseResponse.success === true) {
            sessionStorage.setItem('token', promiseResponse.data.token);
            if (rememberMeRef.current.checked) localStorage.setItem('token', promiseResponse.data.token);

            navigate('/');
            formik.resetForm()
          }
        });
    },
  })

  // useEffect(() => {
  //   if (!userCreated) navigate('/signup');
  // }, [userCreated]);

  return (
    <form className='form__container font-Orelega' onSubmit={formik.handleSubmit}>
      <h2 className='form__title'>{props.title ? props.title : 'Login'}</h2>
      <div className='form__input-container'>
        <div className='form__input-label'>
          Email Address
        </div>
        <MiniText name={formik.values.email} classes="mb-[1.5rem]" inputName='email' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.errors.email && formik.touched.email ? formik.errors.email : null} />

      </div>
      <div className='form__input-container'>
        <div className='form__input-label'>Password</div>
        <MiniText name={formik.values.password} type='password' classes="mb-[1.5rem]" inputName='password' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.errors.password && formik.touched.password ? formik.errors.password : null} />


        {!props.title && (
          <div className='remember'>
            <label>
              <input type='checkbox' name='remember me' ref={rememberMeRef} />
              Remember Me.
            </label>
            <div className='signup' onClick={() => navigate('/register')}>
              create Account ?
            </div>
          </div>
        )}
      </div>
      <div className='form-btns mt-5'>
        <button className='form-btn' type='submit' >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
