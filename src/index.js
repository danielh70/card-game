import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cards from './components/cardgen';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Cards />, document.getElementById('root'));
registerServiceWorker();
