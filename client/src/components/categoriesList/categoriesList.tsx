/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {userToken} from '../../app/reducers/registerReducer';
import {putCategory} from '../../app/actions/handleProductsActions';

const CategoriesList = (props) => {
  const [input, setInput] = useState(props.name);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const handleClick = (e) => {
    e.preventDefault();
    const newcategory = {
      name: input,
    };
    console.log(token);
    dispatch(putCategory(props.name, newcategory, token));
  };
  return (
    <>
      <div>
        <input type="text" value={input}
          onChange={(e) => setInput(e.target.value)} />
        <input type="button" value="Modify" onClick={handleClick} />
      </div>
    </>
  );
};

export default CategoriesList;
