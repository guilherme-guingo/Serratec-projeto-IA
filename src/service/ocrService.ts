import { NotaFiscalData } from '../types/ocrTypes';
import mock from '../data/mock.json';

const N8N_WEBHOOK_URL = 'https://sua-url-do-n8n.hooks.n8n.cloud/v1/ocr';

export const ocrService = {
  enviarImagemParaOCR: async (arquivoFisico: File): Promise<NotaFiscalData> => {
    
    return new Promise((resolve) => setTimeout(() => resolve(mock as NotaFiscalData), 1500));

    /*
    const formData = new FormData();
    formData.append('file', arquivoFisico);

    const resposta = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!resposta.ok) {
      throw new Error('Falha ao processar a imagem no n8n');
    }

    return await resposta.json() as NotaFiscalData;
    */
  }
};