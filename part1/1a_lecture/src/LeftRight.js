import React, { useState } from 'react';

import { Button } from './Counter';

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {allClicks.join(' ')}</div>;
};

const LeftRight = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setClicks({
      ...clicks,
      left: clicks.left + 1,
    });
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setClicks({
      ...clicks,
      right: clicks.right + 1,
    });
  };

  return (
    <div>
      <div>
        {clicks.left}
        <Button handleClick={handleLeftClick} text="left"></Button>
        <Button handleClick={handleRightClick} text="right"></Button>
        {clicks.right}
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

export default LeftRight;
