import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
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

import Menu from "../components/Menu";
import Toolbar from "../components/Toolbar";
import { Sport } from "../db/sport";
import { axios } from "../axios";
import { informationCircleOutline } from "ionicons/icons";

const Body: React.FC<{
  onDismiss: () => void;
  block: string[];
  btitle: string;
  img: string;
}> = ({ onDismiss, block, btitle, img }) => (
  <IonContent>
    <IonToolbar color="primary">
      <IonIcon icon={informationCircleOutline} slot="start" size="large" />
      <h4 style={{ padding: 5 }} onClick={() => onDismiss()} slot="end">
        Close
      </h4>

      <IonTitle>{btitle}</IonTitle>
    </IonToolbar>

    <IonCard>
      <img src={img} />
      <IonCardHeader>
        <IonCardTitle>Benifits</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {block.map((b) => {
          return (
            <>
              <IonText>{b}</IonText>
              <br />
            </>
          );
        })}
      </IonCardContent>
    </IonCard>
  </IonContent>
);
const SDiet: React.FC = () => {
  const [choice, setChoice] = useState<String>("");
  const [weight, setweight] = useState("");
  const [height, setheight] = useState("");
  const [bloodL, setbloodL] = useState("");
  const [blerror, setblerror] = useState(false);
  const [entered, setentered] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [diets, setDiets] = useState<any>();
  const [Dtitle, setDtitle] = useState("");
  const [bodyInfo, setBodyInfo] = useState<[string[], string, string]>([
    [],
    "",
    "",
  ]);
  const [alert, setAlert] = useState<[boolean, string]>([false, ""]);

  const user = JSON.parse(sessionStorage.getItem("user")!);
  const deitInfo = {
    dietName: Dtitle,
    user: user,
    bloodL: bloodL,
  };
  const update = async (e: React.FormEvent) => {
    e.preventDefault();

    if (weight) {
      axios
        .patch("/users/" + user.id, { weight: Number(weight) })
        .then(() => {
          console.log("weight modified with success");
          setweight("");
        })
        .catch((error) => {
          console.error("there is an errrooor ", error);
          setAlert([true, "not a valid weight/height"]);
          setweight("");
        });
    }
    if (height) {
      axios
        .patch("/users/" + user.id, { height: Number(height) })
        .then(() => {
          console.log("Height modified with success");
          setheight("");
        })
        .catch((error) => {
          console.error("there is an errrooor ", error);
          setAlert([true, "not a valid weight/height"]);
          setheight("");
        });
    }
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setsubmitted(true);
    if (!bloodL) {
      setentered(false);
      setblerror(true);
    } else {
      axios
        .post("/regime", deitInfo)
        .then((res) => {
          console.log(res.data.diet);
          console.log(res.data.key);
          setDiets(res.data.diet);
        })
        .catch((error) => {
          console.error("an error accured", error);
        });
      setentered(true);

      console.log(Number(bloodL));
    }
  };

  // get diets

  useEffect(() => {
    const t = sessionStorage.getItem("notif");
    if (t != undefined && t != "" && t != null) {
      setDtitle(t);
      sessionStorage.removeItem("notif");
    }
  }, []);
  // body handling
  const handleDismiss = () => {
    dismiss();
  };
  const [present, dismiss] = useIonModal(Body, {
    onDismiss: handleDismiss,
    block: bodyInfo[0],
    btitle: bodyInfo[1],
    img: bodyInfo[2],
  });

  // click handler to show the body
  const clickHandler = (content: string[], title: string, img: string) => {
    setBodyInfo([content, title, img]);
    present();
  };

  return (
    <IonContent>
      <Menu />
      <IonContent className="ion-page" id="main-content">
        <Toolbar title="Special Diet" />
        <br />
        <IonSegment
          onIonChange={(e) => {
            setChoice(e.detail.value!);
            if (e.detail.value == "Sdiet") {
              if (user.disease == "hypertension") {
                axios
                  .post("/regime", deitInfo)
                  .then((res) => {
                    console.log(res.data.diet);
                    setDiets(res.data.diet);
                  })
                  .catch((error) => {
                    console.error("an error accured", error);
                  });
              }
            }
          }}
        >
          <IonSegmentButton value="Sdiet">
            <IonLabel>Special diet</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Reset">
            <IonLabel>weight/height</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="Sport">
            <IonLabel>Sport</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {choice == "Sdiet" ? (
          <>
            <br />
            {user.disease === "diabetes" ? (
              <>
                {entered == false ? (
                  <form noValidate onSubmit={submit}>
                    <IonItem>
                      <IonLabel position="stacked" color="primary">
                        enter your blood sugar level
                      </IonLabel>
                      <IonInput
                        type="number"
                        value={bloodL}
                        onIonChange={(e) => {
                          setbloodL(e.detail.value!);
                          setblerror(false);
                        }}
                      ></IonInput>
                    </IonItem>
                    {submitted && blerror && (
                      <IonText color="danger">
                        <p className="ion-padding-start">
                          you need to inter your blood sugar level
                        </p>
                      </IonText>
                    )}
                    <IonRow>
                      <IonCol>
                        <IonButton type="submit" expand="block">
                          submit
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </form>
                ) : (
                  <>
                    {Number(bloodL) < 0.7 ? (
                      <IonCard>
                        <IonItem>
                          <h4>
                            you need to drink some mixed water with sugar before
                            this meal
                          </h4>
                        </IonItem>
                      </IonCard>
                    ) : (
                      <></>
                    )}
                    {diets != undefined && diets != null ? (
                      <IonCard>
                        {Dtitle == "breakfast" ? (
                          <img src="/assets/breakfast.jpg" alt="" />
                        ) : (
                          <>
                            {Dtitle == "lunch" ? (
                              <img src="/assets/lunch.jpeg" alt="" />
                            ) : (
                              <>
                                {Dtitle == "snack" ? (
                                  <img src="/assets/snack.jpg" alt="" />
                                ) : (
                                  <>
                                    {Dtitle == "dinner" ? (
                                      <img src="/assets/dinner.jpg" alt="" />
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}

                        <IonCardHeader>
                          <IonCardTitle>Ingredients</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                          {diets.ingredients.map((ingredient: any) => {
                            return (
                              <>
                                <IonItem>
                                  <IonText>{ingredient.choices} : </IonText>
                                  <IonText>{ingredient.weight} g</IonText>
                                </IonItem>
                              </>
                            );
                          })}
                        </IonCardContent>
                      </IonCard>
                    ) : (
                      <IonCard>
                        <IonText>Please wait for the notification</IonText>
                      </IonCard>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {diets != undefined && diets != null ? (
                  <IonCard>
                    {Dtitle == "breakfast" ? (
                      <img src="/assets/breakfast.jpg" alt="" />
                    ) : (
                      <>
                        {Dtitle == "lunch" ? (
                          <img src="/assets/lunch.jpeg" alt="" />
                        ) : (
                          <>
                            {Dtitle == "snack" ? (
                              <img src="/assets/snack.jpg" alt="" />
                            ) : (
                              <>
                                {Dtitle == "dinner" ? (
                                  <img src="/assets/dinner.jpg" alt="" />
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}

                    <IonCardHeader>
                      <IonCardTitle>Ingredients</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {diets.ingredients != undefined ? (
                        <>
                          {diets.ingredients.map((ingredient: any) => {
                            return (
                              <>
                                <IonItem>
                                  <IonText>{ingredient.choices} : </IonText>
                                  <IonText>{ingredient.weight} g</IonText>
                                </IonItem>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <IonItem>
                            <IonText>do not eat anything now</IonText>
                          </IonItem>
                        </>
                      )}
                    </IonCardContent>
                  </IonCard>
                ) : (
                  <IonCard>
                    <IonText>Please wait for the notification</IonText>
                  </IonCard>
                )}
              </>
            )}
          </>
        ) : choice == "Reset" ? (
          <>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonAlert
                    isOpen={alert[0]}
                    onDidDismiss={() => setAlert([false, ""])}
                    header={"Error!"}
                    message={alert[1]}
                    buttons={["Dismiss"]}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
            <br />
            <IonItem>
              <IonText>Update Your Weight and Height</IonText>
            </IonItem>
            <form noValidate onSubmit={update}>
              <IonItem>
                <IonLabel position="stacked">Wieght (kg)</IonLabel>
                <IonInput
                  type="number"
                  value={weight}
                  onIonChange={(e) => {
                    setweight(e.detail.value!);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Hieght (m)</IonLabel>
                <IonInput
                  type="number"
                  value={height}
                  onIonChange={(e) => {
                    setheight(e.detail.value!);
                  }}
                ></IonInput>
              </IonItem>
              <br />
              <IonRow>
                <IonCol>
                  <IonButton type="submit" expand="block">
                    Submit
                  </IonButton>
                </IonCol>
              </IonRow>
            </form>
          </>
        ) : choice == "Sport" ? (
          <>
            {Sport.map((sport, index) => {
              return (
                <IonCard
                  key={index}
                  onClick={() =>
                    clickHandler(sport.description, sport.name, sport.img)
                  }
                >
                  <img src={sport.img} />
                  <IonCardHeader>
                    <IonCardSubtitle>You Need To Click Here</IonCardSubtitle>
                    <IonCardTitle>{sport.name}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              );
            })}
          </>
        ) : (
          <>
            <br />
            <IonCard>
              <h2 color="dark">Please Select one of the above</h2>
            </IonCard>
          </>
        )}
      </IonContent>
    </IonContent>
  );
};

export default SDiet;
