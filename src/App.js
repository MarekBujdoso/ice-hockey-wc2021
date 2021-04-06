import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import firebase from "firebase";
import Auth from "./components/auth/Auth";
import Main from "./components/main/Main";
import { FirebaseContext } from "./context";
import "./App.css";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

function getFirebase() {
  return {
    auth: firebase.auth(),
    firestore: firebase.firestore(),
    firebase,
  };
}

function App() {
  const [firebaseData, setFirebaseData] = React.useState(getFirebase);

  return (
    <div className="App">
      <FirebaseContext.Provider value={firebaseData}>
        <Router>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/main" component={Main} />
            <Redirect to="/auth" from="*" />
          </Switch>
        </Router>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;
