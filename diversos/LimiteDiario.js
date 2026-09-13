import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando ARROW FUNCTION
// const LimiteDiario = (...) => { ... }
// Calcula e mostra quanto o usuário pode gastar por dia, com base no
// saldo atual e no histórico de despesas, até o fim do mês.
// =====================================================================
const LimiteDiario = ({ saldoAtual, transacoes, diasRestantesMes }) => {
  // 'saldoAtual', 'transacoes' e 'diasRestantesMes' chegam como props do App.js

  // [Critério 4]: Uso do filter() para selecionar somente as transações do tipo despesa
  const despesas = transacoes.filter((transacao) => transacao.tipo === 'despesa');

  // [Critério 4]: Uso do reduce() para somar o total das despesas já filtradas.
  // Começa em 0 e vai somando o valor de cada despesa encontrada.
  const totalDespesas = despesas.reduce((acumulador, despesa) => acumulador + despesa.valor, 0);

  // Quantidade de despesas registradas (usada para calcular a média diária).
  // Se não houver nenhuma despesa ainda, usamos 1 no lugar de 0, só para
  // evitar uma divisão por zero (que resultaria em "Infinity" na tela).
  const diasComRegistro = despesas.length > 0 ? despesas.length : 1;

  // Média de quanto foi gasto por despesa registrada
  const mediaDiaria = totalDespesas / diasComRegistro;

  // Quanto ainda resta disponível no mês (vem pronto do App.js)
  const saldoRestante = saldoAtual;

  // Teto seguro por dia = saldo restante dividido pelos dias que faltam no mês
  const tetoDiario = saldoRestante / diasRestantesMes;

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Título do card */}
        <Text variant="titleMedium" style={styles.titulo}>
          Limite Diário de Gastos
        </Text>

        {/* Linha 1: saldo que ainda resta no mês */}
        <Text style={styles.linha}>Saldo restante no mês: R$ {saldoRestante.toFixed(2)}</Text>

        {/* Linha 2: média do quanto foi gasto por despesa até agora */}
        <Text style={styles.linha}>Média diária gasta: R$ {mediaDiaria.toFixed(2)}</Text>

        {/* Linha 3 (destaque): quanto dá pra gastar por dia com segurança */}
        <Text style={styles.destaque}>
          Teto seguro por dia: R$ {tetoDiario.toFixed(2)} ({diasRestantesMes} dias restantes)
        </Text>
      </Card.Content>
    </Card>
  );
};

// Estilos visuais do componente
const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 8, fontWeight: 'bold' },
  linha: { marginBottom: 4, color: '#555' },
  destaque: { marginTop: 8, fontWeight: 'bold', color: '#4B2E83' },
});

export default LimiteDiario;
