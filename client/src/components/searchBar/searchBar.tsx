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
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button>save</button>
    </form>
  );
}

export default searchBar;
