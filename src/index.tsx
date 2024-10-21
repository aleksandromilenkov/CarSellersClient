import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Utils/Helpers/ErrorFallback";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store,{ persistor } from "./store";
import GlobalStyle from "./UI/GlobalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
      >
      <GlobalStyle/>
      <App />
    </ErrorBoundary>
        </PersistGate>
      </Provider>
  </React.StrictMode>
);
