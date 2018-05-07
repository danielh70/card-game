import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Navbar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import AppContainer from "./components/AppContainer";

// ReactDOM.render((
// 	<Router>
// 		<Navbar>
// 			<App />
// 		</Navbar>
// 	</Router>
// 	), document.getElementById('root'));
// registerServiceWorker();


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
