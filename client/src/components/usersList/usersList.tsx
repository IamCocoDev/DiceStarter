import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getUsers} from '../../app/actions/actionsUser/index';
import {users, userToken} from '../../app/reducers/registerReducer';
import {User} from '../../types';
import UserList from '../userList/userList';
import './usersList.css';

const roles = [{
  value: 0,
  label: 'User',
}, {
  value: 1,
  label: 'Admin',
}];

const statuses = [{
  value: 0,
  label: 'Active',
}, {
  value: 1,
  label: 'Closed',
}, {
  value: 2,
  label: 'Banned',
}];

const UsersList = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const usersArray = useAppSelector(users);
  console.log(token);
  useEffect(() => {
    dispatch(getUsers(token));
  }, []);
  return (
    <div className='usersListAll'>
      <div className='usersListHeaders'>
        <h1>Username</h1>
        <h1>Name</h1>
        <h1>Last Name</h1>
        <h1>Birthday</h1>
        <h1>Country</h1>
        <h1>Email</h1>
        <h1>Role</h1>
        <h1>Status</h1>
      </div>
      {
        usersArray !== null && usersArray.map((u:User, i:number) => (
          <UserList
            key={i}
            id={u.id}
            name={u.name}
            firstName={u.firstName}
            lastName={u.lastName}
            birthday={u.birthday}
            country={u.country}
            email={u.email}
            role={u.role}
            status={u.status}
            password={u.password}
            statuses={statuses}
            roles={roles}
          />
        ))
      }
    </div>
  );
};

export default UsersList;
