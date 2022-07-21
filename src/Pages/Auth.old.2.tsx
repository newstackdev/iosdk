export default {};

// import { Button, Input } from "antd";
// import Form from "antd/lib/form";

// // import '../App.css';
// import { getAuth, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, ConfirmationResult, UserCredential, signOut } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { ErrorResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";

// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { CreatorApi, UserInfo } from "../types";
// import { useActions, useAppState } from "../overmind";

// const baseUrl = "https://api-eu-sit.newlife.io/creator";

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
// export const auth = getAuth();

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

// export const logout = () => {
//   auth.signOut();
// };

// const creatorApi = new CreatorApi({
//   baseUrl, securityWorker: (securityData: { token: string } | null) => {
//     return (!securityData ? {} : { headers: { Authorization: securityData.token } })
//   }
// });

// const updateToken = (token: string) => creatorApi.setSecurityData({ token });

// const layout = {
//   labelCol: { span:7 },
//   wrapperCol: { span: 9 },
// };

// export const Auth = (props: React.PropsWithChildren<{}>) => {
//   // const state = useAppState();
//   const actions = useActions();

//   const [verifier, setVerifier] = useState<({ verifier: { confirm: (verificationCode: string) => Promise<UserCredential> } }) | undefined>();
//   const [fbUser, loading, error] = useAuthState(auth);

//   const [credentials, setCredentials] = useState<UserCredential>();

//   const [token, setToken] = useState<string>("");

//   const [currentUser, setCurrentUser] = useState<UserInfo>(); //{ currentUser,  });
//   const [currentUserLoading, setCurrentUserLoading] = useState<boolean>();

//   const history = useHistory();

//   const clearStateAndSignOut = () => {
//     signOut(auth);
//     // setPhoneNumber("");
//     // setPhoneVerificationCode("");
//     setVerifier(undefined);
//     // setUserCredential(undefined);
//     setCurrentUser({} as any);
//     setCredentials(undefined);
//     // props.onApiChanged(undefined, undefined);
//   }

//   const requestPhoneAuthCode = async (v: { phone: string }) => {
//     const verifier = await signInWithPhoneNumber(auth, v.phone, initRecaptchaVerifier());
//     setVerifier({ verifier: verifier })
//   };
//   const submitPhonVerificationCode = async (v: { phoneVerificationCode: string }) => {
//     try {
//       const cred = await verifier!.verifier.confirm(v.phoneVerificationCode);
//       setCredentials(cred);
//     } catch(ex) {
//       console.log((ex as any).message)
//     }
//   };
//   useEffect(() => {
//     (async () => {
//       console.log("get user details...");
//       if (fbUser)
//         return setToken(fbUser.accessToken)
//       if (credentials) {
//         const token = await credentials.user.getIdToken();
//         setToken(token);
//       }
//     })();

//     setCurrentUserLoading(true);

//     // auth.onAuthStateChanged()
//   }, [credentials, fbUser]);

//   useEffect(() => {
//     updateToken(token);

//     setCurrentUserLoading(false);

//     if (!token || !currentUserLoading)
//       return

//     (async () => {
//       console.log("will finally get the user");

//       try {
//         const cu = await creatorApi.user.currentList();
//         const userInfo = { user: cu.data, fbUser, token: fbUser.accessToken, status: "admitted", signOut: clearStateAndSignOut };
//         setCurrentUser(currentUser);
//         // actions.setUserAndApi({ userInfo, api: creatorApi });
//         // history.push("/explore");
//       } catch (_ex) {
//         const ex: { error: ErrorResponse } = _ex as any;
//         console.log(ex)
//         if (ex.error) {
//           setCurrentUser({ user: {}, status: "newuser", signOut: clearStateAndSignOut });
//           if (ex.error.statusCode === 404) {
//             const userInfo = { user: {}, fbUser, token: fbUser.accessToken, status: "newuser", signOut: clearStateAndSignOut };
//             // actions.setUserAndApi({ userInfo, api: creatorApi });
//             actions.routing.historyPush({ location: "/user-create" });
//             return;
//           }
//           alert(ex.error.errorMessage);
//         }
//         const otherError = _ex as any;
//         // alert(otherError.message);

//         clearStateAndSignOut();
//       } finally {
//       }
//     })();

//   }, [token])

//   return (
//     <div>
//       {token && !currentUser && <h3>Checking user status...</h3>}
//       <div hidden={credentials || fbUser}>
//         <Form
//           {...layout}
//           hidden={!!verifier}
//           name="basic"
//           initialValues={{ phone: "+420111111111" }}
//           onFinish={requestPhoneAuthCode}
//           // onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//               <Form.Item
//                 label="Phone"
//                 name="phone"
//                 rules={[{ required: true, message: 'Phone number please' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: layout.labelCol.span }}>
//                 <Button id="sign-in-button" type="primary" htmlType="submit">
//                   Submit
//                 </Button>
//               </Form.Item>
//         </Form>

//         <Form
//           {...layout}
//           hidden={!verifier}
//           name="basic"
//           initialValues={{ phoneVerificationCode: "111111" }}
//           onFinish={submitPhonVerificationCode}
//           // onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Phone verification"
//             name="phoneVerificationCode"
//             rules={[{ required: true, message: 'Enter your verification code' }]}
//           >
//             <Input value="" />
//           </Form.Item>
//           <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: layout.labelCol.span }}>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>);
// };
