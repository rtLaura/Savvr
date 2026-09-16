import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import styles from '../assets/styles';

{/*Função Anônima*/}
const Resumo = function (props) {
  const { transacoes, contas } = props;

  {/*uso de reduce*/}
  const receitas = transacoes
    .filter((transacao) => transacao.tipo === 'receita')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  {/*uso de reduce*/}
  const despesas = transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

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

          {/*uso do map*/}
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
