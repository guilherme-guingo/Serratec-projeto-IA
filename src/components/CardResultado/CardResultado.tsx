import './Card.css';
import { NotaFiscalData } from '../../types/ocrTypes';

interface CardResultadoProps {
  dados: NotaFiscalData;
}

export default function CardResultado({ dados }: CardResultadoProps) {
  const formatarPreco = (preco: number | string | undefined) => {
    const valor = Number(preco);
    return isNaN(valor) ? "0.00" : valor.toFixed(2);
  };

  const formatarData = (dataString: string | undefined) => {
    if (!dataString) return 'Data não disponível';

    const partes = dataString.split('-');

    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    return dataString;
  };

  if (!dados) return null;

  return (
    <div className="painel-resultados">
      <header>
        <h2>{dados.empresa || 'Empresa não identificada'}</h2>
        <p><strong>CNPJ:</strong> {dados.cnpj || 'Não informado'}</p>
        <p><strong>Data:</strong> {dados.data || 'Data não disponível'}</p>
      </header>

      <div className="lista-itens">
        <h3>Itens</h3>
        <ul>
          {dados.itens?.map((item, index) => (
            <li key={index} className="item-row">
              <span>{item.nome}</span>
              <span>{item.quantidade} x R$ {formatarPreco(item.preco)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-total">
        <h3>Total: R$ {formatarPreco(dados.valor_total)}</h3>
      </div>
    </div>
  );
}