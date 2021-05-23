/* eslint-disable max-len */
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {logout} from '../../app/actions/actionsUser';
import {userInfo} from '../../app/reducers/registerReducer';
import {NavLink} from 'react-router-dom';
import './profile.css';

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
      <input className='profileEditButton' type='button' value='Edit' onClick={() => setEditMode(!editMode)}/>
      <input className='profileLogOut' type='button' value='Log Out' onClick={handleLogout}/>
      <h1 className='profileFirstName'>{User.firstName}</h1>
      <h1 className='profileLastName'>{User.lastName}</h1>
      <img className='profilePhoto' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTxj1L5J64I_-gs_u-l3-d5PKg_wManLB0w&usqp=CAU' alt={User.profilePicture}/>
      <h2 className='profileBirthLabel'>You were born in </h2>
      <h1 className='profileBirthDate' contentEditable={editMode}>{birthDate}</h1>
      <h2 className='profileAdressLabel'>Your adress is</h2>
      <h1 className='profileAdress' contentEditable={editMode}>Zavalla 245 E.</h1>
      <h2 className='profileCityLabel'>You live in</h2>
      <h1 className='profileCity' contentEditable={editMode}>Saint Petersburg, {User.country}</h1>
      <h2 className='profilePostalLabel'>Your postal code is </h2>
      <h1 className='profilePostal' contentEditable={editMode}>{User.postalCode}</h1>
      <h2 className='profilePhoneNumberLabel'>You can be called at</h2>
      <h1 className='profilePhoneNumber' contentEditable={editMode}> {User.phoneNumber}</h1>
      <h2 className='profileEmailLabel'>Your Email</h2>
      <h1 className='profileEmail' contentEditable={editMode}>{User.email}</h1>
    </div> :
    <div className='profileAll'>
      <h1 className='profileRegisterButton'> New in DiceStarter? <NavLink to={'/register'}>
      sign up here
      </NavLink>
      </h1>
      <h1 className='profileLogInButton'> Already have an account?
        <NavLink to='/login'>Log in Here</NavLink>
      </h1>
    </div>
  );
};

export default Profile;
