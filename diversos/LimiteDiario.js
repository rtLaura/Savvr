import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando ARROW FUNCTION
// const LimiteDiario = (...) => { ... }
// =====================================================================
const LimiteDiario = ({ saldoAtual, transacoes, diasRestantesMes }) => {
  // [Critério 4]: Uso do filter() para selecionar somente as transações do tipo despesa
  const despesas = transacoes.filter((transacao) => transacao.tipo === 'despesa');

  // [Critério 4]: Uso do reduce() para somar o total das despesas já filtradas
  const totalDespesas = despesas.reduce((acumulador, despesa) => acumulador + despesa.valor, 0);

  // Média diária considerando a quantidade de despesas registradas (mínimo 1 para evitar divisão por zero)
  const diasComRegistro = despesas.length > 0 ? despesas.length : 1;
  const mediaDiaria = totalDespesas / diasComRegistro;

  const saldoRestante = saldoAtual;
  const tetoDiario = saldoRestante / diasRestantesMes;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.titulo}>
          Limite Diário de Gastos
        </Text>
        <Text style={styles.linha}>Saldo restante no mês: R$ {saldoRestante.toFixed(2)}</Text>
        <Text style={styles.linha}>Média diária gasta: R$ {mediaDiaria.toFixed(2)}</Text>
        <Text style={styles.destaque}>
          Teto seguro por dia: R$ {tetoDiario.toFixed(2)} ({diasRestantesMes} dias restantes)
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 8, fontWeight: 'bold' },
  linha: { marginBottom: 4, color: '#555' },
  destaque: { marginTop: 8, fontWeight: 'bold', color: '#4B2E83' },
});

export default LimiteDiario;
