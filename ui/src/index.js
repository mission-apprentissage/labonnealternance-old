import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import configureStore, { history } from "./redux";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ErrorBoundary from  "./ErrorBoundary";
import { getWidgetParameters, getIsTrainingOnly } from "./services/config";
import DomainError from  "./pages/SearchForTrainingsAndJobs/components/DomainError/DomainError.js";

const store = configureStore();

async function init() {
  Sentry.init({
    dsn: "https://57ef0b6bede14fbe8449e584a1044047@o154210.ingest.sentry.io/5417811",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });

  const isTrainingOnly = getIsTrainingOnly();
  getWidgetParameters();

  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App isTrainingOnly={isTrainingOnly} />
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>,
    document.getElementById("root")
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}


/*
* HACK : Global error catching. 
* See https://stackoverflow.com/a/56255288/2595513
*/
let console = (function(oldCons){
  return {
    log: function(text){
      oldCons.log(text);
    },
    info: function (text) {
      oldCons.info(text);
    },
    warn: function (text) {
      oldCons.warn(text);
    },
    error: function (text) {
      oldCons.error(text);
      if (text === '__unhandledrejection__') {
        Sentry.captureException(text);
        ReactDOM.render(<div style={{'textAlign' : 'center'}}><DomainError/></div>, document.getElementById('root'))
      }
    }
  };
}(window.console));
// catch unhandled promises
window.addEventListener("unhandledrejection", (event) => {
  console.error('__unhandledrejection__');
  console.error(event.reason);
});
/*
* End of Hack
*/

const parseChangelog = require('changelog-parser')
// parseChangelog('../../CHANGELOG.md', function (err, result) {
//   if (err) throw err
 
//   // changelog object
//   console.log(result)
// })
parseChangelog('../../CHANGELOG.md')
  .then(function (result) {
    // changelog object
    console.log(result)
  })
  .catch(function (err) {
    // Whoops, something went wrong!
    console.error(err)
  })

/*
* ACTUALLY STARTS THE APP
*/
init();
