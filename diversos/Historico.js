import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, List, Button } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando COMPONENTE DE CLASSE
// class Historico extends React.Component { ... }
// =====================================================================
class Historico extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtro: 'todos', // valores possíveis: 'todos' | 'receita' | 'despesa'
    };
  }

  mudarFiltro = (valor) => {
    this.setState({ filtro: valor });
  };

  render() {
    const { transacoes } = this.props;
    const { filtro } = this.state;

    // [Critério 4]: Uso do filter() para filtrar as transações por tipo (receita/despesa)
    const transacoesFiltradas =
      filtro === 'todos'
        ? transacoes
        : transacoes.filter((transacao) => transacao.tipo === filtro);

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.titulo}>
            Histórico
          </Text>

          <View style={styles.linhaFiltros}>
            <Button
              compact
              mode={filtro === 'todos' ? 'contained' : 'outlined'}
              onPress={() => this.mudarFiltro('todos')}
              style={styles.botaoFiltro}
            >
              Todos
            </Button>
            <Button
              compact
              mode={filtro === 'receita' ? 'contained' : 'outlined'}
              onPress={() => this.mudarFiltro('receita')}
              style={styles.botaoFiltro}
            >
              Receitas
            </Button>
            <Button
              compact
              mode={filtro === 'despesa' ? 'contained' : 'outlined'}
              onPress={() => this.mudarFiltro('despesa')}
              style={styles.botaoFiltro}
            >
              Despesas
            </Button>
          </View>

          {/* [Critério 4]: Uso do map() para renderizar cada item do histórico já filtrado */}
          {transacoesFiltradas.map((transacao) => (
            <List.Item
              key={transacao.id}
              title={transacao.descricao}
              description={transacao.data}
              left={(iconProps) => (
                <List.Icon
                  {...iconProps}
                  icon={transacao.tipo === 'receita' ? 'arrow-up-bold-circle' : 'arrow-down-bold-circle'}
                  color={transacao.tipo === 'receita' ? '#2E7D32' : '#D32F2F'}
                />
              )}
              right={() => (
                <Text style={transacao.tipo === 'receita' ? styles.receita : styles.despesa}>
                  {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
                </Text>
              )}
            />
          ))}
        </Card.Content>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 8, fontWeight: 'bold' },
  linhaFiltros: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  botaoFiltro: { flex: 1, marginHorizontal: 2 },
  receita: { color: '#2E7D32', fontWeight: 'bold', alignSelf: 'center' },
  despesa: { color: '#D32F2F', fontWeight: 'bold', alignSelf: 'center' },
});

export default Historico;
