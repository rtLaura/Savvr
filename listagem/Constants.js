export const contas = [
  { id: '1', nome: 'Conta Corrente', saldo: 3200.0 },
  { id: '2', nome: 'Poupança', saldo: 1200.5 },
  { id: '3', nome: 'Carteira', saldo: 420.0 },
];

export const categoriasDespesa = [
  'Alimentação',
  'Animais',
  'Educação',
  'Estética',
  'Finanças',
  'Imóveis',
  'Impostos',
  'Investimentos',
  'Lazer',
  'Moradia',
  'Pessoas',
  'Saque Bancário',
  'Saúde',
  'Seguros',
  'Tecnologia',
  'Transporte',
];

export const categoriasReceita = [
  'Depósito',
  'Freelance',
  'Investimentos',
  'Outros',
  'Salário',
]

export const transacoes = [
    { id: '1', descricao: 'Salário', valor: 6200.0, tipo: 'receita', categoria: 'Salário', formaPagamento: 'Transferência', data: '01/09' },
    { id: '2', descricao: 'Freelance', valor: 500.0, tipo: 'receita', categoria: 'Freelance', formaPagamento: 'Pix', data: '10/09' },
    { id: '3', descricao: 'Supermercado', valor: 320.0, tipo: 'despesa', categoria: 'Alimentação', formaPagamento: 'Cartão de Débito', data: '03/09' },
    { id: '4', descricao: 'Uber', valor: 45.5, tipo: 'despesa', categoria: 'Transporte', formaPagamento: 'Cartão de Crédito', data: '05/09' },
    { id: '5', descricao: 'Cinema', valor: 60.0, tipo: 'despesa', categoria: 'Lazer', formaPagamento: 'Dinheiro', data: '07/09' },
    { id: '6', descricao: 'Farmácia', valor: 90.0, tipo: 'despesa', categoria: 'Saúde', formaPagamento: 'Cartão de Débito', data: '09/09' },
  ];

export const formasPagamento = [
    'Boleto',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Dinheiro',
    'Pix',
    'Poupança',
    'Transferência',
  ];

// Mapeia cada forma de pagamento/recebimento para a conta que deve
// ter o saldo alterado quando ela é usada em uma transação.

// Quantidade de dias restantes no mês, usada no cálculo do teto diário
// (LimiteDiario.js e FormularioGastos.js). Fica centralizada aqui para
// os dois lugares usarem sempre o mesmo valor.
export const diasRestantesMes = 20;

export const mapaFormaPagamentoConta = {
  'Dinheiro': 'Carteira',
  'Pix': 'Conta Corrente',
  'Transferência': 'Conta Corrente',
  'Boleto': 'Conta Corrente',
  'Cartão de Débito': 'Conta Corrente',
  'Cartão de Crédito': 'Conta Corrente',
  'Poupança': 'Poupança',
};

