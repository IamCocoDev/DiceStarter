import React, {useState, useEffect} from 'react';

const Carousel = (props:{pictures}) => {
  const [pictureNumber, setPictureNumber] = useState(0);
  console.log(props.pictures);
  console.log(pictureNumber);
  console.log(props.pictures[pictureNumber]);
  const handleClickCounterIncrease = () => {
    if (pictureNumber < props.pictures.length -1) {
      setPictureNumber(pictureNumber + 1);
    }
  };
  const handleClickCounterDecrease = () => {
    if (pictureNumber > 0) {
      setPictureNumber(pictureNumber + 1);
    }
  };
  useEffect(() => {

  }, [pictureNumber]);
  return (
    <div>
      { pictureNumber > 0 &&
        <button className='carouselButtonPrev'
          type='button' onClick={handleClickCounterDecrease}> Prev
        </button>
      }
      <img src={props.pictures[pictureNumber]} alt='Picture not available'/>
      {
        pictureNumber < props.pictures.length - 1 &&
        <button type='button' className='carouselButtonNext'
          onClick={handleClickCounterIncrease}> Next
        </button>
      }
    </div>
  );
};

export default Carousel;
