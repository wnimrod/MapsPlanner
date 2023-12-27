import { Experimental_CssVarsProvider as CSSVarsProvider } from "@mui/material";
import store from "src/store/store";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import DependenciesProvider from "./components/DependenciesProvider.tsx";
import LanguageProvider from "./components/LanguageProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CSSVarsProvider>
          <LanguageProvider>
            <DependenciesProvider Component={App} />
          </LanguageProvider>
        </CSSVarsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
