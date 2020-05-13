import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {getFirestore, reduxFirestore} from 'redux-firestore'
import firebase from '../firebase'
export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(thunk.withExtraArgument({getFirestore})),reduxFirestore(firebase))
    );

    if (module.hot) {
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}