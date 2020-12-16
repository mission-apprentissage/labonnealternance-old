import React from "react";

const SimulatedError = (props) => {

  throw new Error('simulated error...')

  return (
    <div>
    </div>
  );
};
export default SimulatedError;
