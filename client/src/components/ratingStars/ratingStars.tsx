import React from 'react';
import './ratingStars.css';

const RatingStars = (props: any) => {
  // quiero tener un array con el integer rating
  // ahora quiero pushear el rating en estrellas segun el tamano del integer
  // tengo que redondear el numer a 1.0 1.5 2.0 2.5
  // input: 5
  // output: [★ ★ ★ ★ ★]
  // input: 4.5
  // output: [★ ★ ★ ★]
  const starConverter = (num) => {
    const starArr = [];
    const numStar = Math.round(num);
    for (let i = 0; i < numStar; i++) {
      starArr.push(<div key={i} className='material-icons'>star</div>);
    }
    return starArr;
  };
  const {rating} = props;
  const ratingStars = starConverter(rating);
  return (
    ratingStars.length > 0 ?
    <div className='ratingStars'>{ratingStars}</div> :
    <div className='noRating'> No rating yet</div>
  );
};

export default RatingStars;
