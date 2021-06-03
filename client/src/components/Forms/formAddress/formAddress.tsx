import React, {useState} from 'react';
import {modifyAddress} from '../../../app/actions/actionsUser/index';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {userToken, userInfo} from '../../../app/reducers/registerReducer';
import {Address} from '../../../types';
import swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import './formAddress.css';

const FormAddress = () => {
  // using typescript for securing data types
  const user = useAppSelector(userInfo);
  const [address, setAddress] = useState<Address>(user);
  const [redirect, setRedirect] = useState(false);

  const token = useAppSelector(userToken);
  const dispatch = useAppDispatch();
  const handleAddressChange = (e: any) => {
    setAddress({...address, [e.target.name]: e.target.value});
  };
  const phoneValidator = (phone:string) => {
    // eslint-disable-next-line max-len
    const phoneValidator = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (phone?.length > 0) {
      phoneValidator.test(phone) === false ? false : true;
    } else {
      return true;
    }
  };

  const handleAddressSubmit = (e: any) => {
    e.preventDefault();
    const phoneNumber = parseInt(address.phone);
    // all these code is form validation
    if (phoneValidator(address.phone)) {
      if (address.address.length > 0) {
        if (address.city.length > 0) {
          if (address.postalCode.length > 0) {
            if (typeof phoneNumber === 'number' || address.phone === '') {
              // here is the dispatch
              dispatch(modifyAddress(address, token))
                  .then((r) => {
                    if (r !== 'error') {
                      swal.fire({
                        text: 'Address changed succesfully!',
                        background: '#202020',
                      });
                      setRedirect(true);
                    } else {
                      swal.fire({
                        text: 'Oops, something went wrong',
                        background: '#202020',
                      });
                    }
                  }).catch((err) => console.error(err));
            } else {
              swal.fire({
                text: 'You need to insert a proper phone number!',
                icon: 'warning',
                background: '#202020',
              });
            }
          } else {
            swal.fire({
              text: 'You need to insert your Postal Code!',
              icon: 'warning',
              background: '#202020',
            });
          }
        } else {
          swal.fire({
            text: 'You need to insert your city!',
            icon: 'warning',
            background: '#202020',
          });
        }
      } else {
        swal.fire({
          text: 'You need to insert your address!',
          icon: 'warning',
          background: '#202020',
        });
      }
    } else {
      swal.fire({
        text: 'The phone you added is not correct!',
        icon: 'warning',
        background: '#202020',
      });
    }
  };
  return (
    <div className='formAddressAll'>
      {
        redirect === true &&
         <Redirect to='/profile'></Redirect>
      }
      <form className='formAdressForm' onSubmit={handleAddressSubmit}>
        <h2 className='formAddressHeader'>Address</h2>
        <input
          name='address'
          className='formAddressAdress'
          type='text'
          onChange={handleAddressChange}
          value={address.address}
          placeholder='Adress...' />
        <input name='city'
          className='formAdressCity'
          type='text'
          onChange={handleAddressChange}
          value={address.city}
          placeholder='City...' />
        <input name='postalCode'
          className='formAdressPC'
          type='text'
          onChange={handleAddressChange}
          value={address.postalCode}
          placeholder='Postal Code...' />
        <label>Optional</label>
        <input name='phone'
          className='formAdressPhone'
          type='text'
          onChange={handleAddressChange}
          value={address.phone}
          placeholder='Phone Number...'/>
        <button type='submit' className='formAddressButton'>Submit</button>
      </form>
    </div>
  );
};

export default FormAddress;
