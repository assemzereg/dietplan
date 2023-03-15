import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { IonReactRouter } from "@ionic/react-router";

ReactDOM.render(
  <React.StrictMode>
    <IonReactRouter>
      <App />
    </IonReactRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
