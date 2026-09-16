const formatarDataAtual = () => {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0'); // padStart garante 2 dígitos, ex: "03"
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // getMonth() começa em 0, por isso o +1
  return `${dia}/${mes}`;
};

// Calcula quantos dias ainda faltam para acabar o mês atual (contando hoje)
export const diasRestantesDoMes = () => {
  const hoje = new Date();

  // o "dia 0" do mês seguinte é o último dia do mês atual
  //new Date(2026, 9, 0) -> 30/09, setembro tem 30 dias
  const ultimoDiaDoMes = new Date(
    hoje.getFullYear(),
    hoje.getMonth() + 1,
    0
  ).getDate();

  //hoje é dia 16 e o mês tem 30 dias -> 30 - 16 + 1 = 15 dias restantes
  return ultimoDiaDoMes - hoje.getDate() + 1;
};

export default formatarDataAtual;
