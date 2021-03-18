import React from "react";
import LogoIdea from "components/LogoIdea/LogoIdea";

import { Row } from "reactstrap";

const LostHeader = ({ handleSubmit }) => {
  return (
    <>
      <div className="c-widgetheader d-none d-md-block">
        <Row className="c-widgetheader-bar d-none d-md-flex py-2 pl-3">
          <LogoIdea />
        </Row>
      </div>
    </>
  );
};

export default LostHeader;
