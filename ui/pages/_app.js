import App from "next/app";
import React from "react";
import { ConnectedRouter } from "connected-next-router";
import { wrapper } from "store/configure-store";
import HeadLaBonneAlternance from "components/head";

import "public/styles/application.scss";

import * as Sentry from "@sentry/node";

if (process.env.uiSentryDsn) {
  Sentry.init({
    enabled: true,
    dsn: process.env.uiSentryDsn,
  });
}

class ExampleApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <main className="c-app">
          <HeadLaBonneAlternance />
          <ConnectedRouter>
            <Component {...pageProps} />
          </ConnectedRouter>
        </main>
      </>
    );
  }
}

export default wrapper.withRedux(ExampleApp);
