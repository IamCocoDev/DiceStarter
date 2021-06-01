import React, {useState} from 'react';
import {useAppDispatch} from '../../../app/hooks';
import {resetPasswordEmail} from '../../../app/actions/actionsUser';
import './resetPasswordEmail.css';

const ResetPasswordEmail = () => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordEmail(input));
    alert(`se envio un mail a ${input}`);
  };
  return (
    <div className='resetPasswordEmail'>
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
