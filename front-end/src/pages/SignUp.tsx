import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import Menu from "../components/Menu";
import Toolbar from "../components/Toolbar";
import { axios } from "../axios";
import moment from "moment";
import { useHistory } from "react-router-dom";

const SignUp: React.FC = () => {
  const [userName, setuserName] = useState("");
  const [usernameError, setusernameError] = useState(false);

  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState(false);

  const [password1, setpassword1] = useState("");
  const [password1Error, setpassword1Error] = useState(false);
  const [password2, setpassword2] = useState("");
  const [password2Error, setpassword2Error] = useState(false);
  const [matchpassword, setmatchpassword] = useState(true);

  const [birthdate, setbirthdate] = useState("");
  const [birthdateError, setbirthdateError] = useState(false);

  const [gender, setgender] = useState("");
  const [genderError, setgenderError] = useState(false);

  const [weight, setweight] = useState("");
  const [weightError, setweightError] = useState(false);

  const [height, setheight] = useState("");
  const [heightError, setheightError] = useState(false);

  const [disease, setdisease] = useState("");
  const [diseaseError, setdiseaseError] = useState(false);

  const [type, settype] = useState("");
  const [typeError, settypeError] = useState(false);

  const [IsError, setIsError] = useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const history = useHistory();
  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!userName) {
      setusernameError(true);
    } else {
      if (
        !email ||
        !RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$").test(email)
      ) {
        setemailError(true);
      } else {
        if (!password1) {
          setpassword1Error(true);
        } else {
          if (!password2) {
            setpassword2Error(true);
          } else {
            if (password2 !== password1) {
              setmatchpassword(false);
            } else {
              setmatchpassword(true);
              if (!birthdate) {
                setbirthdateError(true);
              } else {
                if (!gender) {
                  setgenderError(true);
                } else {
                  if (!weight || Number(weight) < 25 || Number(weight) > 130) {
                    setweightError(true);
                  } else {
                    if (
                      !height ||
                      Number(height) < 1.2 ||
                      Number(height) > 2.5
                    ) {
                      setheightError(true);
                    } else {
                      if (!disease) {
                        setdiseaseError(true);
                      } else {
                        if (disease == "diabetes") {
                          if (!type) {
                            settypeError(true);
                          } else {
                            axios({
                              method: "post",
                              url: "/users",
                              data: {
                                userName,
                                email,
                                password: password1,
                                birthday:
                                  moment(birthdate).format("YYYY-MM-DD"),
                                gender,
                                weight: Number(weight),
                                height: Number(height),
                                disease,
                                type,
                              },
                            })
                              .then(() => {
                                console.log("user created successfuly");
                                const loginData = {
                                  username: userName,
                                  password: password1,
                                };
                                axios.post("/token", loginData).then((res) => {
                                  if (res.status === 200) {
                                    sessionStorage.setItem(
                                      "token",
                                      res.data.access_token!
                                    );
                                    sessionStorage.setItem(
                                      "user",
                                      JSON.stringify(res.data.user!)
                                    );

                                    history.push("/");
                                    window.location.reload();
                                  }
                                });
                              })
                              .catch((err) => {
                                console.log(err);
                                setIsError(true);
                              });
                          }
                        } else {
                          axios({
                            method: "post",
                            url: "/users",
                            data: {
                              userName,
                              email,
                              password: password1,
                              birthday: moment(birthdate).format("YYYY-MM-DD"),
                              gender,
                              weight: Number(weight),
                              height: Number(height),
                              disease,
                            },
                          })
                            .then(() => {
                              console.log("user created successfuly");
                              const loginData = {
                                username: userName,
                                password: password1,
                              };
                              axios.post("/token", loginData).then((res) => {
                                if (res.status === 200) {
                                  sessionStorage.setItem(
                                    "token",
                                    res.data.access_token!
                                  );
                                  sessionStorage.setItem(
                                    "user",
                                    JSON.stringify(res.data.user!)
                                  );

                                  history.push("/");
                                  window.location.reload();
                                }
                              });
                            })
                            .catch((err) => {
                              console.log(err);
                              setIsError(true);
                            });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <IonContent>
      <Menu />
      <IonContent className="ion-page" id="main-content">
        <Toolbar title="SignUp" />
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={IsError}
                onDidDismiss={() => setIsError(false)}
                header={"Error!"}
                message="aghh can't create an account userName or email already taken please try to change one of them"
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <br />
        <form noValidate onSubmit={signup}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                User Name
              </IonLabel>
              <IonInput
                name="userName"
                type="text"
                value={userName}
                spellCheck={false}
                autoCapitalize="off"
                onIonChange={(e) => {
                  setuserName(e.detail.value!);
                  setusernameError(false);
                }}
                required
              ></IonInput>
            </IonItem>
            {formSubmitted && usernameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Username is required</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                email
              </IonLabel>
              <IonInput
                name="email"
                type="email"
                value={email}
                spellCheck={false}
                autoCapitalize="off"
                onIonChange={(e) => {
                  setemail(e.detail.value!);
                  setemailError(false);
                }}
                required
              ></IonInput>
            </IonItem>
            {formSubmitted && emailError && (
              <IonText color="danger">
                <p className="ion-padding-start">Please enter a valid email</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Password
              </IonLabel>
              <IonInput
                name="password1"
                type="password"
                value={password1}
                spellCheck={false}
                autoCapitalize="off"
                onIonChange={(e) => {
                  setpassword1(e.detail.value!);
                  setpassword1Error(false);
                }}
                required
              ></IonInput>
            </IonItem>
            {formSubmitted && password1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">password is required</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Confrim Password
              </IonLabel>
              <IonInput
                name="password2"
                type="password"
                value={password2}
                spellCheck={false}
                autoCapitalize="off"
                onIonChange={(e) => {
                  setpassword2(e.detail.value!);
                  setpassword2Error(false);
                }}
                required
              ></IonInput>
            </IonItem>
            {formSubmitted && password2Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  you need to confirm your Password
                </p>
              </IonText>
            )}
            {formSubmitted && !matchpassword && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  your Passwords doesn't match
                </p>
              </IonText>
            )}
            <IonItem>
              <br />
              <IonLabel color="primary">Date of birth</IonLabel>
              <IonDatetime
                value={birthdate}
                placeholder="Select Date"
                onIonChange={(e) => {
                  setbirthdate(e.detail.value!);
                  setbirthdateError(false);
                }}
              ></IonDatetime>
              <br />
            </IonItem>
            {formSubmitted && birthdateError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  you need to specify your birthdate
                </p>
              </IonText>
            )}
            <IonItem>
              <br />
              <IonLabel color="primary">select gender</IonLabel>
              <IonSelect
                value={gender}
                placeholder="Select gender"
                onIonChange={(e) => {
                  setgender(e.detail.value!);
                  setgenderError(false);
                }}
              >
                <IonSelectOption value="female">Female</IonSelectOption>
                <IonSelectOption value="male">Male</IonSelectOption>
              </IonSelect>
              <br />
            </IonItem>
            {formSubmitted && genderError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  you need to specify your gender
                </p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Weight (kg)
              </IonLabel>
              <IonInput
                type="number"
                value={weight}
                onIonChange={(e) => {
                  setweight(e.detail.value!);
                  setweightError(false);
                }}
                required
              ></IonInput>
            </IonItem>
            {formSubmitted && weightError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  you need to inter your weight (valid)
                </p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Height (m)
              </IonLabel>
              <IonInput
                type="number"
                value={height}
                onIonChange={(e) => {
                  setheight(e.detail.value!);
                  setheightError(false);
                }}
                required
              ></IonInput>
            </IonItem>
            {formSubmitted && heightError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  you need to inter your height (valid)
                </p>
              </IonText>
            )}
            <IonItem>
              <br />
              <IonSegment
                value={disease}
                onIonChange={(e) => {
                  setdisease(e.detail.value!);
                  setdiseaseError(false);
                }}
              >
                <IonSegmentButton value="diabetes">
                  <IonLabel>Diabetes</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="hypertension">
                  <IonLabel>Hypertension</IonLabel>
                </IonSegmentButton>
              </IonSegment>
              <br />
            </IonItem>
            {formSubmitted && diseaseError && (
              <IonText color="danger">
                <p className="ion-padding-start">Please enter yout disease</p>
              </IonText>
            )}
            {disease == "diabetes" ? (
              <>
                <IonItem>
                  <br />
                  <IonLabel color="primary">select type</IonLabel>
                  <IonSelect
                    value={type}
                    placeholder="Select One"
                    onIonChange={(e) => {
                      settype(e.detail.value!);
                      settypeError(false);
                    }}
                  >
                    <IonSelectOption value="type1">Type 1</IonSelectOption>
                    <IonSelectOption value="type2">Type 2</IonSelectOption>
                  </IonSelect>
                  <br />
                </IonItem>
                {formSubmitted && typeError && (
                  <IonText color="danger">
                    <p className="ion-padding-start">
                      Please specify your type of diabetes
                    </p>
                  </IonText>
                )}
              </>
            ) : (
              <></>
            )}
            <br />
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                SignUp
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonContent>
  );
};

export default SignUp;
