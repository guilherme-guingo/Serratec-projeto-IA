import { NotaFiscalData } from '../types/ocrTypes';
import mock from '../data/mock.json';

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export const ocrService = {
  enviarImagemParaOCR: async (arquivoFisico: File): Promise<NotaFiscalData> => {
    try {
      const formData = new FormData();
      formData.append('data', arquivoFisico);

      const resposta = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!resposta.ok) {
        throw new Error();
      }

      const textoBruto = await resposta.text();
      console.log("1_TEXTO_BRUTO_DO_N8N:", textoBruto);

      const objetoN8n = JSON.parse(textoBruto);
      console.log("2_OBJETO_PARSADO_DO_N8N:", objetoN8n);

      let textoDaIA = "";
      
      if (Array.isArray(objetoN8n) && objetoN8n[0]?.content?.parts?.[0]?.text) {
        textoDaIA = objetoN8n[0].content.parts[0].text;
      } else if (objetoN8n?.content?.parts?.[0]?.text) {
        textoDaIA = objetoN8n.content.parts[0].text;
      } else if (objetoN8n?.text) {
        textoDaIA = objetoN8n.text;
      } else {
        textoDaIA = textoBruto;
      }

      console.log("3_TEXTO_EXTRAIDO_DA_IA:", textoDaIA);

      textoDaIA = textoDaIA.replace(/```json/g, '').replace(/```/g, '').trim();
      console.log("4_TEXTO_DA_IA_APOS_LIMPEZA_MARKDOWN:", textoDaIA);

      const dadosRetornados = JSON.parse(textoDaIA);
      console.log("5_DADOS_FINAIS_STRUTURADOS:", dadosRetornados);

      return dadosRetornados as NotaFiscalData;
      
    } catch (error) {
      console.error("ERRO_DETECTADO_NO_FLUXO_OCR:", error);
      return new Promise((resolve) => setTimeout(() => resolve(mock as NotaFiscalData), 1500));
    }
  }
};