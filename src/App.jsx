import React, { useState } from 'react'
import Resultado from './pages/Resultado'
import UploadPage from './pages/Upload'

export const App = () => {
  const [imagemEnviada, setImagemEnviada] = useState(null)

  const handleImageSubmit = (base64) => {
    // Aqui você pode enviar a imagem para o n8n no futuro
    setImagemEnviada(base64)
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
