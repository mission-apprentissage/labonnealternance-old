import App from 'next/app'
import React from 'react'
import { ConnectedRouter } from 'connected-next-router'
import { wrapper } from '../store/configure-store'
import Head from 'next/head'

// global import, works, but module-approach should be preffered
import "public/styles/mapbox-gl.scss";
import "public/styles/searchfor.scss";
import "public/styles/spinner.scss";
import "public/styles/widgettester.scss";
import "public/styles/FakeFeature.scss";
import "public/styles/itemdetail.scss";
import "public/styles/ideaTitle.scss";
import "public/styles/jobAdvice.scss";
import "public/styles/ideaHeader.scss";
import "public/styles/errorMessage.scss";
import "public/styles/AutoCompleteField.scss";
import "public/styles/DomainError.scss";

import 'bootstrap/scss/bootstrap.scss';


class ExampleApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ConnectedRouter>
        <Component {...pageProps} />
        </ConnectedRouter>
        )
  }
}

export default wrapper.withRedux(ExampleApp)
