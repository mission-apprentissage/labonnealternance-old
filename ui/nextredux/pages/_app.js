import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Layout from "../components/Layout";
import { ScrollToTop } from "../components";
import { NotFound, WidgetTester, SearchForTrainingsAndJobs } from "../zpages";

import routes from "../routes.json";

import "./App.module.css";

const App = ({ isTrainingOnly }) => {

  // // window object is not accessible from SSR, 
  // // whereas componentDidMount starts only  
  // // once browser has loaded the page.
  // // 
  // // See https://stackoverflow.com/a/55151122/2595513
  // componentDidMount(() => {
  // /*
  // * HACK : Global error catching. 
  // * See https://stackoverflow.com/a/56255288/2595513
  // */
  //   let console = (function(oldCons){
  //     return {
  //       log: function(text){
  //         oldCons.log(text);
  //       },
  //       info: function (text) {
  //         oldCons.info(text);
  //       },
  //       warn: function (text) {
  //         oldCons.warn(text);
  //       },
  //       error: function (text) {
  //         oldCons.error(text);
  //         if (text === '__unhandledrejection__') {
  //           Sentry.captureException(text);
  //           ReactDOM.render(<div style={{'textAlign' : 'center'}}><DomainError/></div>, document.getElementById('root'))
  //         }
  //       }
  //     };
  //   }(window.console));
  // // catch unhandled promises
  //   window.addEventListener("unhandledrejection", (event) => {
  //     console.error('__unhandledrejection__');
  //     console.error(event.reason);
  //   });
  // })



  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path={routes.LANDING}
          render={(props) => <SearchForTrainingsAndJobs {...props} isTrainingOnly={isTrainingOnly} />}
        />
        <Route exact path={routes.WIDGETTESTER} component={WidgetTester} />
        <Route
          exact
          path={routes.SEARCHFORTRAININGSANDJOBS}
          render={(props) => <SearchForTrainingsAndJobs {...props} isTrainingOnly={isTrainingOnly} />}
        />
        <Route component={NotFound} />
      </Switch>
      </Layout>
      );
};

export default withRouter(App);
