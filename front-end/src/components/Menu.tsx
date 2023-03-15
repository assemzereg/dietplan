import React from "react";
import {
  IonIcon,
  IonList,
  IonItem,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import {
  informationCircleOutline,
  leaf,
  fastFoodOutline,
  homeOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Menu: React.FC = () => {
  const history = useHistory();
  const RouteChange = (path: string) => {
    history.push(path);
  };
  const token = sessionStorage.getItem("token");
  return (
    <IonMenu side="start" menuId="first" contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem onClick={() => RouteChange("/")}>
            <IonIcon icon={homeOutline} slot="start" size="meduim" />
            Home
          </IonItem>

          <IonItem onClick={() => RouteChange("/genInfo")}>
            <IonIcon
              icon={informationCircleOutline}
              slot="start"
              size="meduim"
            />
            General Informations
          </IonItem>

          <IonItem onClick={() => RouteChange("/prev")}>
            <IonIcon icon={leaf} slot="start" size="meduim" />
            Prevention
          </IonItem>
          {token && token != "" && token != undefined ? (
            <IonItem onClick={() => RouteChange("/sDiet")}>
              <IonIcon icon={fastFoodOutline} slot="start" size="meduim" />
              Special Diet
            </IonItem>
          ) : (
            <></>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
