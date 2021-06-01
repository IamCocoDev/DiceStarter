import React from 'react';
import './ColorCircle.css';
function ColorCircle(props: { color: string,
    onClick: React.MouseEventHandler<HTMLDivElement> }) {
  return (
    <div
      className="circle"
      onClick={props.onClick}
      style={{backgroundColor: props.color, color: props.color}}>
    </div>
  );
}

export default ColorCircle;
