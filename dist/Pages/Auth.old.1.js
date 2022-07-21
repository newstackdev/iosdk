export {};
// // import React from 'react';
// // import logo from './logo.svg';
// import '../App.css';
// import { getAuth, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, ConfirmationResult, UserCredential, signOut } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { Card, Col, Row } from "antd";
// import { Api, UserReadPrivateResponse, ErrorResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// const baseUrl = "https://api-eu-sit.newlife.io/creator";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD-OLxk7rwlY3qqsHlFff7fYFQ2xmW78ZM",
//   authDomain: "newlifeio.firebaseapp.com",
//   projectId: "newlifeio",
//   storageBucket: "newlifeio.appspot.com",
//   messagingSenderId: "360722214510",
//   appId: "1:360722214510:web:d088a1e106fef50262007f",
//   measurementId: "G-PJWYRPZSNM"
// };
// // Initialize Firebase
// initializeApp(firebaseConfig);
// const auth = getAuth();
// const initRecaptchaVerifier = () => {
//   // if((window as any).recaptchaVerifier)
//   //   return;
//   // (window as any).
//   return new RecaptchaVerifier('sign-in-button', {
//     'size': 'invisible',
//     'callback': (response: any) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       //alert(response);
//       // signInWithPhoneNumber
//       // onSignInSubmit()
//     }
//   }, auth);
// }
// let verificationCodePromise: Promise<any> | undefined;
// const getVerificationCode = (phoneNumber: string) => {
//   if (verificationCodePromise)
//     return;
//   return verificationCodePromise = signInWithPhoneNumber(auth, phoneNumber, initRecaptchaVerifier());
// }
// export const logout = () => {
//   auth.signOut();
// };
// export class SecureApi extends Api<{ token: string }> { };
// const creatorApi = new SecureApi({
//   baseUrl, securityWorker: (securityData: { token: string } | null) => {
//     return (!securityData ? {} : { headers: { Authorization: securityData.token } })
//   }
// });
// const updateToken = (token: string) => creatorApi.setSecurityData({ token });
// export class UserInfo {
//   status: string = "";
//   token: string = "";
//   user: UserReadPrivateResponse = {}
//   fbUser?: UserCredential;
//   loading: boolean = false;
//   signOut?: () => void;
// };
// export function Auth(props: React.PropsWithChildren<{ onApiChanged: (v?: SecureApi, userInfo?: UserInfo) => any }>) {
//   const [fbUser, loading, error] = useAuthState(auth);
//   const [currentUserLoading, setCurrentUserLoading] = useState<boolean>();
//   const [currentUser, setCurrentUser] = useState<UserInfo>(new UserInfo()); //{ currentUser,  });
//   const [phoneNumber, setPhoneNumber] = useState("+420111111111"); //
//   const [phoneVerificationCode, setPhoneVerificationCode] = useState<string>("111111");
//   const [verifier, setVerifier] = useState<({ verify: (verificationCode: string) => any }) | undefined>();
//   // const [userCredential, setUserCredential] = useState<UserCredential | undefined>();
//   const history = useHistory();
//   const clearStateAndSignOut = () => {
//     signOut(auth);
//     setPhoneNumber("");
//     setPhoneVerificationCode("");
//     setVerifier(undefined);
//     // setUserCredential(undefined);
//     setCurrentUser({} as any);
//     props.onApiChanged(undefined, undefined);
//   }
//   const loadCurrentUser = (async () => {
//     if(currentUser || currentUserLoading || !fbUser || !fbUser.accessToken)
//         return;
//     // setCurrentUserLoading(true);
//     try {
//       const cu = await creatorApi.user.currentList();
//       const userInfo = { user: cu.data, fbUser, token: fbUser.accessToken, status: "user", signOut: clearStateAndSignOut };
//       setCurrentUser(currentUser);
//       props.onApiChanged(creatorApi, );
//     } catch (_ex) {
//       const ex: { error: ErrorResponse } = _ex as any;
//       console.log(ex)
//       if (ex.error) {
//         setCurrentUser({ user: {}, ...currentUser, status: "newuser", signOut: clearStateAndSignOut });
//         if (ex.error.statusCode === 404) {
//           const userInfo = { user: {}, fbUser, token: fbUser.accessToken, status: "newuser", signOut: clearStateAndSignOut };
//           props.onApiChanged(creatorApi, userInfo);
//           history.push("/user-create", {});
//           return;
//         }
//         alert(ex.error.errorMessage);
//       }
//       const otherError = _ex as any;
//       alert(otherError.message);
//       clearStateAndSignOut();
//     } finally {
//       setCurrentUserLoading(false);
//     }
//   });
//   useEffect(() => { loadCurrentUser() }, [currentUserLoading]);
//   useEffect(() => {
//     if (!currentUser?.fbUser && !loading && !error) {
//       initRecaptchaVerifier();
//       return
//     }
//     if (!fbUser || !fbUser.accessToken)
//       return
//     updateToken(fbUser.accessToken);
//     setCurrentUserLoading(false);
//   }, [currentUser?.fbUser && fbUser && fbUser.accessToken]);
//   return (
//     <div className="App-header">
//       {/* <img src={logo} alt="logo" width={50} /> */}
//       {
//         !fbUser &&
//         <>
//           <input hidden={!!verifier} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//           <button hidden={!!verifier} id="sign-in-button" onClick={() => {
//             const vf = getVerificationCode(phoneNumber);
//             vf && vf.catch(err => {
//               alert(err.message)
//             })
//             vf && setVerifier({
//               verify:
//                 (verificationCode: string) => {
//                   if (!verificationCodePromise)
//                     return alert("Something went wrong, refresh the page")
//                   return verificationCodePromise
//                     .then((cr: ConfirmationResult) => {
//                       return cr.confirm(verificationCode);
//                     })
//                     .catch(ex => alert(ex.message))
//                 }
//             })
//           }
//           }>Phone Login</button>
//           <input hidden={!verifier} value={phoneVerificationCode} onChange={(e) => setPhoneVerificationCode(e.target.value)} />
//           <button hidden={!verifier} onClick={() => {
//             verifier && verifier.verify && verifier.verify(phoneVerificationCode)
//               .then((r: UserCredential) => {
//                 setCurrentUser({ ...currentUser, fbUser: r });
//               })
//               .finally(() => {
//                 verificationCodePromise = undefined;
//               })
//           }
//           }>Confirm code</button>
//         </>
//       }
//       {
//         userCredential && !currentUser && <h3>Checking user status...</h3>
//       }
//       {/* {
//         !fbUser &&
//         <button onClick={() => signInWithEmailAndPassword(auth, "test-001-luisa.russel@test.com", "123456")}>Email Login</button>
//       } */}
//       {
//         fbUser &&
//           <button onClick={() => { clearStateAndSignOut() }}>Sign out</button>
//       }
//     </div>
//   );
// }
//# sourceMappingURL=Auth.old.1.js.map