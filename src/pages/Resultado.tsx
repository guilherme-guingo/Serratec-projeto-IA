import React, { useState, useEffect } from 'react';
import { NotaFiscalData } from '../types/ocrTypes';
import CardResultado from '../components/CardResultado';
import { ocrService } from '../service/ocrService';

interface ResultadoProps {
  imagemPreCarregada?: any | null;
}

export default function ResultadoPage({ imagemPreCarregada }: ResultadoProps = {}) {
  const [dados, setDados] = useState<NotaFiscalData | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);

  useEffect(() => {
    if (imagemPreCarregada) {
      lidarComEnvioDeImagem(imagemPreCarregada);
    }
  }, [imagemPreCarregada]);

  const lidarComEnvioDeImagem = async (base64String: any) => {
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
      
      {!imagemPreCarregada && (
        <button onClick={() => lidarComEnvioDeImagem("string-base64-falsa")}>
          Simular Upload de Nota Fiscal
        </button>
      )}

      {carregando && <p>Processando documento com IA...</p>}

      {dados && !carregando && <CardResultado dados={dados} />}
    </div>
  );
}