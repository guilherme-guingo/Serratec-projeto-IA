import React from 'react';
import UploadPage from './pages/Upload';
import ResultadoPage from './pages/Resultado';
import { useOcr } from './contexts/OcrContext';

export default function App() {

  const { dadosDaNota, carregando } = useOcr();

  return (
    <main>
      {(dadosDaNota || carregando) ? (
        <ResultadoPage />
      ) : (
        <UploadPage />
      )}
    </main>
  );
}