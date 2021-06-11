import React, {useState, useEffect} from 'react';
import './carousel.css';

const Carousel = (props:{pictures}) => {
  const [pictureNumber, setPictureNumber] = useState(0);
  const handleClickCounterIncrease = () => {
    if (pictureNumber < props.pictures.length -1) {
      setPictureNumber(pictureNumber + 1);
    }
  };
  const handleClickCounterDecrease = () => {
    if (pictureNumber > 0) {
      setPictureNumber(pictureNumber - 1);
    }
  };
  useEffect(() => {

  }, [pictureNumber]);
  return (
    <div className='carousel'>
      {
      pictureNumber > 0 &&
        pictureNumber !== 0 ?
          <button className='carouselButtonPrev'
            type='button' onClick={handleClickCounterDecrease}>
            <a href={`#img${pictureNumber-1}`} className='imagelink'> ❰ </a>
          </button>: <button className='carouselButtonPrev'></button>
      }
      <div className='carouselAll'>
        {
          props.pictures.map((i, index) =>
            <div key={index} className='slide' id={`img${index}`}>
              <img className='carouselImage'
                src={i} alt='Picture not available'/>
            </div>)
        }
      </div>
      {
      pictureNumber < props.pictures.length - 1 &&
        pictureNumber !== props.pictures.length -1 ?
          <button type='button' className='carouselButtonNext'
            onClick={handleClickCounterIncrease}>
            <a className='imagelink' href={`#img${pictureNumber+1}`}> ❱ </a>
          </button> : <button className='carouselButtonNext'></button>
      }
    </div>
  );
};

export default Carousel;
