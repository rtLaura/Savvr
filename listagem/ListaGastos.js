import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Searchbar, Button, List, Divider, TextInput, Chip, HelperText } from 'react-native-paper';

// =====================================================================
// Componente auxiliar: desenha uma faixa horizontal de chips clicáveis.
// Ele existe só para não repetir o mesmo bloco de código duas vezes
// (uma para Categoria e outra para Forma de Pagamento, mais abaixo).
// Recebe: a lista de opções, qual opção está selecionada agora, e uma
// função para avisar quando o usuário escolher (ou desmarcar) uma opção.
// =====================================================================
const FaixaDeChips = ({ opcoes, valorSelecionado, aoSelecionar }) => (
  <ScrollView
    horizontal // faz a lista rolar para os lados em vez de quebrar linha
    showsHorizontalScrollIndicator={false} // esconde a barrinha de rolagem
    style={styles.scrollChips}
    contentContainerStyle={styles.linhaChips}
  >
    {opcoes.map((opcao) => (
      <Chip
        key={opcao}
        selected={valorSelecionado === opcao} // deixa o chip "marcado" se for o escolhido
        // tocar de novo no chip já selecionado desmarca ele (volta para '')
        onPress={() => aoSelecionar(valorSelecionado === opcao ? '' : opcao)}
        style={styles.chip}
        mode={valorSelecionado === opcao ? 'flat' : 'outlined'}
      >
        {opcao}
      </Chip>
    ))}
  </ScrollView>
);

