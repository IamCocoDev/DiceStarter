import React, {useState} from 'react';
import {formData, formInputData, registerInput} from '../../types';

// function validate(input: registerInput) {
//   const errors: registerInput = {
//     username: '',
//     email: '',
//     firstname: '',
//     lastname: '',
//     password: '',
//     confirmPassword: '',
//   };

//   return errors;
// };

const FormRegisterForm = () => {
  const [input, setInput] = useState<registerInput>({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: formData) => {
    e.preventDefault();
  };

  const handleChange = (e: formInputData) => {
    const data: string = e.target.value;
    setInput({...input, [e.target.name]: data});
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input type="text"
            name="username"
            onChange={handleChange}
            value={input.username}
          />
        </div>
        <div>
          <label htmlFor="">Firstname</label>
          <input type="text"
            name="firstname"
            onChange={handleChange}
            value={input.username}
          />
          <label htmlFor="">Lastname</label>
          <input type="text"
            name="lastname"
            onChange={handleChange}
            value={input.username}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email"
            name="email"
            onChange={handleChange}
            value={input.email}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password"
            name="password"
            onChange={handleChange}
            value= {input.password}
          />
        </div>
        <div>
          <label htmlFor="">Confirm Password</label>
          <input type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={input.confirmPassword}
          />
        </div>
      </form>
    </div>
  );
};

export default FormRegisterForm;
