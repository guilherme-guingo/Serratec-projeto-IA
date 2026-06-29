import React, { useState } from 'react'
import Resultado from './pages/Resultado'
import UploadPage from './pages/Upload'

export const App = () => {
  const [imagemEnviada, setImagemEnviada] = useState(null)

  const handleImageSubmit = (file) => {
    // Nota: Guileherme, Aqui você pode enviar a imagem para o n8n no futuro
    // Exemplo: 
    // const formData = new FormData();
    // formData.append('file', file);
    // fetch('SUA_URL_N8N_AQUI', { method: 'POST', body: formData })
    
    setImagemEnviada(file)
  }

  return (
    <>
      {!imagemEnviada ? (
        <UploadPage onImageSubmit={handleImageSubmit} />
      ) : (
        <Resultado imagemPreCarregada={imagemEnviada} />
      )}
    </>
  )
}

export default App
