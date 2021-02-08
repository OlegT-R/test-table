import * as React from 'react';
import { render } from 'react-dom';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';

const rootElement = document.getElementById('root');
render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  rootElement,
);
