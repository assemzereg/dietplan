import { Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

// pages
import Home from "./Home";
import GenInfo from "./GenInfo";
import Prev from "./Prev";
import SDiet from "./SDiet";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const ReactRouterSetup = () => {
  const token = sessionStorage.getItem("token");
  return (
    <IonReactRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/genInfo">
        <GenInfo />
      </Route>
      <Route path="/prev">
        <Prev />
      </Route>
      {token && token != "" && token != undefined ? (
        <>
          <Route path="/sDiet">
            <SDiet />
          </Route>
        </>
      ) : (
        <>
          <Route path="/logIn">
            <LogIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
        </>
      )}
    </IonReactRouter>
  );
};

export default ReactRouterSetup;
