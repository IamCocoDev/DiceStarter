import React, {useState} from 'react';
import './searchBar.css';

type formData = React.FormEvent<HTMLElement>;

function searchBar(): JSX.Element {
  const [input, setInput] = useState('');

  const handleSubmit = (e: formData) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setInput(e.target.value)}
        className="searchBarText" />
      <input type="submit" value="Search" className="searchBarSubmit"/>
    </form>
  );
}

export default searchBar;
