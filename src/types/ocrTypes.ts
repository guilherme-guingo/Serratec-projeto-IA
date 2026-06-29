export interface ItemNota {
  nome: string;
  quantidade: number;
  preco: number;
}

export interface NotaFiscalData {
  estabelecimento: string;
  cnpj: string;
  data: string;
  valor_total: number;
  itens: ItemNota[];
}