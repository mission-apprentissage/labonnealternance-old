import App from "next/app";
import React from "react";
import { ConnectedRouter } from "connected-next-router";
import { wrapper } from "../store/configure-store";
import HeadLaBonneAlternance from "../components/head";

import "public/styles/application.scss";

class ExampleApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <HeadLaBonneAlternance />
        <ConnectedRouter className="c-app">
          <Component {...pageProps} />
        </ConnectedRouter>
      </>
    );
  }
}

export default wrapper.withRedux(ExampleApp);
