import React from "react";
import HeaderForm from "../../components/HeaderForm/HeaderForm";
import LogoIdea from "../../components/LogoIdea/LogoIdea";
import { useRouter } from "next/router";
import { includes } from "lodash";
import { useSelector } from "react-redux";

import { Row } from "reactstrap";

const WidgetHeader = ({ handleSearchSubmit, isHome }) => {
  const router = useRouter();
  const { selectedItem } = useSelector((state) => state.trainings);

  let additionalClassName = selectedItem && includes(router.asPath, "page=fiche") ? "detail" : "global";

  const handleSearchSubmitFunction = (values) => {
    return handleSearchSubmit({ values });
  };

  if (isHome) {
    additionalClassName = "home";
  }

  return (
    <>
      <div className={`c-widgetheader c-widgetheader--${additionalClassName}`}>
        <Row className={`c-widgetheader-bar c-widgetheader-bar--${additionalClassName}`}>
          {isHome ? "" : <LogoIdea />}

          <div>
            {isHome ? (
              <h1 className="card-title">
                <span className="c-home-hero__title c-home-hero__title1 d-block d-lg-inline">
                  Se former et travailler
                </span>
                <span className="c-home-hero__title c-home-hero__title2 d-block d-lg-inline">
                  <span className="d-none d-lg-inline">&nbsp;</span>en alternance
                </span>
              </h1>
            ) : (
              ""
            )}
            <HeaderForm handleSearchSubmit={handleSearchSubmitFunction} isHome={isHome} />
          </div>
        </Row>
      </div>
    </>
  );
};

export default WidgetHeader;
