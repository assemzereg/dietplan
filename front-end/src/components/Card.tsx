import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

const Card: React.FC<{
  img: string;
  sub: string;
  title: string;
  content: string;
}> = ({ img, sub, title, content }) => {
  return (
    <IonCard>
      <img src={img} />
      <IonCardHeader>
        <IonCardSubtitle>{sub}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{content}</IonCardContent>
    </IonCard>
  );
};

export default Card;
