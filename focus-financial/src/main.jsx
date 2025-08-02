import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css'; // ✅ your new plain CSS file
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
