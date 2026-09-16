import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Appbar from './diversos/Appbar';
import Historico from './diversos/Historico';
import LimiteDiario from './diversos/LimiteDiario';
import ListaGastos from './listagem/ListaGastos';
import FormularioGastos from './formulario/FormularioGastos';
import formatarDataAtual from './diversos/utils/FormatarData'
import styles from './assets/styles'
import {
  categoriasDespesa,
  categoriasReceita,
  contas as contasIniciais,
  transacoes as transacao,
  mapaFormaPagamentoConta,
  diasRestantesMes,
} from './listagem/Constants';
import Resumo from './diversos/Resumo'


export default function App() {
  const [transacoes, setTransacoes] = useState(transacao);
  const [contas, setContas] = useState(contasIniciais);

  const adicionarTransacao = (dadosNovaTransacao) => {
  const novaTransacao = {
    id: String(Date.now()),
    data: formatarDataAtual(),
      ...dadosNovaTransacao,
  };
  
    setTransacoes((atual) => [novaTransacao, ...atual]);

    // Toda transação precisa alterar o saldo de ALGUMA conta, não só da
    // Poupança. A conta afetada é escolhida assim:
    // - se a categoria for "Depósito" ou "Saque Bancário", a conta afetada
    //   é sempre a Poupança (é o próprio sentido dessas categorias);
    // - caso contrário, a conta é definida pela forma de pagamento
    //   escolhida no formulário (ex: "Dinheiro" -> Carteira, "Pix" ->
    //   Conta Corrente, etc.), usando o mapa em Constants.js;
    // - se por algum motivo a forma de pagamento não tiver mapeamento
    //   (ex: "Não informado"), usamos "Conta Corrente" como padrão.
    const contaAlvo =
      dadosNovaTransacao.categoria === 'Depósito' ||
      dadosNovaTransacao.categoria === 'Saque Bancário'
        ? 'Poupança'
        : mapaFormaPagamentoConta[dadosNovaTransacao.formaPagamento] || 'Conta Corrente';

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

