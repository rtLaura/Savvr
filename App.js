import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Appbar from './diversos/Appbar';
import Historico from './diversos/Historico';
import LimiteDiario from './diversos/LimiteDiario';
import ListaGastos from './listagem/ListaGastos';
import FormularioGastos from './formulario/FormularioGastos';
import formatarDataAtual, { diasRestantesDoMes } from './diversos/utils/FormatarData'
import styles from './assets/styles'
import {
  categoriasDespesa,
  categoriasReceita,
  contas as contasIniciais,
  transacoes as transacao,
  mapaFormaPagamentoConta,
} from './listagem/Constants';
import Resumo from './diversos/Resumo'


export default function App() {
  const [transacoes, setTransacoes] = useState(transacao);
  const [contas, setContas] = useState(contasIniciais);

  // Dias que ainda faltam para o fim do mês, calculados a partir da data real
  // de hoje (antes era um número fixo = 20). A função está em FormatarData.js.
  const diasRestantesMes = diasRestantesDoMes();

  const adicionarTransacao = (dadosNovaTransacao) => {
  const novaTransacao = {
    id: String(Date.now()),
    data: formatarDataAtual(),
      ...dadosNovaTransacao,
  };
  
    setTransacoes((atual) => [novaTransacao, ...atual]);

    // Se por algum motivo a forma de pagamento não tiver mapeamento, usamos "Conta Corrente" como padrão
    const contaAlvo =
      mapaFormaPagamentoConta[dadosNovaTransacao.formaPagamento] || 'Conta Corrente';

    setContas((atual) =>
      atual.map((conta) =>
        conta.nome === contaAlvo
          ? {
              ...conta,
              saldo:
                dadosNovaTransacao.tipo === 'receita'
                  ? conta.saldo + dadosNovaTransacao.valor
                  : conta.saldo - dadosNovaTransacao.valor,
            }
          : conta
      )
    );
  };

  const receitas = transacoes
    .filter((transacao) => transacao.tipo === 'receita')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  //uso de reduce e filter
  const despesas = transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  const saldoAtual = receitas - despesas;

  return (
    <PaperProvider>
      <Appbar titulo={`Savvr`} subtitulo="..." />
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        
        {/*função anônima*/}
        <Resumo transacoes={transacoes} contas={contas}/>

        {/*uso de arrow function*/}
        <LimiteDiario saldoAtual={saldoAtual} transacoes={transacoes} diasRestantesMes={diasRestantesMes} />
        {/*uso de classe*/}
        <Historico transacoes={transacoes} />

        {/*formulário com calculo e try catch*/}
        <FormularioGastos
          categoriasDespesa={categoriasDespesa}
          categoriasReceita={categoriasReceita}
          aoAdicionarTransacao={adicionarTransacao}
          saldoAtual={saldoAtual}
          diasRestantesMes={diasRestantesMes}
        />
        {/*busca com filter*/}
        <ListaGastos
          transacoes={transacoes}
        />
        <View style={{ height: 24 }} />
      </ScrollView>
    </PaperProvider>
  );
}

