export interface ItemNota {
  nome: string;
  quantidade: number;
  preco: number;
}

export interface NotaFiscalData {
  empresa: string;
  cnpj: string;
  data: string;
  itens: ItemNota[];
  valor_total: number;
}