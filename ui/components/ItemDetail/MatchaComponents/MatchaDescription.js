import ExternalLink from "@/components/externalLink";
import React from "react";

import { Collapse } from "reactstrap";

const MatchaDescription = ({job}) => {
  // Collapse Open state
  const [isOpen, setIsOpen] = React.useState(false);

  const getTitle = () => {
    let res = "title";
    return res;
  };

  const getText = () => {
    let res = "text";
    
    
    return res;
  };

  return (
    <>
      <div className="c-accordion">
        <button
          className="c-accordion-button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className="c-accordion-button-title">{getTitle()}</span>
          <span className="c-accordion-button-plus">{isOpen ? "-" : "+"}</span>
        </button>
        <Collapse isOpen={isOpen} className="c-collapser">
          {getText()}
        </Collapse>
      </div>
    </>
  );
};

export default MatchaDescription;
