import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n' // Import i18n configuration FIRST
import './index.css'
import './scrollbar.css'
import './mobile-responsive.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)