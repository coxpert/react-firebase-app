import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  MainApp  from './container/App'

import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import { configureStore } from './store';

// css
import './lib/reactifyCss';

// firebase
import firebase from './firebase';


const store = configureStore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance: createFirestoreInstance
}



function App() {
  return (
    <Provider store={ store }>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
            <Switch>
                <Route path="/" component={MainApp}/>
            </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
