import React from 'react';
import CardResultado from '../components/CardResultado';
import { useOcr } from '../contexts/OcrContext';


export default function ResultadoPage() {
  const { dadosDaNota, carregando, erro } = useOcr();

  if (carregando) {
    return (
      <div className="page-container">
        <p className="mensagem-carregamento">Processando documento</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="page-container">
        <p className="erro-texto">{erro}</p>
      </div>
    );
  }

  if (!dadosDaNota) {
    return (
      <div className="page-container">
        <p>Aguardando envio do documento...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Resultados da Auditoria</h1>
      <CardResultado dados={dadosDaNota} />
    </div>
  );
}