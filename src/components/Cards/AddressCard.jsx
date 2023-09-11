import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddressCard = ({ address, showAddressFormHandler, setDeleteOverlay, setDeleteAddressId }) => {
  const navigate = useNavigate()

  return (
    <div className='address-card'>
      <h3>{address.addressName}</h3>
      <p>{`${address.streetName} ${address.buildingNameOrNo ? ' - ' + address.buildingNameOrNo : ''} ${address.floorApartmentNo ? ' - ' + address.floorApartmentNo : ''} ${address.buildingNameOrNo ? ' - ' + address.buildingNameOrNo : ''}`}</p>
      {address.nearestLandMark && <p>{address.nearestLandMark}</p>}
      {address.cityId && <p>{address.cityId}</p>}
      <div className="flex justify-end gap-[2rem]">

        <span onClick={() => {
          setDeleteAddressId(address.addressId)
          setDeleteOverlay(true)
        }}>Delete</span>
        <span onClick={() => showAddressFormHandler(address)}>Edit</span>
      </div>
    </div>
  )
}

export default AddressCard