import React, {useState} from 'react';
import Select from 'react-select';
import {userChanges} from '../../../types';
import {modifyUser} from '../../../app/actions/actionsUser/index';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {userToken} from '../../../app/reducers/registerReducer';
import {Link} from 'react-router-dom';
import './userList.css';

const UserList = (props:any) => {
  const [changes, setChanges] = useState<userChanges>({
    id: props.id,
    name: props.name,
    firstName: props.firstName,
    lastName: props.lastName,
    birthday: props.birthday,
    country: props.country,
    email: props.email,
    password: props.password,
    role: props.role,
    status: props.status,
  });
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const handleRoleChange = (e: any) => {
    setChanges({...changes, role: e.label});
  };
  const handleStatusChange = (e:any) => {
    setChanges({...changes, status: e.label});
  };
  const handleSubmit = () => {
    dispatch(modifyUser(changes, token));
  };

  const style = {
    container: (provided, state) => ({
      ...provided,
      outline: 'none',
      backgroundColor: '#101010',
      color: 'white',
      width: '70%',
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isSelected ? 'none' : 'white',
      boxShadow: 'none',
      backgroundColor: '#101010',
      color: 'white',
    }),
    ValueContainer: () => ({
      backgroundColor: '#101010',
      color: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#74009D': '#101010',
      cursor: state.isFocused ? 'pointer': 'default',
      color: 'white',
      width: '100%',
    }),
    IndicatorsContainer: (provided, state) => ({
      ...provided,
      backgroundColor: '#101010',
      cursor: state.isFocused ? 'pointer': 'default',
      color: 'white',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#101010',
      color: 'white',
    }),
  };

  return (
    <div className='userListGrid'>
      <Link to={`/profile/${props.id}`} className='userListName'>
        {props.name}
      </Link>
      <p className='userListEmail'>{props.email}</p>
      <div className='userListRole'>
        <Select
          styles={style}
          placeholder={props.role}
          onChange={handleRoleChange} options={props.roles}></Select>
      </div>
      <div className='userListStatus'>
        <Select
          styles={style}
          placeholder={props.status}
          onChange={handleStatusChange} options={props.statuses}></Select>
      </div>
      <button className='userListSubmitButton' onClick={handleSubmit}>
        <i className='material-icons'>save</i>
      </button>
    </div>
  );
};

export default UserList;
