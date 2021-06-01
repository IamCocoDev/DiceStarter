/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {userProfile, userToken} from '../../../app/reducers/registerReducer';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {getUser} from '../../../app/actions/actionsUser/index';
import user from '../../../img/user.png';
import './profileView.css';

const ProfileView = (props:any) => {
  const userView = useAppSelector(userProfile);
  const token = useAppSelector(userToken);
  const dispatch = useAppDispatch();

  let birthDate;

  if (userView?.birthday) birthDate = userView?.birthday.slice(0, 10);

  const id = props.match.params.id;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getUser(id, token));
    }
  }, []);
  return (
      userView ?
    <div className='profileViewAll'>
      <div className='profileViewLeft'>
        <img className='profileViewPhoto' src={userView?.profilePicture || user} alt='profile Pic'/>
        <div className='profileViewNames'>
          <h3 className='profileViewName'>
            <p>
              {userView?.firstName}
            </p>
          </h3>
          <h3 className='profileViewLastName'>
            <p>
              {userView?.lastName}
            </p>
          </h3>
        </div>
        <h4 className='profileViewUsername'>{userView?.name}</h4>
      </div>
      <div className='profileViewRight'>
        <h1 className='profileViewBirthday'>
      Birthday:
          <p className= 'noteditable'>
            {birthDate}
          </p>
        </h1>
        {
      userView?.address ?
      <div>
        <p className='profileViewAddress'>
           Address:
          <p>
            {userView?.address}
          </p>
        </p>
        <div className='profileViewNationality'>
          <p className='profileViewCity'>
          City:
            <p>
              {userView?.city},
            </p>
          </p>
          <p className='profileViewCountry'>
            Country:
            <p>
              {userView?.country}
            </p>
          </p>
        </div>
        <p className='profileViewPostal'>
          Postal Code:
          <p>
            {userView?.postalCode}
          </p>
        </p>
        { userView?.phoneNumber &&
           <p className='profileViewPhoneNumber'>
           Phone Number:
             <p>
               {userView?.phoneNumber}
             </p>
           </p>
        }
      </div> :
        <p className='profileViewAddressForm'>
        It seems you do not have an address, <NavLink to='/profile/address'> create one here!  </NavLink>
        </p>
        }
        <p className='profileViewEmail'>
      Email Adress:
          <p>
            {userView?.email}
          </p>
        </p>
      </div>
    </div> :
    <h1 className='profileView404'>404 Not found</h1>
  );
};

export default ProfileView;
