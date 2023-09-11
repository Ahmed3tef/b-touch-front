import React, { useEffect, useState } from 'react'
import { MiniText, ProfileForm, Selector } from '../components'
import { loadCountries } from '../store/reducers/countries';
import { loadProvinces } from '../store/reducers/provinces';
import { loadCities } from '../store/reducers/cities';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as YUP from 'yup';
import { createAddress, updateAddress } from '../store/reducers/user';
import { unwrapResult } from '@reduxjs/toolkit';

const Address = (props) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();


  const countries = useSelector((state) => state.countries.countries);
  const provinces = useSelector((state) => state.provinces.provinces);
  const cities = useSelector((state) => state.cities.cities);


  const formik = useFormik({

    initialValues: {
      addressName: props.editAddress ? props.editAddress?.addressName : '',
      streetName: props.editAddress ? props.editAddress?.streetName : '',
      buildingName: props.editAddress ? props.editAddress?.buildingNameOrNo : '',
      floorNumber: props.editAddress ? props.editAddress?.floorApartmentNo : '',
      landmark: props.editAddress ? props.editAddress?.nearestLandMark : '',
      // country: '',
      // province: '',
      // city: '',
    },
    validateOnMount: true
    ,
    validationSchema: YUP.object({
      addressName: YUP.string().required('address name  is required.').min(8, 'must be at least 8 characters'),
      streetName: YUP.string().required('street name is required.').min(4, 'must be at least 4 characters'),
      buildingName: YUP.string().required('building name or number is required.'),
      floorNumber: YUP.number().required('floor number is required.'),
      landmark: YUP.string().required('landmark is required.'),
    }),

    onSubmit: (values) => {
      if (props.editAddress) {
        dispatch(
          updateAddress({
            id: props.editAddress.addressId,
            address: {
              addressName: values.addressName,
              streetName: values.streetName,
              buildingNameOrNo: values.buildingName,
              floorApartmentNo: values.floorNumber,
              nearestLandMark: values.landmark,
              cityId: city,
            }
          })
        ).then(unwrapResult)
          .then(promiseResponse => {
            // console.log(promiseResponse);
            if (promiseResponse.success === true) {
              props.disappearAddressForm();
              formik.resetForm()
            }
          });
        return
      } else {

        dispatch(
          createAddress({
            address: {
              addressName: values.addressName,
              streetName: values.streetName,
              buildingNameOrNo: values.buildingName,
              floorApartmentNo: values.floorNumber,
              nearestLandMark: values.landmark,
              cityId: city,
            }
          })
        ).then(unwrapResult)
          .then(promiseResponse => {
            // console.log(promiseResponse);
            if (promiseResponse.success === true) {
              navigate('/account');
              formik.resetForm()
            }
          });
      }

    },
  })

  const [country, setCountry] = useState('')
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    dispatch(loadCountries());
  }, []);

  useEffect(() => {
    if (country) dispatch(loadProvinces({ id: country }));
  }, [country]);

  useEffect(() => {
    if (province) dispatch(loadCities({ id: province }));
  }, [province]);


  return (
    <div className="container-mx mt-[10rem]">

      <ProfileForm title={t("address")}>
        <form onSubmit={formik.handleSubmit}>

          <div className="flex gap-[2rem]">

            <MiniText
              label={t("addressName")}
              // hint={t("addressHint")}
              name={formik.values.addressName}
              width='70%'
              classes="mb-[1.5rem]"
              inputName='addressName' onBlur={formik.handleBlur} onChange={formik.handleChange}
              error={formik.errors.addressName && formik.touched.addressName ? formik.errors.addressName : null}
            // width="59%"

            />
            <MiniText
              label={"streetName"}
              name={formik.values.streetName}
              width='70%'
              classes="mb-[1.5rem]"
              // width="59%"
              inputName='streetName' onBlur={formik.handleBlur} onChange={formik.handleChange}
              error={formik.errors.streetName && formik.touched.streetName ? formik.errors.streetName : null}
            />
          </div>
          <div className="flex gap-[2rem]">

            <MiniText
              label={t("buildingNameOrNo")}
              // hint={t("addressHint")}
              name={formik.values.buildingName}
              width='70%'
              classes="mb-[1.5rem]"
              // width="59%"
              inputName='buildingName' onBlur={formik.handleBlur} onChange={formik.handleChange}
              error={formik.errors.buildingName && formik.touched.buildingName ? formik.errors.buildingName : null}
            />
            <MiniText
              label={"floorApartmentNo"}
              name={formik.values.floorNumber}
              classes="mb-[1.5rem]"
              width='70%'
              // width="59%"
              inputName='floorNumber' onBlur={formik.handleBlur} onChange={formik.handleChange}
              error={formik.errors.floorNumber && formik.touched.floorNumber ? formik.errors.floorNumber : null}
            />
          </div>
          <div className="flex gap-[2rem]">

            <MiniText
              label={t("nearestLandMark")}
              // hint={t("addressHint")}
              name={formik.values.landmark}
              classes="mb-[1.5rem]"
              // width="59%"
              width='70%'
              inputName='landmark' onBlur={formik.handleBlur} onChange={formik.handleChange}
              error={formik.errors.landmark && formik.touched.landmark ? formik.errors.landmark : null}

            />
            <Selector
              label={t("country *")}
              id={country}
              setId={setCountry}
              data={countries}
              width='70%'
              classes="mb-[1.5rem]"

            // classes='ml-5'
            />
          </div>
          <div className="flex gap-[2rem]">

            <Selector
              label={t("province *")}
              id={province}
              setId={setProvince}
              data={provinces}
              width='70%'
            // classes='ml-5'
            />
            <Selector
              label={t("city *")}
              id={city}
              setId={setCity}
              data={cities}
              width='70%'
            // classes='ml-5'
            />
          </div>
          <div className="mt-[3rem] form-btns">
            <button type='button' className="form-btn bg-[#087DA7]" onClick={props.disappearAddressForm}>
              {t("Cancel")}
            </button>
            <button type='submit' className="form-btn bg-[#087DA7]" >
              {props.editAddress ? t("Save Changes") : t("Create")}
            </button>
          </div>
        </form>
      </ProfileForm>
    </div>
  )
}

export default Address