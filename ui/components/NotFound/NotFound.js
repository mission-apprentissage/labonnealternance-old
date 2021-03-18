import React from "react";
import noop from "lodash";
import { WidgetHeader } from "components/WidgetHeader";
import lostCat from "public/images/lostCat.svg";

const NotFound = () => (
  <>

    <WidgetHeader handleSubmit={noop} />
    <div className="container-fluid d-flex min-vh-100 flex-column">
      <div className="row bg-light flex-fill fill d-flex justify-content-start">
        <div className="col">
          text
        </div>
        <div className="col">
          img
        </div>
      </div>
    </div>

  </>
);

export default NotFound;
