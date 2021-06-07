import React from 'react';
import './about.css';
/* import {useState} from 'react'; */

const developers = [{
  name: 'Mateo',
  lastName: 'Hernández',
  linkedIn: 'https://www.linkedin.com/in/mateo-hernandez-dev/',
  gitHub: 'https://github.com/Mate444',
  profilePicture: '',
},
{
  name: 'Benjamín',
  lastName: 'Guerra',
  linkedIn: 'https://www.linkedin.com/in/benjamin-guerra-dev/',
  gitHub: 'https://github.com/Xaldersoul',
  profilePicture: '',
}, {
  name: 'Angelo',
  lastName: 'Escobar',
  linkedIn: 'https://www.linkedin.com/in/angelo-escobar-dev/',
  gitHub: 'https://github.com/angesco',
  profilePicture: '',
}, {
  name: 'Martín',
  lastName: 'Caime',
  linkedIn: 'https://www.linkedin.com/in/mart%C3%ADn-caime-dev/',
  gitHub: 'https://github.com/martincaime',
  profilePicture: '',
}, {
  name: 'Federico',
  lastName: 'Giovenco',
  linkedIn: 'https://www.linkedin.com/in/federico-giovenco-96929320b/',
  gitHub: 'https://github.com/SayMeCoco',
  profilePicture: '',
}, {
  name: 'Alexandra',
  lastName: 'Santiago',
  linkedIn: '',
  gitHub: '',
  profilePicture: '',
}];

function About() {
  return (
    <div className='aboutBox'>
      <h1 className='aboutTitle'>About us</h1>
      {
      developers.map((d, i) => (
        <div className='aboutDevelopers' key={i}>
          <img className='aboutProfilePicture' src={d.profilePicture}/>
          <div className='aboutNames'>
            <p className='aboutFirstName'>
              {d.name}
            </p>
            <p className='aboutLastName'>
              {d.lastName}
            </p>
          </div>
          <a className='aboutLinkedIn' href={d.linkedIn}>
            <img className='aboutLinkedInIcon' src=''/>
          </a>
          <a className='aboutGitHub' href={d.gitHub}>
            <img className='aboutGitHubIcon' src=''/>
          </a>
        </div>
      ))
      }
    </div>
  );
}

export default About;
