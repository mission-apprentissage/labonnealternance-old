import React from "react";

import { Collapse } from "reactstrap";

const MatchaDescription = ({ job }) => {
  // Collapse Open state
  const [isOpen, setIsOpen] = React.useState(false);

  const getText = () => {
    return job.job.description;
  };

  return job?.job?.description ? (
    <>
      <div className="c-accordion">
        <button
          className="c-accordion-button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="c-accordion-button-title">Description du métier</span>
          <span className="c-accordion-button-plus">{isOpen ? "-" : "+"}</span>
        </button>
        <Collapse isOpen={isOpen} className="c-collapser">
          {getText()}
        </Collapse>
      </div>
    </>
  ) : (
    ""
  );
};

export default MatchaDescription;
