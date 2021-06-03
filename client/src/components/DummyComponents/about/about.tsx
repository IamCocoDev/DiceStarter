import React from 'react';
import './about.css';
/* import {useState} from 'react'; */

const developers = [{
  name: 'Mateo',
  lastName: 'Hernández',
  linkedIn: 'https://www.linkedin.com/in/mateo-hernandez-7538611b9/',
  gitHub: '',
  profilePicture: '',
},
{
  name: '',
  lastName: '',
  linkedIn: '',
  gitHub: '',
  profilePicture: '',
}, {
  name: '',
  lastName: '',
  linkedIn: '',
  gitHub: '',
  profilePicture: '',
}, {
  name: '',
  lastName: '',
  linkedIn: '',
  gitHub: '',
  profilePicture: '',
}, {
  name: '',
  lastName: '',
  linkedIn: '',
  gitHub: '',
  profilePicture: '',
}, {
  name: '',
  lastName: '',
  linkedIn: '',
  gitHub: '',
  profilePicture: '',
}, {
  name: '',
  lastName: '',
  linkedIn: '',
  gitHub: '',
  profilePicture: '',
}];

function About() {
  return (
    <div className='aboutBox'>
      {developers}
      <h1 className='aboutTitle'>About us</h1>
    </div>
  );
}

export default About;
