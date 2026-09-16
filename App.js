import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Provider as PaperProvider, Card, Text } from 'react-native-paper';
import Appbar from './diversos/Appbar';
import Categorias from './diversos/Categorias';
import Historico from './diversos/Historico';
import LimiteDiario from './diversos/LimiteDiario';
import ListaGastos from './listagem/ListaGastos';
import FormularioGastos from './formulario/FormularioGastos';
import formatarDataAtual from './diversos/utils/FormatarData'
import styles from './assets/styles'
import {
  categoriasOrcamento,
  categoriasDespesa,
  categoriasReceita,
  transacoes as transacao
} from './listagem/Constants';
import Resumo from './diversos/Resumo'


export default function App() {
  const [transacoes, setTransacoes] = useState(transacao);
  const adicionarTransacao = (dadosNovaTransacao) => {
  const novaTransacao = {
    id: String(Date.now()),
    data: formatarDataAtual(),
      ...dadosNovaTransacao,
  };
  
    setTransacoes((atual) => [novaTransacao, ...atual]);
  };

  const receitas = transacoes
    .filter((transacao) => transacao.tipo === 'receita')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  //uso de reduce e filter
  const despesas = transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  const saldoAtual = receitas - despesas;
  const categoriasComGasto = categoriasOrcamento.map((categoria) => {
  
  const gastoCategoria = transacoes
      .filter((transacao) => transacao.tipo === 'despesa' && transacao.categoria === categoria.nome).reduce((acumulador, transacao) => acumulador + transacao.valor, 0);
    return { ...categoria, gasto: gastoCategoria };
  });

  return (
    <PaperProvider>
      <Appbar titulo={`Savvr`} subtitulo="..." />
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        
        <Resumo/>

        //função anônima4
        <Categorias categorias={categoriasComGasto} />

        //uso de arrow function
        <LimiteDiario saldoAtual={saldoAtual} transacoes={transacoes} diasRestantesMes={20} />
        //uso de classe
        <Historico transacoes={transacoes} />

        //formulário com calculo e try catch
        <FormularioGastos
          transacoes={transacoes}
          categoriasDespesa={categoriasDespesa}
          categoriasReceita={categoriasReceita}
          aoAdicionarTransacao={adicionarTransacao}
        />
        //busca com filter
        <ListaGastos
          transacoes={transacoes}
          categoriasDespesa={categoriasDespesa}
          categoriasReceita={categoriasReceita}
        />
        <View style={{ height: 24 }} />
      </ScrollView>
    </PaperProvider>
  );
}

