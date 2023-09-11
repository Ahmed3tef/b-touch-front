import React from 'react';
import photo from '../assets/images/Photo.png';
import ellips42 from '../assets/images/Ellipse 42.png';
import ellips43 from '../assets/images/Ellipse 43.png';
import { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
const ContactUs = () => {
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    subject: '',
    phone: '',
    textarea: '',
  };
  const [FormValues, setFormValues] = useState(initialValues);
  const [FormErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
    console.log(FormValues);
  };
  const onChange = () => {};
  const handelSubmit = (e) => {
    e.preventDefault();
    setFormErrors(Validate(FormValues));
    setIsSubmit(true);
  };
  const Validate = (values) => {
    const errors = {};
    const regx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regx2 = /^01[0125][0-9]{8}$/gm;
    if (!values.firstname) {
      errors.firstname = 'firstname is required!';
    }
    if (!values.lasttname) {
      errors.lastname = 'lastname is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regx.test(values.email)) {
      errors.email = 'This is not a valid format';
    }
    if (!values.subject) {
      errors.subject = 'subject is required!';
    }
    if (!values.phone) {
      errors.phone = 'Address is required!';
    } else if (!regx2.test(values.number)) {
      errors.phone = 'This is not valid phone number';
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(FormErrors).length === 0 && isSubmit) {
      console.log(FormValues);
    }
  }, [FormErrors]);

  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center flex-col max-width-[1600px] py-10 mt-10 relative">
      <h3 className=" text-center  text-[25px] capitalize py-10 font-extrabold">
        {t('contact_us.title')}
      </h3>

      <div className="container border-[2px] border-black mx-auto mb-10 bg-slate-300">
        <div className="flex w-full mx-10 lg:flex-row md:flex-col-reverse md:gap-10 sm:gap-10 xs:gap-10 sm:flex-col-reverse xs:flex-col-reverse">
          <div className="lg:w-2/3 md:w-full sm:w-full xs:w-full">
            <form
              onSubmit={handelSubmit}
              className="flex flex-col  lg:w-[75%] md:w-[75%] sm:w-[70%] xs:w-[70%] px-3 pt-12 mb-[20px] "
            >
              <div className="flex flex-row items-center justify-between py-3">
                <label
                  htmlFor="fname"
                  className="py-2 font-semibold capitalize "
                >
                  {t('contact_us.firstName')}
                </label>
                <input
                  value={FormValues.firstname}
                  onChange={handelChange}
                  name="firstname"
                  id="fname"
                  placeholder={t('placeholder.firstnameplaceholder')}
                  className=" focus:border-black focus:outline-none  hover:scale-110  duration-500 pl-10 w-3/4 h-[25px] border-[1px] border-black bg-white rounded-lg "
                  type="text"
                />
              </div>

              <p className=" relative left-[158px] bottom-4 text-red-500 ">
                {FormErrors.firstname}
              </p>

              <div className="flex flex-row items-center justify-between py-3">
                <label htmlFor="lname" className="font-semibold capitalize ">
                  {t('contact_us.lastName')}
                </label>

                <input
                  value={FormValues.lastname}
                  onChange={handelChange}
                  name="lastname"
                  id="lname"
                  placeholder={t('placeholder.lastnameplaceholder')}
                  type="text border-2"
                  className="focus:border-black focus:outline-none hover:scale-110  duration-500 pl-10 w-3/4 h-[25px] border-[1px] border-black bg-white rounded-lg"
                />
              </div>

              <p className="relative left-[158px] bottom-4 text-red-500">
                {FormErrors.lastname}
              </p>

              <div className="flex flex-row items-center justify-between py-3">
                <label htmlFor="email" className="font-semibold capitalize ">
                  {t('contact_us.email')}
                </label>
                <input
                  value={FormValues.email}
                  onChange={handelChange}
                  name="email"
                  id="email"
                  type="mail"
                  placeholder={t('placeholder.youremail')}
                  className="focus:border-black focus:outline-none hover:scale-110  duration-500 pl-10 w-3/4 h-[25px] border-[1px] border-black bg-white rounded-lg"
                />
              </div>

              <p className="relative left-[158px] bottom-4 text-red-500">
                {FormErrors.email}
              </p>

              <div className="flex flex-row items-center justify-between py-3">
                <label htmlFor="phone" className="font-semibold capitalize ">
                  {t('contact_us.phone')}
                </label>
                <input
                  value={FormValues.phone}
                  onChange={handelChange}
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder={t('placeholder.yourphone')}
                  className="focus:border-black focus:outline-none hover:scale-110  duration-500  pl-10 w-3/4 h-[25px] border-[1px] border-black bg-white rounded-lg"
                />
              </div>

              <p className="relative left-[158px] bottom-4 text-red-500">
                {FormErrors.phone}
              </p>

              <div className="flex flex-row items-center justify-between py-3">
                <label htmlFor="subject" className="font-semibold capitalize ">
                  {t('contact_us.subject')}
                </label>
                <input
                  value={FormValues.subject}
                  onChange={handelChange}
                  name="subject"
                  id="subject"
                  type="text"
                  placeholder={t('placeholder.yoursubject')}
                  className="focus:border-black focus:outline-none hover:scale-110  duration-500 pl-10 w-3/4 h-[25px] border-[1px] border-black bg-white rounded-lg"
                />
              </div>

              <p className="relative left-[158px] bottom-4 text-red-500">
                {FormErrors.subject}
              </p>

              <div className='flex flex-row mt-5 justify-between relative after:absolute after:content-["0/3000"] after:bottom-[-22px] after:right-0'>
                <label htmlFor="textarea" className="font-semibold capitalize ">
                  {t('contact_us.message')}
                </label>
                <textarea
                  name="textarea"
                  value={FormValues.textarea}
                  onChange={handelChange}
                  id="textarea"
                  placeholder={t('placeholder.textarea')}
                  className="focus:border-black focus:outline-none hover:scale-110  duration-500  pl-10  w-3/4 h-[90px] border-[1px] border-black bg-white rounded-lg"
                ></textarea>
              </div>

              <div className="flex items-center justify-between mx-auto mt-10">
                <div>
                  <ReCAPTCHA
                    sitekey="6LdH_MYjAAAAAE_xjNZgufEgyhn9tpl3ehBJqW0V"
                    onChange={onChange}
                  />
                </div>

                <div className="w-1/4">
                  <input
                    value="send"
                    className=" cursor-pointer text-[18px] capitalize py-2 px-5 rounded-full bg-black text-white"
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="lg:w-1/3 md:w-full sm:w-full xs:w-full relative md:top-[30px] sm:top-[30px] xs:top-[30px]">
            <img
              src={photo}
              className=" lg:absolute block top-[23%] right-[50%] h-[260px]"
            ></img>
            <img
              src={ellips42}
              className="absolute lg:left-[20%] lg:top-[22%] w-[45px] h-[45px] md:left-[50%]  md:top-[15%] sm:left-[71%]  sm:top-[11%] xs:left-[65%]  xs:top-0"
            ></img>
            <img
              src={ellips43}
              className="absolute lg:left-[32%] lg:top-[30%] w-[45px] h-[45px]  md:top-[2%] md:left-[42%] sm:left-[57%]  sm:top-[-1%] xs:left-[80%]  xs:top-[12%]"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
