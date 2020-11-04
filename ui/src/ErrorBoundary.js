import React from "react";
import ReactDOM from "react-dom";

import * as Sentry from "@sentry/react";
import DomainError from  "./pages/SearchForTrainingsAndJobs/components/DomainError/DomainError.js";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error);
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return <div style={{'textAlign' : 'center'}}><DomainError/></div>;
    }

    return this.props.children; 
  }
}
