import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import D8Events from './D8Events';

let appRoots = document.getElementsByClassName('clas-events-react-base');

for (let element of appRoots) {
  ReactDOM.render(<D8Events dataFromPage={element.dataset} />, element);
}
