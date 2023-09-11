
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import LargeText from "../Inputs/LargeText";
// import MiniText from "../Inputs/MiniText";

// import "./_forms.scss";
// import Selector from "../Inputs/Selector";
// // import { loadAreas } from "../../store/reducers/areas";
// import Spinner from "../Spinner/Spinner";
// import ErrorCard from "../Cards/ErrorCard";
// import axios from "axios";
// import { APIBase } from "../../store/reducers/api";
// import { toast } from "react-toastify";


// const SignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState('')

//   const [addressName, setAddressName] = useState("");
//   const [buildingNumber, setBuildingNumber] = useState('')
//   const [streetName, setStreetName] = useState('')
//   const [area, setArea] = useState('')

//   const [photo, setPhoto] = useState('')

//   const [lat, setLat] = useState('')
//   const [long, setLong] = useState('')

//   // const { areas, isLoading, error } = useSelector(state => state.areas)

//   useEffect(() => {
//     dispatch(loadAreas())
//   }, [])

//   const createUserHandler = () => {
//     const fd = new FormData();


//     fd.append('firstName', firstName);
//     fd.append('lastName', lastName);
//     fd.append('email', email);
//     fd.append('phoneNumber', phoneNumber);
//     fd.append('password', password);
//     fd.append('addressName', addressName);

//     fd.append('buildingNumber', buildingNumber);
//     fd.append('streetName', streetName);

//     fd.append('addressArea', area);
//     if (email && password && area && phoneNumber) {

//       axios.post(`${APIBase}api/auth/register`, fd).then(res => {
//         navigate('/login')
//       }).catch((err) => {
//         const errMsg = err.response.data.errors?.toString().split(',').join('\n');
//         toast.error(`${errMsg}`, {
//           position: "top-right",
//           autoClose: 4500,
//           hideProgressBar: true,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       })
//     }


//   };

//   return (
//     <>
//       {<div className="w-[65vw] border-[3px] border-black rounded-xl m-auto py-[3rem] px-[1rem] lg:px-[3rem] mt-[8rem] text-black">
//         <h2 className="form__title">
//           {/* {t("registerTitle")} */}
//           Register
//         </h2>
//         <div className="form__input-container  flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">

//           <MiniText name={firstName} setName={setFirstName} label='first name' required />
//           <MiniText name={lastName} setName={setLastName} label='last name' required />
//         </div>

//         <div className="form__input-container  flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">

//           <MiniText name={email} setName={setEmail} label='E-mail' required />
//           <MiniText name={password} setName={setPassword} type="password" label='password' required />
//         </div>
//         <div className="form__input-container  flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">

//           <MiniText name={phoneNumber} setName={setPhoneNumber} label='Phone' required />

//           {/* <Selector id={area} setId={setArea} label='area' required data={areas} /> */}

//         </div>

//         <div className="form__input-container   flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">
//           <MiniText width='50%' labelWidth='50%' name={addressName} setName={setAddressName} label='address name' required />

//           <MiniText width='50%' labelWidth='45%' label='Building Number' name={buildingNumber} setName={setBuildingNumber} />
//           <MiniText width='50%' labelWidth='45%' label='Street Name' name={streetName} setName={setStreetName} />

//         </div>

//         <div className="mt-5 form-btns">
//           <div className="form-btn" onClick={createUserHandler}>
//             {/* {t("registerTitle")} */}
//             SignUp
//           </div>
//         </div>
//       </div>}
//       {/* {isLoading && <Spinner />}
//       {!isLoading && error && <ErrorCard />} */}
//     </>
//   )
// }

// export default SignUp


import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../store/reducers/auth';
import MiniText from '../Inputs/MiniText';
import './_forms.scss';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { signUpUser } from '../../store/reducers/auth';

const SignUp = props => {


  const rememberMeRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userCreated = useSelector(state => state.user.userCreated);



  const formik = useFormik({

    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validateOnMount: true
    ,
    validationSchema: YUP.object({
      firstName: YUP.string().required('first name is required.').min(2, 'must be at least 2 characters'),
      lastName: YUP.string().required('last name is required.').min(2, 'must be at least 2 characters'),
      phone: YUP.number().required('phone is required.'),
      email: YUP.string().email().required('Email is required.'),
      password: YUP.string().required('Password is required.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirm_password: YUP.string().required('Password confirmation is required.').oneOf([YUP.ref('password')]),
    }),
    onSubmit: (values) => {
      dispatch(
        signUpUser({
          email: values.email,
          phone_1: values.phone,
          fname: values.firstName,
          lname: values.lastName,
          password: values.password,
          confirm_password: values.confirm_password
        })
      )
        .then(unwrapResult)
        .then(promiseResponse => {
          // console.log(promiseResponse);
          if (promiseResponse.success === true) {
            navigate('/login');
            formik.resetForm()
          }
        });
    },
  })

  // useEffect(() => {
  //   if (!userCreated) navigate('/signup');
  // }, [userCreated]);

  return (
    <form className='form__container font-Orelega w-[70vw]' onSubmit={formik.handleSubmit}>
      <h2 className='form__title'>Sign Up</h2>
      <div className='form__input-container'>

        <MiniText name={formik.values.firstName} classes="mb-[1.5rem]" inputName='firstName' onBlur={formik.handleBlur} onChange={formik.handleChange} label='First name' error={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null} />

      </div>
      <div className='form__input-container'>
        <div className='form__input-label'>
          last name
        </div>
        <MiniText name={formik.values.lastName} classes="mb-[1.5rem]" inputName='lastName' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null} />

      </div>
      <div className='form__input-container'>
        <div className='form__input-label'>
          phone
        </div>
        <MiniText name={formik.values.phone} classes="mb-[1.5rem]" inputName='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.errors.phone && formik.touched.phone ? formik.errors.phone : null} />

      </div>
      <div className='form__input-container'>
        <div className='form__input-label'>
          Email Address
        </div>
        <MiniText name={formik.values.email} classes="mb-[1.5rem]" inputName='email' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.errors.email && formik.touched.email ? formik.errors.email : null} />

      </div>
      <div className='form__input-container'>
        <div className='form__input-label'>Password</div>
        <MiniText name={formik.values.password} type='password' classes="mb-[1.5rem]" inputName='password' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.errors.password && formik.touched.password ? formik.errors.password : null} />


      </div>
      <div className='form__input-container'>
        <div className='form__input-label'>Confirm password</div>
        <MiniText name={formik.values.confirm_password} type='confirm_password' classes="mb-[1.5rem]" inputName='confirm_password' onBlur={formik.handleBlur} onChange={formik.handleChange} error={formik.errors.confirm_password && formik.touched.confirm_password ? formik.errors.confirm_password : null} />


        {!props.title && (
          <div className='remember'>
            <label>
              <input type='checkbox' name='remember me' ref={rememberMeRef} />
              Remember Me.
            </label>
            <div className='signup' onClick={() => navigate('/login')}>
              Login to your account?
            </div>
          </div>
        )}
      </div>
      <div className='form-btns mt-5'>
        <button className='form-btn' type='submit' >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default SignUp;
