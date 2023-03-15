import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import {
  chevronBackOutline,
  documentTextOutline,
} from "ionicons/icons";
import React, { useState } from "react";



const Body: React.FC<{
  onDismiss: () => void;
  btitle: string;
  content: {
    definition: string;
    types: string[] | undefined;
    symptoms: string[];
  };
  co : string;
  setCo: (co: string) => void;
}> = ({ onDismiss, btitle, content, co, setCo }) => (
  <IonContent>
    <IonToolbar color="primary">
      <IonIcon onClick={() => onDismiss()} icon={chevronBackOutline} slot="start" size="large" />
      

      <IonTitle>{btitle}</IonTitle>
    </IonToolbar>
    <IonSegment
      value={co}
      onIonChange={(e) => {
        setCo(e.detail.value!);
      }}
    >
      <IonSegmentButton  value="defintion">
        <IonLabel>Defintion</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="symtomps">
        <IonLabel>Symptoms</IonLabel>
      </IonSegmentButton>
      { btitle != "Hypertension" ? (
        <IonSegmentButton value="types">
        <IonLabel>Types</IonLabel>
      </IonSegmentButton>
      ) : <></>}
      
    </IonSegment>
    {co === "defintion" ? (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Definition</IonCardTitle>
          <IonCardSubtitle>what is this disease?</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          {content.definition}
        </IonCardContent>
      </IonCard>
    ) : co === "symtomps"?  (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Symtomps</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {content.symptoms}
        </IonCardContent>
      </IonCard>
    ) : co === "types" ? (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Types</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
        <React.Fragment>
            {content.types!.map((blk, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>
                    {btitle == "diabetes" ? <h3>Type {index + 1}</h3> : <></>}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>{blk}</IonText>
                </IonCardContent>
              </IonCard>
            ))}
          </React.Fragment>
        </IonCardContent>
      </IonCard>
    ) : <></>}
  </IonContent>
);

const Cardgi: React.FC<{
  img: string;
  sub: string;
  title: string;
  content: {
    definition: string;
    types: string[] | undefined;
    symptoms: string[];
  };
}> = ({ img, sub, title, content }) => {
  const [btitle, setTitle] = useState<string>("");
  const [c, setC] = useState<{
    defintion: string;
    types: string[] | undefined;
    symptoms: string[];
  }>();
  const [co, setCo ] = useState<string>('defintion');
  const handleDismiss = () => {
    dismiss();
  };
  const [present, dismiss] = useIonModal(Body, {
    onDismiss: handleDismiss,
    btitle: btitle,
    content: content,
    co : co,
    setCo: setCo,
  });

  const clickHandler = (
    title: string,
    content: {
      definition: string;
      types: string[] | undefined;
      symptoms: string[];
    }
  ) => {
    setTitle(title);
    setC({
      defintion: content.definition,
      types: content.types,
      symptoms: content.symptoms,
    });
    present();
  };

  return (
    <React.Fragment>
      <IonCard>
        <img src={img} />
        <IonCardHeader>
          <IonCardSubtitle>{sub}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
         
          <IonItem color="primary" onClick={() => clickHandler(title, content)}>
            <IonIcon icon={documentTextOutline} slot="start" size="meduim" />
            Learn More
          </IonItem>
        </IonCardContent>
      </IonCard>
    </React.Fragment>
  );
};

export default Cardgi;
