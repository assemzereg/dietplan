import React from "react";
import {
  IonContent,
} from "@ionic/react";

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

import { cards } from "../db/cards";

import Card from "../components/Card";
import Menu from "../components/Menu";
import Toolbar from "../components/Toolbar";

const Prev: React.FC = () => {
  return (
    <IonContent>
      <Menu />
      <IonContent className="ion-page" id="main-content">
        <Toolbar title="Prevention" />
        {cards.map((card) => {
          return <Card key={card.id} {...card} />;
        })}
      </IonContent>
    </IonContent>
  );
};

export default Prev;
