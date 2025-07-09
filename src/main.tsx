import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Motion from './Motion.tsx'
import ReactBits from './ReactBits.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <hr />
    <Motion />
    <hr />
    <ReactBits />
  </StrictMode>,
)
