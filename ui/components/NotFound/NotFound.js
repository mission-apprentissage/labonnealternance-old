import React from "react";
import noop from "lodash";
import { WidgetHeader } from "components/WidgetHeader";
import Footer from "components/footer";
import lostCat from "public/images/lostCat.svg";

const NotFound = () => (
  <>

    <div id="page" className="min-vh-100 d-flex flex-column">
      <div id="header">
        <WidgetHeader handleSubmit={noop} />
      </div>
      <div id="content" className="flex-grow-1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, perspiciatis. Adipisci minus at assumenda, repellat ab nisi debitis dolor! Quibusdam excepturi beatae officiis ducimus eius fugit aliquam nulla nostrum minima.
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>


  </>
);

export default NotFound;
