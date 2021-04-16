import React from "react";
import HeaderForm from "components/HeaderForm/HeaderForm";
import LogoIdea from "components/LogoIdea/LogoIdea";

import { Row } from "reactstrap";

const WidgetHeader = ({ handleSearchSubmit }) => {
  return (
    <>
      <div className="c-widgetheader d-none d-md-block">
        <Row className="c-widgetheader-bar d-none d-md-flex py-2 pl-3">
          <LogoIdea />
          <div>
            <HeaderForm handleSearchSubmit={handleSearchSubmit} />
          </div>
        </Row>
      </div>
    </>
  );
};

export default WidgetHeader;
