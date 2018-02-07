import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import PostsPage from './components/PostsPage.jsx';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './rootReducer';
import './index.css'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <BrowserRouter>
        <Provider store = {store}>
            <Fragment>
                <Route exact path = "/" component = {App} />
                <Route path = "/userposts/:id" component = {PostsPage} />
            </Fragment> 
        </Provider>
    </BrowserRouter>, 
    document.getElementById('root'));
registerServiceWorker();
