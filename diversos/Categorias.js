import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando FUNÇÃO ANÔNIMA
// const Categorias = function(props) { ... }
// =====================================================================
const Categorias = function (props) {
  const { categorias } = props;

  // [Critério 4]: Uso do reduce() para somar o valor total orçado em todas as categorias
  const totalOrcado = categorias.reduce(function (acumulador, categoria) {
    return acumulador + categoria.orcamento;
  }, 0);

  // [Critério 4]: Uso do reduce() para somar o valor total já gasto em todas as categorias
  const totalGasto = categorias.reduce(function (acumulador, categoria) {
    return acumulador + categoria.gasto;
  }, 0);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.titulo}>
          Orçamentos por Categoria
        </Text>
        <Text style={styles.resumo}>
          Total: R$ {totalGasto.toFixed(2)} de R$ {totalOrcado.toFixed(2)}
        </Text>

        {/* [Critério 4]: Uso do map() para renderizar uma barra/card para cada categoria */}
        {categorias.map((categoria) => {
          const progresso = categoria.gasto / categoria.orcamento;
          const estourou = progresso > 1;
          return (
            <View key={categoria.id} style={styles.linhaCategoria}>
              <View style={styles.cabecalhoCategoria}>
                <Text>{categoria.nome}</Text>
                <Text style={estourou ? styles.textoAlerta : styles.textoNormal}>
                  R$ {categoria.gasto.toFixed(2)} / R$ {categoria.orcamento.toFixed(2)}
                </Text>
              </View>
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

const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 4, fontWeight: 'bold' },
  resumo: { marginBottom: 12, color: '#555' },
  linhaCategoria: { marginBottom: 10 },
  cabecalhoCategoria: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  barra: { height: 8, borderRadius: 4 },
  textoAlerta: { color: '#D32F2F', fontWeight: 'bold' },
  textoNormal: { color: '#555' },
});

export default Categorias;
