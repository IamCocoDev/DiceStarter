/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {loginGoogle} from '../../app/actions/actionsUser/index';
import {userInfo} from '../../app/reducers/registerReducer';
import {Redirect} from 'react-router';

const GoogleComp = () => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useAppDispatch();
  const User = useAppSelector(userInfo);
  const onSignIn = (googleUser) => {
    console.log(googleUser.profileObj);
    const user = googleUser.profileObj;
    const loginUser = {
      id: user.googleId,
      password: '',
      status: '',
      name: user.name,
      email: user.email,
      firstName: user.givenName,
      lastName: user.familyName,
      birthday: '',
      profilePicture: user.imageUrl,
      address: '',
      city: '',
      postalCode: 0,
      phone: '',
      country: '',
      role: 'user',
    };
    dispatch(loginGoogle(loginUser));
    setRedirect(true);
  };
  useEffect(() => {
    console.log(User);
  }, [User]);
  return (
    <div>
      {redirect === true && <Redirect to={`/home`}></Redirect>}
      <GoogleLogin
        // eslint-disable-next-line max-len
        clientId='196643905398-a4uprd8n3b6k4bop2rvgeb1bpv6p4t87.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={onSignIn}
        onFailure={onSignIn}
      />
    </div>
  );
};

export default GoogleComp;
