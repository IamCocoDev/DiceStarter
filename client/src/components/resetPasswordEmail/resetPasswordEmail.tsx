import React, {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {resetPasswordEmail} from '../../app/actions/actionsUser';

const ResetPasswordEmail = () => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordEmail(input));
    alert(`se envio un mail a ${input}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label>Enter your email</label>
        <input type="email" value={input} onChange={(e) =>
          setInput(e.target.value)} />
        <input type="submit"/>
      </form>
    </div>
  );
};

export default ResetPasswordEmail;
