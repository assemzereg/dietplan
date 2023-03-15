import React, { useEffect } from "react";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonSlides,
  IonSlide,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
} from "@ionic/react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useHistory } from "react-router-dom";

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

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};
var not = 0;
const Home: React.FC = () => {
  const history = useHistory();
  const user = JSON.parse(sessionStorage.getItem("user")!);
  async function notifDiet() {
    if (not == 0) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "breakfast",
            body: "please eat your Breakfast",
            id: 5,
          },
        ],
      });
      not = 1;
    } else {
      if (not == 1) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: "lunch",
              body: "please eat your Lunch",
              id: 5,
            },
          ],
        });
        not = 2;
      } else {
        if (not == 2) {
          await LocalNotifications.schedule({
            notifications: [
              {
                title: "snack",
                body: "please eat your Snack",
                id: 5,
              },
            ],
          });
          not = 3;
        } else {
          if (not == 3) {
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: "dinner",
                  body: "please eat your dinner",
                  id: 5,
                },
              ],
            });
            not = 0;
          }
        }
      }
    }
  }
  async function notifSport() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Sport notif",
          body: "please check suggeted sports and practice some",
          id: 6,
        },
      ],
    });
  }
  useEffect(() => {
    async function reqP() {
      await LocalNotifications.requestPermissions();
    }
    async function notifD() {
      const breakfast = new Date(Date.now());
      breakfast.setHours(8);
      breakfast.setMinutes(0);
      breakfast.setSeconds(0);
      breakfast.setMilliseconds(0);

      const lunch = new Date(Date.now());
      lunch.setHours(12);
      lunch.setMinutes(0);
      lunch.setSeconds(0);
      lunch.setMilliseconds(0);

      const snack = new Date(Date.now());
      snack.setHours(16);
      snack.setMinutes(0);
      snack.setSeconds(0);
      snack.setMilliseconds(0);

      const dinner = new Date(Date.now());
      dinner.setHours(20);
      dinner.setMinutes(0);
      dinner.setSeconds(0);
      dinner.setMilliseconds(0);
      if (breakfast >= new Date(Date.now())) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: "breakfast",
              body: "please eat your Breakfast",
              id: 0,
              schedule: { at: breakfast },
            },
            {
              title: "lunch",
              body: "please eat your Lunch",
              id: 1,
              schedule: { at: lunch },
            },
            {
              title: "snack",
              body: "please eat your Snack",
              id: 2,
              schedule: { at: snack },
            },
            {
              title: "dinner",
              body: "please eat your Dinner",
              id: 3,
              schedule: { at: dinner },
            },
          ],
        });
      } else {
        if (lunch >= new Date(Date.now())) {
          await LocalNotifications.schedule({
            notifications: [
              {
                title: "lunch",
                body: "please eat your Lunch",
                id: 1,
                schedule: { at: lunch },
              },
              {
                title: "snack",
                body: "please eat your Snack",
                id: 2,
                schedule: { at: snack },
              },
              {
                title: "dinner",
                body: "please eat your Dinner",
                id: 3,
                schedule: { at: dinner },
              },
            ],
          });
        } else {
          if (snack >= new Date(Date.now())) {
            await LocalNotifications.schedule({
              notifications: [
                {
                  title: "snack",
                  body: "please eat your Snack",
                  id: 2,
                  schedule: { at: snack },
                },
                {
                  title: "dinner",
                  body: "please eat your Dinner",
                  id: 3,
                  schedule: { at: dinner },
                },
              ],
            });
          } else {
            if (dinner >= new Date(Date.now())) {
              await LocalNotifications.schedule({
                notifications: [
                  {
                    title: "dinner",
                    body: "please eat your Dinner",
                    id: 3,
                    schedule: { at: dinner },
                  },
                ],
              });
            }
          }
        }
      }
    }
    async function notifS() {
      const Sport = new Date(Date.now());
      Sport.setHours(16);
      Sport.setMinutes(30);
      Sport.setSeconds(0);
      Sport.setMilliseconds(0);
      if (Sport >= new Date(Date.now())) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: "Sport notif",
              body: "please check suggeted sports and practice some",
              id: 4,
              schedule: { at: Sport },
            },
          ],
        });
      }
    }
    reqP();
    const token = sessionStorage.getItem("token");
    if (token != null && token != "" && token != undefined) {
      notifD();
      notifS();
      LocalNotifications.addListener(
        "localNotificationActionPerformed",
        (e) => {
          const t = sessionStorage.getItem("notif");
          if (t != undefined && t != null && t != "") {
            sessionStorage.removeItem("notif");
          }
          sessionStorage.setItem("notif", e.notification.title);
          history.push("/sDiet");
        }
      );
    }
  }, []);

  return (
    <IonContent>
      <Menu />
      <IonContent id="main-content" className="ion-page">
        <Toolbar title="App" />
        {user != null && user != undefined && (
          <>
            <IonRow style={{ "text-align": "center", "font-style": "oblique" }}>
              <IonCol>
                <IonText>
                  <h1>Welcome dear {user.userName}</h1>
                </IonText>
              </IonCol>
            </IonRow>
          </>
        )}
        <IonCard>
          <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
              <img src="/assets/img2.jpg" />
            </IonSlide>
            <IonSlide>
              <img src="/assets/img4.jpg" />
            </IonSlide>
            <IonSlide>
              <img src="/assets/img1.jpg" />
            </IonSlide>
            <IonSlide>
              <img src="/assets/img5.jpg" />
            </IonSlide>

            <IonSlide>
              <img src="/assets/img3.jpg" />
            </IonSlide>
          </IonSlides>
          <IonCardHeader>
            <IonCardSubtitle>A little definition</IonCardSubtitle>
            <IonCardTitle>Our App</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            A multiplatform mobile application for nutritional care and
            prevention of chronic diseases: cases of diabetes and hypertension
          </IonCardContent>
        </IonCard>
        {user != null && user != undefined && (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" onClick={() => notifDiet()}>
                  notif Diet
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" onClick={() => notifSport()}>
                  notif Sport
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonContent>
  );
};

export default Home;
