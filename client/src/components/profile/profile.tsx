/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {logout, modifyUser, setSubscribe} from '../../app/actions/actionsUser';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import './profile.css';
import Login from '../login/login';
import user from '../../img/user.png';
import {NavLink} from 'react-router-dom';
import swal from 'sweetalert2';
import {deleteAllLocalWishlist} from '../../app/actions/wishlistActions';

const Profile = (props:any) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  let birthDate;
  const [editMode, setEditMode] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(deleteAllLocalWishlist());
  };

  const User = useAppSelector(userInfo);

  const [changes, setChanges] = useState(User);
  const [subscribed, setTheSubscribed] = useState(User.subscriber === 'true' ? true : false);
  if (User.birthday) birthDate = User.birthday.slice(0, 10);

  const handleAddressChange = (e:any) => setChanges({...changes, address: e.target.innerText});

  const handleCityChange = (e:any) => setChanges({...changes, city: e.target.innerText});

  const handlePCChange = (e:any) => setChanges({...changes, city: e.target.innerText});

  const handlePhoneChange = (e:any) => setChanges({...changes, phone: e.target.innerText});

  const handleEmailChange = (e:any) => setChanges({...changes, email: e.target.innerText});

  const handleFirstNameChange = (e:any) => setChanges({...changes, firstName: e.target.innerText});

  const handleLastNameChange = (e:any) => setChanges({...changes, lastName: e.target.innerText});

  const handleSubmitChanges = () => {
    dispatch(modifyUser(changes, token))
        .then((r) => {
          if (r !== 'error') {
            swal.fire({
              text: 'Changes saved succesfully!',
              icon: 'success',
            });
          } else {
            swal.fire({
              text: 'Oops, something went wrong',
              icon: 'error',
            });
          }
        }).catch((err) => console.error(err));
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(User));
  }, [User]);
  const handleSubscribe = () => {
    dispatch(setSubscribe(User.email, subscribed === true ? 'false' : 'true'));
    setTheSubscribed(!subscribed);
  };
  return (
  // anidacion de ternarios for the win! el segundo es por si es un administrador quien mira el perfil y el primero para loguearse
    User.name ?
    <div className='profileAll'>
      <div className='profileLeft'>
        <img className='profilePhoto' src={User.profilePicture || user} alt='profile Pic'/>
        <div className='profileNames'>
          <h2 className='profileName'>
            <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleFirstNameChange}>
              {User.firstName}
            </p>
          </h2>
          <h2 className='profileLastName'>
            <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleLastNameChange}>
              {User.lastName}
            </p>
          </h2>
        </div>
        <h2 className='profileUsername'>{User.name}</h2>
      </div>
      <div className='profileRight'>
        <p className='profileBirthday'>
          Birthday:
          <p className= 'noteditable'>
            {birthDate}
          </p>
        </p>
        {
          User.address ?
          <div>
            <p className='profileAddress'>
               Address:
              <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleAddressChange}>
                {User.address}
              </p>
            </p>
            <p className='profileCity'>
            City:
              <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleCityChange}>
                {User.city},
              </p>
            </p>
            <p className='profileCountry'>
            Country:
              <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleCityChange}>
                {User.country}
              </p>
            </p>
            <p className='profilePostal'>
              Postal Code:
              <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handlePCChange}>
                {User.postalCode}
              </p>
            </p>
            { User.phoneNumber &&
               <p className='profilePhoneNumber'>
               Phone Number:
                 <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handlePhoneChange}>
                   {User.phoneNumber}
                 </p>
               </p>
            }
          </div> :
            <p className='profileAddressForm'>
            It seems you do not have an address, <NavLink to='/address'> create one here!  </NavLink>
            </p>
        }
        <p className='profileEmail'>
          Email:
          <p className={editMode ? 'editable' : 'noteditable'} suppressContentEditableWarning={true} contentEditable={editMode} onInput={handleEmailChange}>
            {User.email}
          </p>
        </p>
        <div className='profileButtons'>
          <input className='material-icons profileEditButton' type='button' value='edit' onClick={() => setEditMode(!editMode)}/>
          { changes.firstName !== User.firstName || changes.lastName !== User.lastName || changes.address !== User.address || changes.city !== User.city || changes.postalCode !== User.postalCode || changes.email !== User.email || changes.phone !== User.phone ?
            <input className='material-icons profileSaveChangesButton' type='button' value='save' onClick={handleSubmitChanges}/> : null
          }
          <input className='profileLogOut' type='button' value='Log Out' onClick={handleLogout}/>
        </div>
        <div className='suscribeMail'>
          <input className='suscribeMailBox' type='checkbox'
            onChange={handleSubscribe}
            checked={subscribed}
          />
          <label className='suscribeMailText'>Subscribe to our Newsletter to get the latest products and offers!</label>
        </div>
        <div className='profileHistoryButton'>
          <NavLink to='/list/order/info'>Your Purchases</NavLink>
        </div>
      </div>
    </div> :
     <div><Login/></div>
  );
};

export default Profile;
