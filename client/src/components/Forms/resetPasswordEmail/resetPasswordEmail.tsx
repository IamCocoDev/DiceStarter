import React, {useState} from 'react';
import {useAppDispatch} from '../../../app/hooks';
import {resetPasswordEmail} from '../../../app/actions/actionsUser';
import './resetPasswordEmail.css';
import swal from 'sweetalert2';
import {Redirect} from 'react-router';

const ResetPasswordEmail = () => {
  const [input, setInput] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useAppDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordEmail(input));
    swal.fire({
      title: `Email send to ${input}`,
      icon: 'success',
      background: '#202020',
    });
    setRedirect(true);
  };
  return (
    <div className='resetPasswordEmail'>
      {redirect && <Redirect to={'/login'} />}
      <form onSubmit={handleSubmit} >
        <label className='resetPasswordEmailText'>Enter your email</label>
        <input className='resetPasswordEmailInput'
          type="email" value={input} onChange={(e) =>
            setInput(e.target.value)} />
        <input className='resetPasswordEmailButton' type="submit" value='Send'/>
      </form>
    </div>
  );
};

export default ResetPasswordEmail;
