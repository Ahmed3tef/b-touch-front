import React, { useEffect, useState } from "react";
import { DeleteOverlay, ErrorCard, MiniText, ProfileForm, Selector, Spinner } from "../components";
import "./_account.scss";
// import likeIcon from "../assets/My_Wish_List.svg";
// import ordersIcon from "../assets/my-orders.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APIBase } from "../store/reducers/api";
import { toast } from "react-toastify";
import { TbLogout } from "react-icons/tb";
// import { getUserData, logout } from "../store/reducers/auth";
import { useTranslation } from "react-i18next";
import { GiHearts } from 'react-icons/gi'
import { RiFileList2Fill } from 'react-icons/ri'
import { logout } from "../store/reducers/auth";
import { deleteAddress, loadUserInfo } from "../store/reducers/user";
import AddressCard from "../components/Cards/AddressCard";
import Address from "./Address";
import { unwrapResult } from "@reduxjs/toolkit";

const Account = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editAddress, setEditAddress] = useState(null)

  const [deleteOverlay, setDeleteOverlay] = useState(false)

  const { userInfo, isLoading, error } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? false;

  const dispatch = useDispatch();

  const submitHandler = (e) => {


  };

  const [deleteAddressId, setDeleteAddressId] = useState('')


  useEffect(() => {
    dispatch(loadUserInfo())
  }, [])


  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else dispatch(loadUserInfo(token));
  }, [navigate, token, dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo?.fname ?? "");
      setLastName(userInfo?.lname ?? "");
      // setDisplayName(userInfo?.displayName?? "");
      setEmail(userInfo?.email ?? "");
      setPhone(userInfo?.phone_1 ?? "");
      // setAddress1(userInfo && userInfo.address ? userInfo.address[0] : "");

    }
  }, [userInfo]);
  // console.log(userInfo);


  const showAddressFormHandler = (data) => {
    setEditAddress(data);
    setShowAddressForm(true);
  }

  const disappearAddressFormHandler = () => {
    setShowAddressForm(false);
    setEditAddress(null);
    dispatch(loadUserInfo(token));
  }


  const deleteAddressHandler = () => {

    if (deleteAddressId) {

      dispatch(deleteAddress({ id: deleteAddressId })).then(unwrapResult)
        .then(promiseResponse => {
          // console.log(promiseResponse);
          if (promiseResponse.success === true) {

            setDeleteOverlay(false)
            dispatch(loadUserInfo(token));
          }
        });;
    }
  }


  return (
    <div className="account">
      {!showAddressForm && <>
        {isLoading && <Spinner />}
        {!isLoading && !userInfo && error &&
          <ErrorCard />
        }
        {!isLoading && !error && userInfo && (
          <>
            <div className="container account__btns">
              {/* <img
            src={likeIcon}
            alt="wishlist-icon"
            onClick={() => navigate("/wishlist")}
          /> */}
              <GiHearts onClick={() => navigate("/wishlist")} />

              {/* <img
            src={ordersIcon}
            alt="orders-icon"
            onClick={() => navigate("/orders")}
          /> */}

              <RiFileList2Fill onClick={() => navigate("/orders")} />

              <span className="logout" onClick={logoutHandler}>
                <TbLogout />
              </span>
            </div>
            {/* <PageTitle maniTitle={t("homePage")} subTitle={t("profile")} /> */}
            <h2 className="text-center text-[2.8rem] lg:text-[3.5rem] mb-[1.5rem] font-Orelega mt-[3rem]">{t("My Account")}</h2>
            <div className="container-mx">
              <div className="responsive border-2 border-[#22292E] rounded-[1.5rem] p-[3rem] mb-[5rem]">
                <h3 className="text-[2.6rem] mb-[3rem]">Account Details</h3>
                <div className=" mx-[0rem] md:mx-[1rem] lg:mx-[4rem]">
                  <ProfileForm title={t("Account Details")}>
                    <div className="flex">
                      <MiniText
                        label={t("firstName")}
                        width="59%"
                        name={firstName}
                        setName={setFirstName}
                        classes="mb-[1.5rem]"
                      />
                      <MiniText
                        label={t("lastName")}
                        width="59%"
                        classes="mb-[1.5rem] ml-[1rem]"
                        name={lastName}
                        setName={setLastName}
                      />
                    </div>
                    <MiniText
                      label={t("email")}
                      // hint={t("email")}
                      name={email}
                      setName={setEmail}
                      classes="mb-[1.5rem]"
                    />
                    {/* <MiniText label={t("email")} name={email} setName={setEmail} classes="mb-[1.5rem]" /> */}
                    <MiniText label={t("phone")} name={phone} setName={setPhone} classes="mb-[1.5rem]" />
                  </ProfileForm>

                  <ProfileForm title={t("address")}>
                    <div className="address-container">
                      {!userInfo?.addresses || userInfo?.addresses.length === 0 && <p>No addresses yet please add some address</p>}
                      {userInfo?.addresses?.map((a, i) => <AddressCard key={i} address={a} showAddressFormHandler={showAddressFormHandler} setDeleteOverlay={setDeleteOverlay} setDeleteAddressId={setDeleteAddressId} />)}
                    </div>
                    <div className="flex-center mt-[2rem]">
                      <button className="form-btn bg-[#087DA7]"
                        // onClick={() => navigate('/address')}
                        onClick={showAddressFormHandler}
                      >{t("add address")}</button>
                    </div>
                  </ProfileForm>

                  <ProfileForm title={t("changePassword")}>
                    {/* <MiniText
                  label={"Current Password"}
                  hint={t("currentHint")}
                  name={currentPassword}
                  setName={setCurrentPassword}
                  classes="mb-[1.5rem]"
                /> */}
                    <MiniText
                      label={t("newPassword")}
                      // hint={t("newHint")}
                      name={newPassword}
                      setName={setNewPassword}
                      classes="mb-[1.5rem]"
                    />
                    <MiniText
                      label={t("confirmPassword")}
                      name={passwordConfirm}
                      setName={setPasswordConfirm}
                      classes="mb-[1.5rem]"
                    />
                  </ProfileForm>
                </div>
                <div className="mt-[3rem] form-btns">
                  <div className="form-btn bg-[#087DA7]" onClick={submitHandler}>
                    {t("Save Changes")}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>}
      {deleteOverlay && <DeleteOverlay deleteTitle='address' deleteHandler={deleteAddressHandler} setDeleteOverlay={setDeleteOverlay} />}


      {showAddressForm && <Address editAddress={editAddress} disappearAddressForm={disappearAddressFormHandler} />}
    </div>
  );
};

export default Account;
