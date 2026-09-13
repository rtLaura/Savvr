import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Searchbar, Button, List, Divider } from 'react-native-paper';

// =====================================================================
// [Critério 2]: Listagem com campo de busca e filtro usando filter()
// =====================================================================
const ListaGastos = () => {
  // [Critério 2]: Vetor de objetos com 8 itens, cada um com 4 atributos
  // (nome, valor, tipo, forma de pagamento)
  const [gastos] = useState([
    { id: '1', nome: 'Supermercado', valor: 320.0, tipo: 'Despesa', formaPagamento: 'Cartão de Débito' },
    { id: '2', nome: 'Salário', valor: 6200.0, tipo: 'Receita', formaPagamento: 'Transferência' },
    { id: '3', nome: 'Uber', valor: 45.5, tipo: 'Despesa', formaPagamento: 'Cartão de Crédito' },
    { id: '4', nome: 'Cinema', valor: 60.0, tipo: 'Despesa', formaPagamento: 'Dinheiro' },
    { id: '5', nome: 'Farmácia', valor: 90.0, tipo: 'Despesa', formaPagamento: 'Cartão de Débito' },
    { id: '6', nome: 'Freelance', valor: 500.0, tipo: 'Receita', formaPagamento: 'Pix' },
    { id: '7', nome: 'Academia', valor: 120.0, tipo: 'Despesa', formaPagamento: 'Pix' },
    { id: '8', nome: 'Internet', valor: 99.9, tipo: 'Despesa', formaPagamento: 'Cartão de Crédito' },
  ]);

  const [busca, setBusca] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState(gastos);

  const aplicarFiltro = () => {
    const termo = busca.trim().toLowerCase();

    // [Critério 2]: Uso da função filter() para buscar por nome, tipo ou forma de pagamento
    const resultado = gastos.filter((gasto) => {
      return (
        gasto.nome.toLowerCase().includes(termo) ||
        gasto.tipo.toLowerCase().includes(termo) ||
        gasto.formaPagamento.toLowerCase().includes(termo)
      );
    });

    setListaFiltrada(resultado);
  };

  const limparFiltro = () => {
    setBusca('');
    setListaFiltrada(gastos);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.titulo}>
          Lançamentos
        </Text>

        <Searchbar
          placeholder="Buscar por nome, tipo ou pagamento"
          value={busca}
          onChangeText={setBusca}
          style={styles.busca}
        />

        <View style={styles.botoes}>
          {/* [Critério 2]: Botão acionável que dispara o filtro */}
          <Button mode="contained" onPress={aplicarFiltro} style={styles.botao}>
            Filtrar
          </Button>
          <Button mode="outlined" onPress={limparFiltro} style={styles.botao}>
            Limpar
          </Button>
        </View>

        <Divider style={styles.divisor} />

        {listaFiltrada.length === 0 && (
          <Text style={styles.vazio}>Nenhum lançamento encontrado.</Text>
        )}

        {listaFiltrada.map((gasto) => (
          <List.Item
            key={gasto.id}
            title={gasto.nome}
            description={`${gasto.tipo} • ${gasto.formaPagamento}`}
            right={() => (
              <Text style={gasto.tipo === 'Receita' ? styles.receita : styles.despesa}>
                R$ {gasto.valor.toFixed(2)}
              </Text>
            )}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 10, fontWeight: 'bold' },
  busca: { marginBottom: 10 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  botao: { flex: 1, marginHorizontal: 4 },
  divisor: { marginVertical: 8 },
  vazio: { textAlign: 'center', color: '#888', marginVertical: 12 },
  receita: { color: '#2E7D32', fontWeight: 'bold', alignSelf: 'center' },
  despesa: { color: '#D32F2F', fontWeight: 'bold', alignSelf: 'center' },
});

export default ListaGastos;
