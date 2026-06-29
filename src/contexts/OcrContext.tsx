import React, { createContext, useState, useContext, ReactNode } from 'react';
import { NotaFiscalData } from '../types/ocrTypes';
import { ocrService } from '../service/ocrService';

interface OcrContextType {
  dadosDaNota: NotaFiscalData | null;
  carregando: boolean;
  erro: string | null;

  processarDocumento: (arquivo: File) => Promise<void>;
  limparDados: () => void;
}

const OcrContext = createContext<OcrContextType | undefined>(undefined);

export function OcrProvider({ children }: { children: ReactNode }) {
  const [dadosDaNota, setDadosDaNota] = useState<NotaFiscalData | null>(null);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  const processarDocumento = async (arquivo: File) => {
    setCarregando(true);
    setErro(null);
    setDadosDaNota(null);

    try {
      const resultado = await ocrService.enviarImagemParaOCR(arquivo);
      setDadosDaNota(resultado);
    } catch (err) {
      setErro('Não foi possível processar a imagem. Tente novamente mais tarde.');
    } finally {
      setCarregando(false);
    }
  };

  const limparDados = () => {
    setDadosDaNota(null);
    setErro(null);
  };

  return (
    <OcrContext.Provider value={{ dadosDaNota, carregando, erro, processarDocumento, limparDados }}>
      {children}
    </OcrContext.Provider>
  );
}

export function useOcr() {
  const context = useContext(OcrContext);
  if (!context) {
    throw new Error('useOcr deve ser utilizado dentro de um OcrProvider');
  }
  return context;
}