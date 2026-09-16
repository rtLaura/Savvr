import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Searchbar, Button, List, Divider } from 'react-native-paper';

// [Critério 2]: Listagem com campo de busca e filtro usando filter()

const ListaGastos = ({ transacoes }) => {


  // Estado da busca
  // Guarda o que o usuário está digitando na barra de pesquisa
  const [busca, setBusca] = useState('');

  // Guarda o termo que será realmente utilizado no filtro
  const [termoAplicado, setTermoAplicado] = useState('');

  // Aplicação do filtro

  // [Critério 2]: Função acionada pelo botão "Filtrar"
  const aplicarFiltro = () => {
    setTermoAplicado(busca.trim().toLowerCase());
  };

  // Limpeza do filtro
  // Volta a mostrar todos os lançamentos
  const limparFiltro = () => {
    setBusca('');
    setTermoAplicado('');
  };

  // Filtragem da lista
  // [Critério 2]: Uso da função filter()
  // Se nenhum termo foi aplicado, todos os lançamentos são exibidos.

  const listaExibida =
    termoAplicado === ''
      ? transacoes
      : transacoes.filter((transacao) => {
          return (
            transacao.descricao
              .toLowerCase()
              .includes(termoAplicado) ||

            transacao.tipo
              .toLowerCase()
              .includes(termoAplicado) ||

            transacao.categoria
              .toLowerCase()
              .includes(termoAplicado) ||

            transacao.formaPagamento
              .toLowerCase()
              .includes(termoAplicado)
          );
        });

  // Interface

  return (
    <Card style={styles.card}>
      <Card.Content>

        <Text
          variant="titleMedium"
          style={styles.titulo}
        >
          Lançamentos
        </Text>

        {/* Barra de busca */}
        <Searchbar
          placeholder="Descrição, tipo, categoria, pagamento"
          value={busca}
          onChangeText={setBusca}
          style={styles.busca}
          inputStyle={styles.textoBusca}
        />

        {/* Botões de filtro */}
        <View style={styles.botoes}>

          {/* [Critério 2]: botão que dispara o filtro */}
          <Button
            mode="contained"
            onPress={aplicarFiltro}
            style={styles.botao}
          >
            Filtrar
          </Button>

          {/* Botão para limpar a busca */}
          <Button
            mode="outlined"
            onPress={limparFiltro}
            style={styles.botao}
          >
            Limpar
          </Button>

        </View>

        <Divider style={styles.divisor} />

        {/* Mensagem caso nenhum lançamento seja encontrado */}
        {listaExibida.length === 0 && (
          <Text style={styles.vazio}>
            Nenhum lançamento encontrado.
          </Text>
        )}

        {/* Exibição dos lançamentos filtrados */}
        {listaExibida.map((transacao) => (
          <List.Item
            key={transacao.id}
            title={transacao.descricao}

            description={
              `${transacao.tipo === 'receita'
                ? 'Receita'
                : 'Despesa'} • ` +
              `${transacao.categoria} • ` +
              `${transacao.formaPagamento}`
            }

            right={() => (
              <Text
                style={
                  transacao.tipo === 'receita'
                    ? styles.receita
                    : styles.despesa
                }
              >
                {transacao.tipo === 'receita'
                  ? '+'
                  : '-'}{' '}
                R$ {transacao.valor.toFixed(2)}
              </Text>
            )}
          />
        ))}

      </Card.Content>
    </Card>
  );
};

// Estilos visuais

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 12,
    elevation: 2,
  },

  titulo: {
    marginBottom: 10,
    fontWeight: 'bold',
  },

  busca: {
    marginBottom: 10,
  },

  textoBusca: {
    fontSize: 12,
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  botao: {
    flex: 1,
    marginHorizontal: 4,
  },

  divisor: {
    marginVertical: 8,
  },

  vazio: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 12,
  },

  receita: {
    color: '#2E7D32',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  despesa: {
    color: '#D32F2F',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default ListaGastos;