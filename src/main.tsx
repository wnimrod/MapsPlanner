import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "src/store/store";
import { BrowserRouter } from "react-router-dom";
import { Experimental_CssVarsProvider as CSSVarsProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CSSVarsProvider>
          <App />
        </CSSVarsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
