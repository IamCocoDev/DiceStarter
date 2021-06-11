/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {loginGoogle} from '../../../app/actions/actionsUser/index';
import {userInfo} from '../../../app/reducers/registerReducer';
import {Redirect} from 'react-router';
import swal from 'sweetalert2';

const GoogleComp = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useAppDispatch();
  const User = useAppSelector(userInfo);
  const onSignIn = (googleUser) => {
    const user = googleUser.profileObj;
    const loginUser = {
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      firstName: user.givenName,
      lastName: user.familyName,
      profilePicture: user.imageUrl,
    };
    dispatch(loginGoogle(loginUser));
    setRedirect(true);
  };
  const onFailure = () => {
    swal.fire({
      text: 'Opps! something wrong happens...',
      icon: 'warning',
      background: '#202020',
    });
  };
  useEffect(() => {
  }, [User]);
  return (
    <div>
      {redirect === true && <Redirect to={`/profile`}></Redirect>}
      <GoogleLogin
        // eslint-disable-next-line max-len
        clientId='196643905398-a4uprd8n3b6k4bop2rvgeb1bpv6p4t87.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={onSignIn}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleComp;
