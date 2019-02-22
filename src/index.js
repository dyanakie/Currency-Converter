import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { Provider } from 'react-redux';
import store from './store/index'
import { BrowserRouter } from 'react-router-dom';


function render() {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
            <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
}

store.subscribe(render);
render();
