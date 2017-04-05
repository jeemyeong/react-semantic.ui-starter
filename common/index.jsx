import React from 'react';
import {render} from 'react-dom';
// application styles
import 'styles/index.scss';
import 'semantic-ui-css/semantic.css';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import RootReducer from './reducers'
import {Root} from 'components'
import {Routing, history} from './routing';


function configureStore(initialState) {
    // Add initialState handler
    let middleware = applyMiddleware(routerMiddleware(history));
    let store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)), middleware);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
const renderRoot = (Root) => {
    let preloadedState = window.__PRELOADED_STATE__
    let store = configureStore(preloadedState);
    let syncedHistory = syncHistoryWithStore(history, store);
    render(<Root routes={Routing} history={syncedHistory} store={store}/>, document.getElementById('app'));
}

renderRoot(Root)


// if (module.hot) {
//     module.hot.accept();
//     // renderRoot(Root)
// }

// FIXME: SSR!!!
// match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
//     render(
//         <Provider store={store}>
//             <Router {...renderProps} />
//         </Provider>, document.getElementById('app'))
// })