// =====================================================================
// [Critério 2]: Listagem com campo de busca e filtro usando filter()
// Este arquivo tem duas partes: o formulário "Novo Lançamento" (adiciona
// receitas/despesas usando categorias pré-definidas) e a lista de
// lançamentos já registrados, com busca e filtro.
// =====================================================================
const ListaGastos = ({ transacoes, categoriasDespesa, categoriasReceita, aoAdicionarTransacao }) => {
  // Formas de pagamento pré-definidas, exibidas como chips no formulário
  const formasPagamento = ['Boleto', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'Pix', 'Transferência'];

  // ---------------------------------------------------------------------
  // Estado do formulário "Novo Lançamento"
  // ---------------------------------------------------------------------
  const [novoTipo, setNovoTipo] = useState('despesa'); // 'despesa' | 'receita'
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaFormaPagamento, setNovaFormaPagamento] = useState('');
  const [erroForm, setErroForm] = useState(''); // mensagem de erro do formulário

  // Escolhe qual lista de categorias mostrar, de acordo com o tipo escolhido
  // (categoriasDespesa e categoriasReceita já chegam prontas como props, vindas do App.js)
  const categoriasDisponiveis = novoTipo === 'despesa' ? categoriasDespesa : categoriasReceita;

  // Chamada quando o usuário aperta "Despesa" ou "Receita"
  const escolherTipo = (tipo) => {
    setNovoTipo(tipo);
    setNovaCategoria(''); // limpa a categoria escolhida, pois a lista de opções muda
  };

  // Chamada quando o usuário aperta o botão "Adicionar"
  const adicionarLancamento = () => {
    setErroForm(''); // limpa erro anterior antes de tentar de novo

    // Validação simples de entrada, usando try/catch: qualquer "throw" abaixo
    // é capturado pelo catch, que guarda a mensagem em 'erroForm'
    try {
      // 1) A descrição não pode estar vazia
      if (novaDescricao.trim() === '') {
        throw new Error('Informe uma descrição para o lançamento.');
      }

      // Converte o valor digitado (texto) em número, trocando vírgula por ponto
      const valorNum = Number(novoValor.replace(',', '.'));
      // 2) O valor precisa ser um número válido e maior que zero
      if (Number.isNaN(valorNum) || valorNum <= 0) {
        throw new Error('Informe um valor numérico maior que zero.');
      }

      // 3) É preciso ter escolhido alguma categoria
      if (novaCategoria === '') {
        throw new Error('Selecione uma categoria.');
      }

      // Tudo certo: envia o novo lançamento para o App.js através da prop
      // 'aoAdicionarTransacao'. É lá que ele entra na lista central.
      aoAdicionarTransacao({
        descricao: novaDescricao.trim(),
        valor: valorNum,
        tipo: novoTipo,
        categoria: novaCategoria,
        // se o usuário não escolheu forma de pagamento, usa um texto padrão
        formaPagamento: novaFormaPagamento === '' ? 'Não informado' : novaFormaPagamento,
      });

      // Limpa todos os campos do formulário depois de adicionar com sucesso
      setNovaDescricao('');
      setNovoValor('');
      setNovaCategoria('');
      setNovaFormaPagamento('');
    } catch (error) {
      setErroForm(error.message); // mostra a mensagem de erro na tela
    }
  };

  // ---------------------------------------------------------------------
  // Estado e lógica da busca/filtro da lista de lançamentos
  // ---------------------------------------------------------------------
  const [busca, setBusca] = useState(''); // texto digitado na barra de busca
  const [termoAplicado, setTermoAplicado] = useState(''); // termo usado de fato no filtro

  // Chamada quando o usuário aperta o botão "Filtrar":
  // guarda o texto da busca (em minúsculas) para ser usado no filter() abaixo
  const aplicarFiltro = () => {
    setTermoAplicado(busca.trim().toLowerCase());
  };

  // Chamada quando o usuário aperta "Limpar": volta a mostrar tudo
  const limparFiltro = () => {
    setBusca('');
    setTermoAplicado('');
  };

  // [Critério 2]: Uso da função filter() para buscar por descrição, tipo,
  // categoria ou forma de pagamento. Se não houver termo aplicado, mostra
  // a lista inteira sem filtrar.
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
    // <> ... </> é um "Fragment": permite devolver dois Cards sem precisar
    // de uma View extra envolvendo os dois
    <>
      {/* ------------------- Card 1: formulário "Novo Lançamento" ------------------- */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.titulo}>
            Novo Lançamento
          </Text>

          {/* Botões para escolher entre Despesa e Receita */}
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

          {/* Campo de texto: descrição do lançamento */}
          <TextInput
            label="Descrição"
            value={novaDescricao}
            onChangeText={setNovaDescricao}
            mode="outlined"
            style={styles.input}
          />

          {/* Campo de texto: valor do lançamento */}
          <TextInput
            label="Valor (R$)"
            value={novoValor}
            onChangeText={setNovoValor}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          {/* Chips de categoria, usando o componente auxiliar FaixaDeChips */}
          <Text style={styles.rotuloCategoria}>Categoria</Text>
          <FaixaDeChips
            opcoes={categoriasDisponiveis}
            valorSelecionado={novaCategoria}
            aoSelecionar={setNovaCategoria}
          />

          {/* Chips de forma de pagamento (opcional), mesmo componente auxiliar */}
          <Text style={styles.rotuloCategoria}>Forma de pagamento (opcional)</Text>
          <FaixaDeChips
            opcoes={formasPagamento}
            valorSelecionado={novaFormaPagamento}
            aoSelecionar={setNovaFormaPagamento}
          />

          {/* Mensagem de erro do formulário, só aparece se erroForm não estiver vazio */}
          <HelperText type="error" visible={erroForm !== ''}>
            {erroForm}
          </HelperText>

          {/* Botão que confirma e adiciona o lançamento */}
          <Button mode="contained" onPress={adicionarLancamento} style={styles.botaoAdicionar}>
            Adicionar {novoTipo === 'despesa' ? 'Despesa' : 'Receita'}
          </Button>
        </Card.Content>
      </Card>

      {/* ------------------- Card 2: lista de lançamentos com busca ------------------- */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.titulo}>
            Lançamentos
          </Text>

          {/* Barra de busca: só guarda o texto digitado, o filtro real
              só acontece quando o botão "Filtrar" é apertado */}
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

          {/* Mensagem exibida quando o filtro não encontra nenhum resultado */}
          {listaExibida.length === 0 && <Text style={styles.vazio}>Nenhum lançamento encontrado.</Text>}

          {/* Percorre a lista já filtrada (ou completa) e desenha um item para cada transação */}
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

// Estilos visuais usados neste arquivo
const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 10, fontWeight: 'bold' },
  linhaTipo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  botaoTipo: { flex: 1, marginHorizontal: 2 },
  input: { marginBottom: 10 },
  rotuloCategoria: { marginBottom: 6, color: '#555' },
  scrollChips: { marginBottom: 12 },
  linhaChips: { flexDirection: 'row', paddingRight: 8 },
  chip: { marginRight: 6 },
  botaoAdicionar: { marginTop: 4 },
  busca: { marginBottom: 10 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  botao: { flex: 1, marginHorizontal: 4 },
  divisor: { marginVertical: 8 },
  vazio: { textAlign: 'center', color: '#888', marginVertical: 12 },
  receita: { color: '#2E7D32', fontWeight: 'bold', alignSelf: 'center' }, // verde
  despesa: { color: '#D32F2F', fontWeight: 'bold', alignSelf: 'center' }, // vermelho
});

export default ListaGastos;
