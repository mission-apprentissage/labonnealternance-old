import App from "next/app";
import React from "react";
import HeadLaBonneAlternance from "components/head";

import Providers from "../context/Providers";

import "public/styles/application.scss";

//import * as Sentry from "@sentry/node";
//import * as SentryReact from "@sentry/react";
import PageTracker from "@/components/pageTracker";
import { getEnvFromProps } from "utils/env";

/*if (process.env.uiSentryDsn) {
  Sentry.init({ dsn: process.env.uiSentryDsn, enabled: true, environment: process.env.env });
  SentryReact.init({ dsn: process.env.uiSentryDsn, enabled: true, environment: process.env.env });
}*/

class LaBonneAlternance extends App {
  static async getInitialProps(context) {
    // récupération du hostname pour initialiser les fonts en preload
    const { req } = context.ctx;
    let host = "";
    let shouldLoadAnalytics = true;

    if (req?.headers?.host) {
      host = req.headers.host;
      host = `${host.startsWith("localhost") ? "http" : "https"}://${host}`;
    }

    // identification des exceptions au chargement d'analytics
    if (/caller=TSA/g.test(req?.url)) {
      shouldLoadAnalytics = false;
    }

    return { host, shouldLoadAnalytics };
  }

  render() {
    const { Component, pageProps, host, shouldLoadAnalytics } = this.props;

    const env = getEnvFromProps(this.props).env;

    return (
      <Providers env={env}>
        <PageTracker>
          <main className="c-app">
            <HeadLaBonneAlternance
              shouldLoadAnalytics={shouldLoadAnalytics}
              publicUrl={host && process.env.publicUrl ? host : ""}
            />
            <Component {...pageProps} />
          </main>
        </PageTracker>
      </Providers>
    );
  }
}
export default LaBonneAlternance;
