import {
  Experimental_CssVarsProvider as CSSVarsProvider,
  StyledEngineProvider
} from "@mui/material";
import { SnackbarProvider } from "notistack";
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
        <LanguageProvider>
          <StyledEngineProvider injectFirst>
            <CSSVarsProvider>
              <SnackbarProvider maxSnack={5}>
                <DependenciesProvider Component={App} />
              </SnackbarProvider>
            </CSSVarsProvider>
          </StyledEngineProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
