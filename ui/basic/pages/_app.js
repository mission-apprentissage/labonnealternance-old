import App from 'next/app'
import React from 'react'
import { ConnectedRouter } from 'connected-next-router'
import { wrapper } from '../store/configure-store'
import Head from 'next/head'

import 'public/styles/application.scss';
// import 'public/styles/custom-bootstrap.scss';
// import 'bootstrap/scss/bootstrap.scss';

// import our own components
// import 'public/styles/components/navigation.scss';
// import "public/styles/components/all_components.scss";




class ExampleApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ConnectedRouter className="c-app">
        <Component {...pageProps} />
      </ConnectedRouter>
    )
  }
}

export default wrapper.withRedux(ExampleApp)
