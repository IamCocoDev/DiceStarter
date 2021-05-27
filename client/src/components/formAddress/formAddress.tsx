import React, {useState} from 'react';
import {modifyAddress} from '../../app/actions/actionsUser/index';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userToken, userInfo} from '../../app/reducers/registerReducer';
import {Address} from '../../types';
import swal from 'sweetalert2';
import './formAddress.css';

const FormAddress = () => {
  // using typescript for securing data types
  const user = useAppSelector(userInfo);
  const [address, setAddress] = useState<Address>({
    id: user.id,
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const token = useAppSelector(userToken);
  const dispatch = useAppDispatch();
  const handleAddressChange = (e: any) => {
    setAddress({...address, [e.target.name]: e.target.value});
  };
  const handleAddressSubmit = (e: any) => {
    e.preventDefault();
    const phoneNumber = parseInt(address.phone);
    if (address.address.length > 0) {
      if (address.city.length > 0) {
        if (address.postalCode.length > 0) {
          if (typeof phoneNumber === 'number' || address.phone === '') {
            dispatch(modifyAddress(address, token))
                .then((r) => {
                  if (r !== 'error') {
                    swal.fire('Address changed succesfully!');
                  } else {
                    swal.fire('Oops, something went wrong');
                  }
                }).catch((err) => console.error(err));
          } else {
            swal.fire({
              text: 'You need to insert a proper phone number!',
              icon: 'warning',
            });
          }
        } else {
          swal.fire({
            text: 'You need to insert your Postal Code!',
            icon: 'warning',
          });
        }
      } else {
        swal.fire({
          text: 'You need to insert your city!',
          icon: 'warning',
        });
      }
    } else {
      swal.fire({
        text: 'You need to insert your address!',
        icon: 'warning',
      });
    }
  };
  return (
    <div className='FormAdressAll'>
      <form onSubmit={handleAddressSubmit}>
        <h1 className='FormAdressHeader'>Add your adress data here</h1>
        <input
          name='address'
          className='FormAddressAdress'
          type='text'
          onChange={handleAddressChange}
          value={address.address}
          placeholder='Adress...' />
        <input name='city'
          className='FormAdressCity'
          type='text'
          onChange={handleAddressChange}
          value={address.city}
          placeholder='City...' />
        <input name='postalCode'
          className='FormAdressPC'
          type='text'
          onChange={handleAddressChange}
          value={address.postalCode}
          placeholder='Postal Code...' />
        <label>Optional</label>
        <input name='phone'
          className='FormAdressPhone'
          type='text'
          onChange={handleAddressChange}
          value={address.phone}
          placeholder='Phone Number...'/>
        <button type='submit' className='FormAdressButton'>Submit</button>
      </form>
    </div>
  );
};

export default FormAddress;
