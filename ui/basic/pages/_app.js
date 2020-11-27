import App from 'next/app'
import React from 'react'
import { ConnectedRouter } from 'connected-next-router'
import { wrapper } from '../store/configure-store'
import Head from 'next/head'

import "../public/styles/LogoIdea.scss";

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
