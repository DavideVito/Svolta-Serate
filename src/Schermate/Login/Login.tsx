import { StyledFirebaseAuth } from "react-firebaseui";

import { auth } from "../../Utils/Firebase/init"

import { useAuthState } from "react-firebase-hooks/auth"

import { GoogleAuthProvider } from "firebase/auth";




const uiConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.


  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
  ],


};

function SignInScreen() {



  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading</div>
  }



  if (user) {

    return <div>
      Ciao {user.displayName}
      <button onClick={() => { auth.signOut() }}>Logout</button>
    </div>

  }



  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default SignInScreen