import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Layout from "./components/Layout";
import { ScrollToTop } from "./components";
import { NotFound, WidgetTester, SearchForTrainingsAndJobs } from "./pages";

import routes from "./routes.json";

import "./App.css";

const App = ({ isTrainingOnly }) => {
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
