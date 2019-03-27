import React from 'react';

import MainLeft from './MainLeft';
import MainRight from './MainRight';

const Main = () => (
  <div className="inner-row">
    <div className="inner-col">
      <MainLeft />
    </div>
    <MainRight />
  </div>
);

export default Main;
