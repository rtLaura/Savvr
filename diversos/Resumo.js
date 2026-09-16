import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import styles from '../assets/styles';
import formatarDataAtual from './utils/FormatarData';

import {
  contas,
  categoriasOrcamento,
  categoriasDespesa,
  categoriasReceita,
  transacoes as transacoesIniciais
} from '../listagem/Constants';
const Resumo = () => {

  const [transacoes, setTransacoes] = useState(transacoesIniciais);

  const adicionarTransacao = (dadosNovaTransacao) => {

    const novaTransacao = {
      id: String(Date.now()),
      data: formatarDataAtual(),
      ...dadosNovaTransacao,
    };

    setTransacoes((atual) => [
      novaTransacao,
      ...atual,
    ]);
  };

  const receitas = transacoes
    .filter((transacao) => transacao.tipo === 'receita')
    .reduce(
      (acumulador, transacao) =>
        acumulador + transacao.valor,
      0
    );

  const despesas = transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .reduce(
      (acumulador, transacao) =>
        acumulador + transacao.valor,
      0
    );

  const saldoAtual = receitas - despesas;

  return (
    <>
      <View style={styles.linhaResumo}>

        <Card style={[
          styles.cardResumo,
          styles.cardSaldo
        ]}>
          <Card.Content>

            <Text style={styles.rotuloResumoClaro}>
              Saldo Atual
            </Text>

            <Text style={styles.valorSaldo}>
              R$ {saldoAtual.toFixed(2)}
            </Text>

          </Card.Content>
        </Card>

      </View>

      <View style={styles.linhaResumo}>

        <Card style={[
          styles.cardResumo,
          styles.cardMetade
        ]}>
          <Card.Content>

            <Text style={styles.rotuloResumo}>
              Receitas
            </Text>

            <Text style={styles.valorReceita}>
              R$ {receitas.toFixed(2)}
            </Text>

          </Card.Content>
        </Card>

        <Card style={[
          styles.cardResumo,
          styles.cardMetade
        ]}>
          <Card.Content>

            <Text style={styles.rotuloResumo}>
              Despesas
            </Text>

            <Text style={styles.valorDespesa}>
              R$ {despesas.toFixed(2)}
            </Text>

          </Card.Content>
        </Card>

      </View>

      <Card style={styles.card}>
        <Card.Content>

          <Text
            variant="titleMedium"
            style={styles.titulo}
          >
            Saldo das Contas
          </Text>

          {contas.map((conta) => (

            <View
              key={conta.id}
              style={styles.linhaConta}
            >
              <Text>{conta.nome}</Text>

              <Text style={styles.valorConta}>
                R$ {conta.saldo.toFixed(2)}
              </Text>
            </View>

          ))}

        </Card.Content>
      </Card>
    </>
  );
};

export default Resumo;