import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Navbar from './components/navbar';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render((
	<Router>
		<Navbar>
			<App />
		</Navbar>
	</Router>
	), document.getElementById('root'));
registerServiceWorker();
