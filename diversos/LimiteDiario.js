import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import calcularTetoDiario from './utils/Calculos';

// [Critério 4]: Componente criado utilizando Arrow Function
// Calcula e mostra quanto o usuário pode gastar por dia, com base no
// saldo atual e no histórico de despesas, até o fim do mês.

const LimiteDiario = ({ saldoAtual, transacoes, diasRestantesMes }) => {
  // 'saldoAtual', 'transacoes' e 'diasRestantesMes' chegam como props do App.js

  // [Critério 4]: Uso do filter() para selecionar somente as transações do tipo despesa
  const despesas = transacoes.filter((transacao) => transacao.tipo === 'despesa');

  // [Critério 4]: Uso do reduce() para somar o total das despesas já filtradas.
  const totalDespesas = despesas.reduce((acumulador, despesa) => acumulador + despesa.valor, 0);

  // Quantidade de despesas registradas (usada para calcular a média diária).
  // Se não houver nenhuma despesa ainda, usamos 1 no lugar de 0, só para
  // evitar uma divisão por zero.
  const diasComRegistro = despesas.length > 0 ? despesas.length : 1;

  // Média de quanto foi gasto por despesa registrada
  const mediaDiaria = totalDespesas / diasComRegistro;

  // Quanto ainda resta disponível no mês
  const saldoRestante = saldoAtual;

  // Teto seguro por dia = saldo restante dividido pelos dias que faltam no mês.
  // Usa a função compartilhada calcularTetoDiario, com try...catch
  // caso diasRestantesMes chegue inválido (0, negativo, etc.).
  let tetoDiario = 0;
  let erroCalculo = '';

  try {
    tetoDiario = calcularTetoDiario(saldoRestante, diasRestantesMes);
  } catch (erro) {
    erroCalculo = erro.message;
  }

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

        {/* Linha 3: quanto dá pra gastar por dia com segurança, ou o erro do cálculo */}
        {erroCalculo === '' ? (
          <Text style={styles.destaque}>
            Teto seguro por dia: R$ {tetoDiario.toFixed(2)} ({diasRestantesMes} dias restantes)
          </Text>
        ) : (
          <Text style={styles.erro}>{erroCalculo}</Text>
        )}
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
  erro: { marginTop: 8, fontWeight: 'bold', color: '#D32F2F' },
});

export default LimiteDiario;
