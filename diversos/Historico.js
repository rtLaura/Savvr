import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, List, Button } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando COMPONENTE DE CLASSE
// class Historico extends React.Component { ... }
// Mostra a lista de lançamentos (receitas e despesas) com botões para
// filtrar por tipo.
// =====================================================================
class Historico extends React.Component {
  // O constructor roda uma vez, quando o componente é criado.
  // Aqui definimos o estado inicial: qual filtro está ativo.
  constructor(props) {
    super(props); // obrigatório em toda classe que herda de React.Component

    // this.state guarda os dados que podem mudar e re-renderizar a tela.
    // 'filtro' começa em 'todos' (mostra receitas e despesas juntas)
    this.state = {
      filtro: 'todos', // valores possíveis: 'todos' | 'receita' | 'despesa'
    };
  }

  // Função (arrow function como propriedade da classe) que troca o filtro
  // quando o usuário aperta um dos botões "Todos / Receitas / Despesas"
  mudarFiltro = (valor) => {
    this.setState({ filtro: valor }); // atualiza o estado e re-renderiza a tela
  };

  // render() é chamado toda vez que o componente precisa desenhar a tela
  render() {
    // 'transacoes' vem via props (do App.js): array com todos os lançamentos
    const { transacoes } = this.props;
    // 'filtro' vem do estado interno da classe (definido acima)
    const { filtro } = this.state;

    // [Critério 4]: Uso do filter() para filtrar as transações por tipo (receita/despesa).
    // Se o filtro for 'todos', mostra tudo sem filtrar; senão, mantém só as
    // transações cujo campo 'tipo' seja igual ao filtro escolhido.
    const transacoesFiltradas =
      filtro === 'todos'
        ? transacoes
        : transacoes.filter((transacao) => transacao.tipo === filtro);

    return (
      <Card style={styles.card}>
        <Card.Content>
          {/* Título do card */}
          <Text variant="titleMedium" style={styles.titulo}>
            Histórico
          </Text>

          {/* Linha com os 3 botões de filtro. O botão do filtro ativo fica
              "contained" (preenchido); os outros ficam "outlined" (contorno) */}
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

          {/* [Critério 4]: Uso do map() para renderizar cada item do histórico já filtrado.
              Para cada transação, cria um List.Item mostrando descrição, data,
              um ícone (seta pra cima/baixo) e o valor colorido */}
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

// Estilos visuais do componente
const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 8, fontWeight: 'bold' },
  linhaFiltros: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  botaoFiltro: { flex: 1, marginHorizontal: 2 },
  receita: { color: '#2E7D32', fontWeight: 'bold', alignSelf: 'center' }, // verde para receitas
  despesa: { color: '#D32F2F', fontWeight: 'bold', alignSelf: 'center' }, // vermelho para despesas
});

export default Historico;
