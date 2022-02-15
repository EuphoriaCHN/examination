import '@/common/styles/base.scss';

import '@/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from '@/App';

const HotApp = hot(App);

ReactDOM.render(React.createElement(HotApp), document.getElementById('root'));
