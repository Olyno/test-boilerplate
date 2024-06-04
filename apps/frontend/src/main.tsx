import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import HomePage from './pages/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

root.render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);
