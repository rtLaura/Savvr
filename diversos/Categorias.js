import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando FUNÇÃO ANÔNIMA
// const Categorias = function(props) { ... }
// Mostra o card "Orçamentos por Categoria": uma barra de progresso para
// cada categoria, comparando o quanto já foi gasto com o orçamento definido.
// =====================================================================
const Categorias = function (props) {
  // 'categorias' é um array recebido via props (vindo do App.js), no formato:
  // [{ id, nome, orcamento, gasto }, { id, nome, orcamento, gasto }, ...]
  const { categorias } = props;

  // [Critério 4]: Uso do reduce() para somar o valor total orçado em todas as categorias.
  // reduce percorre o array e vai acumulando um valor (começando em 0).
  const totalOrcado = categorias.reduce(function (acumulador, categoria) {
    return acumulador + categoria.orcamento; // soma o orçamento desta categoria ao total
  }, 0);

  // [Critério 4]: Uso do reduce() para somar o valor total já gasto em todas as categorias
  const totalGasto = categorias.reduce(function (acumulador, categoria) {
    return acumulador + categoria.gasto; // soma o gasto desta categoria ao total
  }, 0);

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Título do card */}
        <Text variant="titleMedium" style={styles.titulo}>
          Orçamentos por Categoria
        </Text>

        {/* Resumo geral: total gasto de total orçado, com 2 casas decimais */}
        <Text style={styles.resumo}>
          Total: R$ {totalGasto.toFixed(2)} de R$ {totalOrcado.toFixed(2)}
        </Text>

        {/* [Critério 4]: Uso do map() para renderizar uma barra/card para cada categoria.
            map() transforma cada item do array 'categorias' em um elemento visual (View) */}
        {categorias.map((categoria) => {
          // progresso = fração gasta do orçamento (ex: 0.5 = metade gasta)
          const progresso = categoria.gasto / categoria.orcamento;
          // estourou = true quando o gasto passou do orçamento (progresso > 100%)
          const estourou = progresso > 1;

          return (
            <View key={categoria.id} style={styles.linhaCategoria}>
              {/* Linha com o nome da categoria e o valor gasto/orçado */}
              <View style={styles.cabecalhoCategoria}>
                <Text>{categoria.nome}</Text>
                <Text style={estourou ? styles.textoAlerta : styles.textoNormal}>
                  R$ {categoria.gasto.toFixed(2)} / R$ {categoria.orcamento.toFixed(2)}
                </Text>
              </View>

              {/* Barra de progresso visual: Math.min(progresso, 1) trava a barra em 100%
                  mesmo se o gasto for maior que o orçamento (senão passaria da barra) */}
              <ProgressBar
                progress={Math.min(progresso, 1)}
                color={estourou ? '#D32F2F' : '#4B2E83'}
                style={styles.barra}
              />
            </View>
          );
        })}
      </Card.Content>
    </Card>
  );
};

// Estilos visuais do componente
const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 4, fontWeight: 'bold' },
  resumo: { marginBottom: 12, color: '#555' },
  linhaCategoria: { marginBottom: 10 },
  cabecalhoCategoria: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  barra: { height: 8, borderRadius: 4 },
  textoAlerta: { color: '#D32F2F', fontWeight: 'bold' }, // vermelho quando estourou o orçamento
  textoNormal: { color: '#555' }, // cinza quando está dentro do orçamento
});

export default Categorias;
