import React, { useState } from 'react';
import { NotaFiscalData } from '../types/ocrTypes';
import CardResultado from '../components/CardResultado';
import { ocrService } from '../service/ocrService';

export default function ResultadoPage() {
  const [dados, setDados] = useState<NotaFiscalData | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);

  const lidarComEnvioDeImagem = async (base64String: string) => {
    setCarregando(true);
    try {
      const resultado = await ocrService.enviarImagemParaOCR(base64String);
      setDados(resultado);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page-container">
      
      <button onClick={() => lidarComEnvioDeImagem("string-base64-falsa")}>
        Simular Upload de Nota Fiscal
      </button>

      {carregando && <p>Processando documento com IA...</p>}

      {dados && !carregando && <CardResultado dados={dados} />}
    </div>
  );
}