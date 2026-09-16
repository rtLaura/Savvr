const formatarDataAtual = () => {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0'); // padStart garante 2 dígitos, ex: "03"
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // getMonth() começa em 0, por isso o +1
  return `${dia}/${mes}`;
};

export default formatarDataAtual; 