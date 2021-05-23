/* eslint-disable max-len */
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {logout} from '../../app/actions/actionsUser';
import {userInfo} from '../../app/reducers/registerReducer';
import './profile.css';
import Login from '../login/login';

const Profile = () => {
  const dispatch = useAppDispatch();
  const User = useAppSelector(userInfo);
  let birthDate;
  if (User.birthday) birthDate = User.birthday.slice(0, 10);
  const [editMode, setEditMode] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  console.log(User);
  return (
    User.name ?
    <div className='profileAll'>
      <img className='profilePhoto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTxj1L5J64I_-gs_u-l3-d5PKg_wManLB0w&usqp=CAU' alt={User.profilePicture}/>
      <h3 className='profileName'>{User.firstName} {User.lastName}</h3>
      <h4 className='profileUsername'>{User.name}</h4>
      <p className='profileBirthday'>Birthday: <p>{birthDate}</p></p>
      <p className='profileAddress'> Address:<p contentEditable={editMode}> {User.address}</p> </p>
      <p className='profileCityLabel'>City: <p contentEditable={editMode}> {User.city}, {User.country}</p></p>
      <p className='profilePostalLabel'>Postal Code: <p contentEditable={editMode}>{User.postalCode}</p> </p>
      <p className='profilePhoneNumberLabel'>Phone Number: <p contentEditable={editMode}>{User.phoneNumber}</p> </p>
      <p className='profileEmailLabel'>Email Adress: <p contentEditable={editMode}> {User.email}</p></p>
      <input className='profileEditButton' type='button' value='Edit' onClick={() => setEditMode(!editMode)}/>
      <input className='profileLogOut' type='button' value='Log Out' onClick={handleLogout}/>
    </div> :
    <div><Login/></div>
  );
};

export default Profile;
