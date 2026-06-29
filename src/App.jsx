import React from 'react';
import UploadPage from './pages/Upload';
import ResultadoPage from './pages/Resultado';
import { useOcr } from './contexts/OcrContext';

export default function App() {

  const { dadosDaNota } = useOcr();

  return (
    <main>
      {!dadosDaNota ? (
        <UploadPage />
      ) : (
        <ResultadoPage />
      )}
    </main>
  );
}