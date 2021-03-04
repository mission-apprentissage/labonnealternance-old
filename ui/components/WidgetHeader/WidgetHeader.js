import React from "react";
import HeaderForm from "components/HeaderForm/HeaderForm";
import LogoIdea from "components/LogoIdea/LogoIdea";

import { Row } from "reactstrap";

const WidgetHeader = ({ handleSubmit }) => {
  return (
    <>
      <div className="c-widgetheader d-none d-md-block">
        <Row className="c-widgetheader-bar d-none d-md-flex py-2 pl-3">
          <LogoIdea />
          <div className="ml-4">
            <HeaderForm handleSubmit={handleSubmit} />
          </div>
        </Row>
      </div>
    </>
  );
};

export default WidgetHeader;
