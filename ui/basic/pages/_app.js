import App from 'next/app'
import React from 'react'
import { ConnectedRouter } from 'connected-next-router'
import { wrapper } from '../store/configure-store'
import Head from 'next/head'

// global import, works, but module-approach should be preffered
import "public/styles/mapbox-gl.scss";
import "public/styles/searchfor.scss";
import "public/styles/spinner.scss";

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
