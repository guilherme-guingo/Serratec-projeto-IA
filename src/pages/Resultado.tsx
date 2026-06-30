import React from 'react';
import { useOcr } from '../contexts/OcrContext';
import CardResultado from '../components/CardResultado/CardResultado';
import './Resultado.css';
import { CSVLink } from "react-csv";

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


  const formatarDadosParaCSV = () => {
    // Como dadosDaNota é um Objeto, verificamos diretamente:
    console.log("DADOS DA NOTA REAIS:", dadosDaNota);
    if (!dadosDaNota || !dadosDaNota.itens) return [];
    return dadosDaNota.itens.map((item) => ({
      'Empresa': dadosDaNota.empresa,
      'CNPJ': dadosDaNota.cnpj,
      'Data': dadosDaNota.data,
      'Produto': item.nome,
      'Quantidade': item.quantidade,
      'Preço Unitário': item.preco,
      'Valor Total da Nota': dadosDaNota.valor_total
    }));
  };


  const dadosFormatadosCSV = formatarDadosParaCSV();

  return (
    <div className="page-container">
      <h1>Resultados da Auditoria</h1>

      {/* Agora chamamos o Card uma única vez, passando a nota inteira */}
      <CardResultado dados={dadosDaNota} />

      <div>
        <CSVLink
          separator=';'
          data={dadosFormatadosCSV}
          filename={"resultado_n8n.csv"}
          className="btn btn-primary"
        >
          Exportar para CSV
        </CSVLink>
      </div>
    </div>
  );
}