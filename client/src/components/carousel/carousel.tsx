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
    <div className='carouselAll'>
      { pictureNumber > 0 &&
        <button className='carouselButtonPrev'
          type='button' onClick={handleClickCounterDecrease}> ❰
        </button>
      }
      <img className='carouselImage'
        src={props.pictures[pictureNumber]} alt='Picture not available'/>
      {
        pictureNumber < props.pictures.length - 1 &&
        <button type='button' className='carouselButtonNext'
          onClick={handleClickCounterIncrease}> ❱
        </button>
      }
    </div>
  );
};

export default Carousel;
