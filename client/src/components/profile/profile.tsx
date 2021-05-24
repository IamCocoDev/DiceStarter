/* eslint-disable max-len */
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {logout} from '../../app/actions/actionsUser';
import {userInfo} from '../../app/reducers/registerReducer';
import './profile.css';
import Login from '../login/login';
import user from '../../img/user.png';

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
  return (
    User.name ?
    <div className='profileAll'>
      <div className='profileLeft'>
        <img className='profilePhoto' src={User.profilePicture || user} alt='profile Pic'/>
        <h3 className='profileName'>{User.firstName} {User.lastName}</h3>
        <h4 className='profileUsername'>{User.name}</h4>
      </div>
      <div className='profileRight'>
        <p className='profileBirthday'>Birthday: <p className= 'noteditable'>{birthDate}</p></p>
        <p className='profileAddress'> Address:<p className={editMode ? 'editable' : 'noteditable'} contentEditable={editMode}> {User.address}</p> </p>
        <p className='profileCity'>City: <p className={editMode ? 'editable' : 'noteditable'} contentEditable={editMode}> {User.city}, {User.country}</p></p>
        <p className='profilePostal'>Postal Code: <p className={editMode ? 'editable' : 'noteditable'} contentEditable={editMode}>{User.postalCode}</p> </p>
        <p className='profilePhoneNumber'>Phone Number: <p className={editMode ? 'editable' : 'noteditable'} contentEditable={editMode}>{User.phoneNumber}</p> </p>
        <p className='profileEmail'>Email Adress: <p className={editMode ? 'editable' : 'noteditable'} contentEditable={editMode}> {User.email}</p></p>
        <div className='profileButtons'>
          <input className='profileEditButton' type='button' value='Edit' onClick={() => setEditMode(!editMode)}/>
          <input className='profileLogOut' type='button' value='Log Out' onClick={handleLogout}/>
        </div>
      </div>
    </div> :
    <div><Login/></div>
  );
};

export default Profile;
