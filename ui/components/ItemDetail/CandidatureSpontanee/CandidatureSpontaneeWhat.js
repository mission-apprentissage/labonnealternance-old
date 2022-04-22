import React from "react";

import { Collapse, Button } from "reactstrap"

const CandidatureSpontaneeWhat = () => {

  // Collapse Open state
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div style={{
        display: 'block', width: 900, padding: 30
      }}>
        <Button color="primary" onClick={() => {
          setIsOpen(!isOpen)
        }}>Toggle Me to see Collapse Component!</Button>
        <Collapse isOpen={isOpen}>
          <p>I am sample Text to display</p>
        </Collapse>
      </div >
    </>
  );

};

export default CandidatureSpontaneeWhat;
