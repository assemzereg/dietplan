import React from "react";
import { IonContent } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";
import Menu from "../components/Menu";
import Cardgi from "../components/Cardgi";
import { GenInfoc } from "../db/GenInfoc";
import Toolbar from "../components/Toolbar";

const GenInfo: React.FC = () => {
  return (
    <IonContent>
      <Menu />
      <IonContent className="ion-page" id="main-content">
        <Toolbar title="General Info" />
        {GenInfoc.map((card) => {
          return <Cardgi key={card.id} {...card} />;
        })}
      </IonContent>
    </IonContent>
  );
};

export default GenInfo;
