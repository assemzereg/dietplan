import {
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonTitle,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

const Toolbar: React.FC<{ title: string }> = ({ title }) => {
  const history = useHistory();
  const token = sessionStorage.getItem("token");
  const RouteChange = () => {
    history.push("/logIn");
  };
  return (
    <React.Fragment>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        {token && token != "" && token != undefined ? (
          <IonButton
            slot="end"
            fill="default"
            size="small"
            onClick={() => {
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("user");

              history.push("/");
              window.location.reload();
            }}
          >
            LogOut
          </IonButton>
        ) : (
          <>
            {title != "LogIn" ? (
              <IonButton
                slot="end"
                fill="default"
                size="small"
                onClick={RouteChange}
              >
                LogIn
              </IonButton>
            ) : (
              <></>
            )}
          </>
        )}

        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </React.Fragment>
  );
};

export default Toolbar;
