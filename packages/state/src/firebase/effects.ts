// import '../App.css';
import {
  Auth,
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPhoneNumber,
} from "firebase/auth";
import { FirebaseOptions, initializeApp } from "firebase/app";
// import { firebaseConfig } from "../../config";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD-OLxk7rwlY3qqsHlFff7fYFQ2xmW78ZM",
//   authDomain: "newlifeio.firebaseapp.com",
//   projectId: "newlifeio",
//   storageBucket: "newlifeio.appspot.com",
//   messagingSenderId: "360722214510",
//   appId: "1:360722214510:web:d088a1e106fef50262007f",
//   measurementId: "G-PJWYRPZSNM"
// };

// Initialize Firebase

export default (() => {
  let auth: Auth;
  let recaptcaVerifier: RecaptchaVerifier | null = null;
  let confirmationResult: ConfirmationResult;

  const getRecaptchaVerifier = (
    containerOrId: string | HTMLElement = "sign-in-button"
  ) => {
    return (
      recaptcaVerifier ||
      (recaptcaVerifier = new RecaptchaVerifier(
        containerOrId,
        {
          size: "invisible",
          callback: (response: any) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            //alert(response);
            // signInWithPhoneNumber
            // onSignInSubmit()
          },
        },
        auth
      ))
    );
  };

  const clearRecaptchaVerifier = () => {
    if (!recaptcaVerifier) return;

    recaptcaVerifier.clear();
    recaptcaVerifier = null;
  };

  return {
    initialize(firebaseConfig: FirebaseOptions) {
      initializeApp(firebaseConfig);
      auth = getAuth();
      return auth;
    },
    initRecaptchaVerifier(
      containerOrId: string | HTMLElement = "sign-in-button"
    ) {
      clearRecaptchaVerifier();
      getRecaptchaVerifier(containerOrId);
    },
    clearRecaptchaVerifier,
    async requestPhoneAuthCode(v: { phone: string }) {
      return (confirmationResult = await signInWithPhoneNumber(
        auth,
        v.phone,
        getRecaptchaVerifier()
      ));
    },
    async requestEmailAuthCode(v: { email: string }) {
      // signinwith

      const actionCodeSettings = {
        // Legacy V1 login only
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: window.location.href + "?email=email",
        // This must be true.
        handleCodeInApp: true,
        // iOS: {
        //   bundleId: 'com.example.ios'
        // },
        // android: {
        //   packageName: 'com.example.android',
        //   installApp: true,
        //   minimumVersion: '12'
        // },
        // dynamicLinkDomain: window.location.host
      };

      return await sendSignInLinkToEmail(auth, v.email, actionCodeSettings);
      // return await signInWithEmailLink(auth, v.email, window.location.href + "?deep_link_id=123&link=" + window.location.href)
      // return await signInWithEmailAndPassword(auth, v.email, v.password); // getRecaptchaVerifier());
    },
    async signInWithEmailLink(email: string, emailLink: string) {
      const p = signInWithEmailLink(auth, email, emailLink);
      await p;

      // .then((result) => {
      //   // Clear email from storage.
      //   window.localStorage.removeItem('emailForSignIn');
      //   // You can access the new user via result.user
      //   // Additional user info profile not available via:
      //   // result.additionalUserInfo.profile == null
      //   // You can check if the user is new or existing:
      //   // result.additionalUserInfo.isNewUser
      // })
      // .catch((error) => {
      //   // Some error occurred, you can inspect the code: error.code
      //   // Common errors could be invalid email and invalid or expired OTPs.
      // });
    },
    async submitPhonVerificationCode(v: { phoneVerificationCode: string }) {
      try {
        return await confirmationResult.confirm(v.phoneVerificationCode);
      } catch (ex) {
        console.log((ex as any).message);
      }
    },
    async logout() {
      auth && (await auth.signOut());
    },
  };
})();
