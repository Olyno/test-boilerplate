import axios from 'axios';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import HomePage from './pages/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

root.render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);
