import React from 'react';
import { useOcr } from '../contexts/OcrContext';
import CardResultado from '../components/CardResultado/CardResultado';
import './Resultado.css';

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
      
      {/* Agora chamamos o Card uma única vez, passando a nota inteira */}
      <CardResultado dados={dadosDaNota} />
    </div>
  );
}