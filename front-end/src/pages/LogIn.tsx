import React, { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import Menu from "../components/Menu";
import Toolbar from "../components/Toolbar";
import { axios } from "../axios";
import { useHistory } from "react-router-dom";
const LogIn: React.FC = () => {
  const history = useHistory();
  const [userName, setuserName] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [IsError, setIsError] = useState<boolean>(false);
  const [Message, setMessage] = useState<string>("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName) {
      setIsError(true);
      setMessage("Please enter your userName");
      return;
    }
    if (!password) {
      setIsError(true);
      setMessage("Please enter your password");
      return;
    }

    const loginData = {
      username: userName,
      password: password,
    };
    axios
      .post("/token", loginData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          sessionStorage.setItem("token", res.data.access_token!);
          sessionStorage.setItem("user", JSON.stringify(res.data.user!));

          history.push("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        setMessage("bad username or password can't login");
        setIsError(true);
        setuserName("");
        setpassword("");
        console.error("there is an error : ", error);
      });
  };
  return (
    <IonContent>
      <Menu />
      <IonContent className="ion-page" id="main-content">
        <Toolbar title="LogIn" />
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={IsError}
                onDidDismiss={() => setIsError(false)}
                header={"Error!"}
                message={Message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCard color="light">
          <IonCardHeader>
            <img src="/assets/login3.png" />
            <br />
            <IonCardTitle>
              <h5 className="ion-text-center">Enter the Log In Information</h5>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form noValidate onSubmit={login}>
              <IonItem color="light">
                <IonLabel position="floating">User Name</IonLabel>
                <IonInput
                  type="text"
                  value={userName}
                  onIonChange={(e) => {
                    setuserName(e.detail.value!);
                  }}
                  required
                ></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => {
                    setpassword(e.detail.value!);
                  }}
                  required
                ></IonInput>
              </IonItem>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonButton type="submit" expand="block">
                      Login
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      routerLink="/signup"
                      color="light"
                      expand="block"
                    >
                      Signup
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonContent>
  );
};

export default LogIn;
