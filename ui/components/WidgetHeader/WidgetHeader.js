import React from "react";
import HeaderForm from "components/HeaderForm/HeaderForm";
import LogoIdea from "components/LogoIdea/LogoIdea";
import { useRouter } from "next/router";
import { includes } from "lodash";

import { Row } from "reactstrap";

const WidgetHeader = ({ handleSearchSubmit }) => {
  const router = useRouter()
  const additionalClassName = includes(router.asPath, 'page=fiche') ? 'detail' : 'global';

  return (
    <>
      <div className={`c-widgetheader c-widgetheader--${additionalClassName}`}>
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
