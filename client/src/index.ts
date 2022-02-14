import '@/common/styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from '@/App';

import '@/i18n';

const HotApp = hot(App);

ReactDOM.render(React.createElement(HotApp), document.getElementById('root'));
