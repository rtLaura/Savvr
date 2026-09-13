import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Searchbar, Button, List, Divider, TextInput, Menu, HelperText } from 'react-native-paper';

// =====================================================================
// [Critério 2]: Listagem com campo de busca e filtro usando filter()
// Também inclui o formulário para adicionar novas receitas/despesas
// com base nas categorias pré-definidas (recebidas via props do App.js)
// =====================================================================
const ListaGastos = ({ transacoes, categoriasDespesa, categoriasReceita, aoAdicionarTransacao }) => {
  // ---------------------------------------------------------------------
  // Formulário: Novo Lançamento (receita ou despesa por categoria)
  // ---------------------------------------------------------------------
  const [novoTipo, setNovoTipo] = useState('despesa'); // 'despesa' | 'receita'
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaFormaPagamento, setNovaFormaPagamento] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [erroForm, setErroForm] = useState('');

  const nomesCategoriasDespesa = categoriasDespesa.map((categoria) => categoria.nome);
  const categoriasDisponiveis = novoTipo === 'despesa' ? nomesCategoriasDespesa : categoriasReceita;

  const escolherTipo = (tipo) => {
    setNovoTipo(tipo);
    setNovaCategoria(''); // a categoria muda de lista quando o tipo muda
  };

  const adicionarLancamento = () => {
    setErroForm('');

    // Validação simples de entrada antes de adicionar o lançamento
    try {
      if (novaDescricao.trim() === '') {
        throw new Error('Informe uma descrição para o lançamento.');
      }

      const valorNum = Number(novoValor.replace(',', '.'));
      if (Number.isNaN(valorNum) || valorNum <= 0) {
        throw new Error('Informe um valor numérico maior que zero.');
      }

      if (novaCategoria === '') {
        throw new Error('Selecione uma categoria.');
      }

      aoAdicionarTransacao({
        descricao: novaDescricao.trim(),
        valor: valorNum,
        tipo: novoTipo,
        categoria: novaCategoria,
        formaPagamento: novaFormaPagamento.trim() === '' ? 'Não informado' : novaFormaPagamento.trim(),
      });

      // Limpa o formulário após adicionar com sucesso
      setNovaDescricao('');
      setNovoValor('');
      setNovaCategoria('');
      setNovaFormaPagamento('');
    } catch (error) {
      setErroForm(error.message);
    }
  };

  // ---------------------------------------------------------------------
  // Listagem com busca e filtro
  // ---------------------------------------------------------------------
  const [busca, setBusca] = useState('');
  const [termoAplicado, setTermoAplicado] = useState('');

  const aplicarFiltro = () => {
    setTermoAplicado(busca.trim().toLowerCase());
  };

  const limparFiltro = () => {
    setBusca('');
    setTermoAplicado('');
  };

  // [Critério 2]: Uso da função filter() para buscar por descrição, tipo,
  // categoria ou forma de pagamento
  const listaExibida =
    termoAplicado === ''
      ? transacoes
      : transacoes.filter((transacao) => {
          return (
            transacao.descricao.toLowerCase().includes(termoAplicado) ||
            transacao.tipo.toLowerCase().includes(termoAplicado) ||
            transacao.categoria.toLowerCase().includes(termoAplicado) ||
            transacao.formaPagamento.toLowerCase().includes(termoAplicado)
          );
        });

  return (
    <>
      {/* Card do formulário de novo lançamento */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.titulo}>
            Novo Lançamento
          </Text>

          <View style={styles.linhaTipo}>
            <Button
              compact
              mode={novoTipo === 'despesa' ? 'contained' : 'outlined'}
              onPress={() => escolherTipo('despesa')}
              style={styles.botaoTipo}
            >
              Despesa
            </Button>
            <Button
              compact
              mode={novoTipo === 'receita' ? 'contained' : 'outlined'}
              onPress={() => escolherTipo('receita')}
              style={styles.botaoTipo}
            >
              Receita
            </Button>
          </View>

          <TextInput
            label="Descrição"
            value={novaDescricao}
            onChangeText={setNovaDescricao}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Valor (R$)"
            value={novoValor}
            onChangeText={setNovoValor}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          {/* Dropdown (Menu) com as categorias pré-definidas, de acordo com o tipo escolhido */}
          <Menu
            visible={menuAberto}
            onDismiss={() => setMenuAberto(false)}
            anchor={
              <Button
                mode="outlined"
                icon="chevron-down"
                onPress={() => setMenuAberto(true)}
                style={styles.botaoCategoria}
              >
                {novaCategoria || 'Selecionar categoria'}
              </Button>
            }
          >
            {categoriasDisponiveis.map((nomeCategoria) => (
              <Menu.Item
                key={nomeCategoria}
                title={nomeCategoria}
                onPress={() => {
                  setNovaCategoria(nomeCategoria);
                  setMenuAberto(false);
                }}
              />
            ))}
          </Menu>

          <TextInput
            label="Forma de pagamento (opcional)"
            value={novaFormaPagamento}
            onChangeText={setNovaFormaPagamento}
            mode="outlined"
            style={styles.input}
          />

          <HelperText type="error" visible={erroForm !== ''}>
            {erroForm}
          </HelperText>

          <Button mode="contained" onPress={adicionarLancamento} style={styles.botaoAdicionar}>
            Adicionar {novoTipo === 'despesa' ? 'Despesa' : 'Receita'}
          </Button>
        </Card.Content>
      </Card>

      {/* Card da listagem com busca e filtro */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.titulo}>
            Lançamentos
          </Text>

          <Searchbar
            placeholder="Buscar por descrição, tipo ou categoria"
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

          {listaExibida.length === 0 && <Text style={styles.vazio}>Nenhum lançamento encontrado.</Text>}

          {listaExibida.map((transacao) => (
            <List.Item
              key={transacao.id}
              title={transacao.descricao}
              description={`${transacao.tipo === 'receita' ? 'Receita' : 'Despesa'} • ${transacao.categoria} • ${transacao.formaPagamento}`}
              right={() => (
                <Text style={transacao.tipo === 'receita' ? styles.receita : styles.despesa}>
                  {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
                </Text>
              )}
            />
          ))}
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 10, fontWeight: 'bold' },
  linhaTipo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  botaoTipo: { flex: 1, marginHorizontal: 2 },
  input: { marginBottom: 10 },
  botaoCategoria: { marginBottom: 10, justifyContent: 'flex-start' },
  botaoAdicionar: { marginTop: 4 },
  busca: { marginBottom: 10 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  botao: { flex: 1, marginHorizontal: 4 },
  divisor: { marginVertical: 8 },
  vazio: { textAlign: 'center', color: '#888', marginVertical: 12 },
  receita: { color: '#2E7D32', fontWeight: 'bold', alignSelf: 'center' },
  despesa: { color: '#D32F2F', fontWeight: 'bold', alignSelf: 'center' },
});

export default ListaGastos;
