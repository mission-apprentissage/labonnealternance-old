import App from "next/app";
import React from "react";
import { ConnectedRouter } from "connected-next-router";
import { wrapper } from "store/configure-store";
import HeadLaBonneAlternance from "components/head";

import "public/styles/application.scss";

import * as Sentry from "@sentry/node";
import * as SentryReact from "@sentry/react";

if (process.env.uiSentryDsn) {
  Sentry.init({ dsn: process.env.uiSentryDsn, enabled: true, environment: process.env.env });
  SentryReact.init({ dsn: process.env.uiSentryDsn, enabled: true, environment: process.env.env });
}

class ExampleApp extends App {

  constructor(props) {
    super(props);
    this.state = { isMobile: false };
  }

  static async getInitialProps(context) {
    // récupération du hostname pour initialiser les fonts en preload
    const { req } = context.ctx;
    let host = "";
    if (req) {
      host = req.headers.host;
      host = `${host.startsWith("localhost") ? "http" : "https"}://${host}`;
    }

    return { host };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      const ismobile = window.innerWidth < 768;
      this.setState({
        isMobile: ismobile
      });
      if (ismobile) {
        console.log('yes, is mobile')
      } else {
        console.log('not, isznt mobile')
      }
    }, false);
  }

  

  render() {
    const { Component, pageProps, host } = this.props;

    return (
      <>
        <main className="c-app overflow-hidden">
          <HeadLaBonneAlternance publicUrl={host && process.env.publicUrl ? host : ""} />
          <ConnectedRouter>
            <Component {...pageProps} isMobile={this.state.isMobile}/>
          </ConnectedRouter>
        </main>
      </>
    );
  }
}

export default wrapper.withRedux(ExampleApp);
