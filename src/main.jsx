import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { OcrProvider } from './contexts/OcrContext.js'

createRoot(document.getElementById('root')).render(
  <OcrProvider>
    <App />
  </OcrProvider>,
)
