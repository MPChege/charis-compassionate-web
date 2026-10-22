import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

declare global {
  interface Window {
    __hideInitialLoader?: () => void;
  }
}

createRoot(document.getElementById("root")!).render(<App />);

// Remove the static loading screen from index.html once the app has painted
requestAnimationFrame(() => window.__hideInitialLoader?.());
