import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {userChanges} from '../../types';
import {modifyUser, getUsers} from '../../app/actions/actionsUser/index';
import {useAppDispatch} from '../../app/hooks';
import './userList.css';

const UsersList = (props:any) => {
  const [changes, setChanges] = useState<userChanges>({
    id: props.id,
    role: props.role,
    status: props.status,
  });
  const dispatch = useAppDispatch();
  const handleRoleChange = (e: any) => {
    setChanges({...changes, role: e.label});
  };
  const handleStatusChange = (e:any) => {
    setChanges({...changes, status: e.target.label});
  };
  const handleSubmit = () => {
    dispatch(modifyUser(changes));
    setChanges({
      id: '',
      role: '',
      status: '',
    });
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [changes]);
  return (
    <div className='userListGrid'>
      <h1 className='userListName'>{props.name}</h1>
      <p className='userListFirstName'>{props.firstName}</p>
      <p className='userListLastName'>{props.lastName}</p>
      <p className='userListBirthday'>{props.birthday}</p>
      <p className='userListCountry'>{props.country}</p>
      <p className='userListEmail'>{props.email}</p>
      <Select className='userListRole' placeholder={props.role}
        onChange={handleRoleChange} options={props.roles}></Select>
      <Select className='userListStatus' placeholder={props.status}
        onChange={handleStatusChange} options={props.statuses}></Select>
      <button className='userListSubmitButton' onClick={handleSubmit}>
        Send Changes
      </button>
    </div>
  );
};

export default UsersList;
