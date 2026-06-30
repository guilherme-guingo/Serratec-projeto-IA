import React from 'react';
import './Card.css';
import { NotaFiscalData } from '../types/ocrTypes';

interface CardResultadoProps {
  dados: NotaFiscalData;
}

export default function CardResultado({ dados }: CardResultadoProps) {
  return (
    <div className="painel-resultados">
      <h2>{dados.empresa}</h2>
      <p><strong>CNPJ:</strong> {dados.cnpj}</p>
      <p><strong>Data:</strong> {dados.data}</p>
      <h3>Total: R$ {dados.valor_total.toFixed(2)}</h3>
    </div>
  );
}