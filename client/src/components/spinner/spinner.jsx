import React from 'react';
import {ThreeDots} from 'react-loader-spinner';

function Spinner() {
  return (
    <div className=" spinner">
      <ThreeDots
        type="Circles"
        color="#1dbf73"
        height={50}
        width={120}
        className=" loader"
      />

    </div>
  );
}

export default Spinner;