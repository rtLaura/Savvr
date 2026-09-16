// [Critério 3]: Fórmula significativa usada tanto no LimiteDiario.js quanto
// no FormularioGastos.js: o "teto diário seguro" de gastos.
// tetoDiario = saldoDisponivel / diasRestantes

// Fica aqui para os dois componentes usarem exatamente a
// mesma conta, em vez de duplicar a fórmula em dois lugares.
const calcularTetoDiario = (saldoDisponivel, diasRestantes) => {
  if (
    typeof diasRestantes !== 'number' ||
    Number.isNaN(diasRestantes) ||
    diasRestantes <= 0
  ) {
    throw new Error(
      'Não foi possível calcular o teto diário.'
    );
  }

  return saldoDisponivel / diasRestantes;
};

export default calcularTetoDiario;
