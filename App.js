import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Provider as PaperProvider, Card, Text } from 'react-native-paper';

// =====================================================================
// [Critério 1]: Importação de todos os componentes no arquivo principal
// =====================================================================
import Appbar from './diversos/Appbar';
import Categorias from './diversos/Categorias';
import Historico from './diversos/Historico';
import LimiteDiario from './diversos/LimiteDiario';
import ListaGastos from './listagem/ListaGastos';
import FormularioGastos from './formulario/FormularioGastos';

// Função auxiliar: devolve a data de hoje já formatada como "dd/mm".
// Usada quando um novo lançamento é adicionado (ele recebe a data atual).
const formatarDataAtual = () => {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0'); // padStart garante 2 dígitos, ex: "03"
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // getMonth() começa em 0, por isso o +1
  return `${dia}/${mes}`;
};

// App.js é a tela principal: monta o dashboard inteiro e guarda os dados
// que são compartilhados entre os componentes (contas, categorias e transações).
export default function App() {
  // Nome exibido na saudação do topo ("Olá, Mariana")
  const [usuario] = useState('Mariana');

  // Lista fixa de contas do usuário, só para exibição no card "Saldo das Contas"
  const [contas] = useState([
    { id: '1', nome: 'Conta Corrente', saldo: 3200.0 },
    { id: '2', nome: 'Poupança', saldo: 1200.5 },
    { id: '3', nome: 'Carteira', saldo: 420.0 },
  ]);

  // Categorias com orçamento mensal definido — usadas apenas no card
  // "Orçamentos por Categoria" do dashboard (diversos/Categorias.js).
  // Cada uma tem um limite de gasto (orcamento) para acompanhar.
  const [categoriasOrcamento] = useState([
    { id: '1', nome: 'Alimentação', orcamento: 800 },
    { id: '2', nome: 'Transporte', orcamento: 300 },
    { id: '3', nome: 'Lazer', orcamento: 400 },
    { id: '4', nome: 'Saúde', orcamento: 250 },
  ]);

  // Lista completa de categorias de despesa pré-definidas, usada para
  // classificar lançamentos no formulário "Novo Lançamento" em
  // listagem/ListaGastos.js (nem todas têm orçamento acompanhado no dashboard).
  const categoriasDespesa = [
    'Alimentação',
    'Animais',
    'Educação',
    'Estética',
    'Finanças',
    'Imóveis',
    'Impostos',
    'Investimentos',
    'Lazer',
    'Moradia',
    'Pessoas',
    'Saúde',
    'Seguros',
    'Tecnologia',
    'Transporte',
  ];

  // Categorias pré-definidas de receita, também reutilizadas no formulário
  const categoriasReceita = ['Freelance', 'Investimentos', 'Outros', 'Salário'];

  // -----------------------------------------------------------------------
  // Fonte única de verdade da aplicação: todas as transações (receitas e
  // despesas) ficam guardadas aqui. Saldo Atual, Receitas, Despesas e o
  // gasto de cada categoria são todos CALCULADOS a partir deste vetor mais
  // abaixo — por isso, quando um lançamento é adicionado, o dashboard
  // inteiro se atualiza sozinho.
  // -----------------------------------------------------------------------
  const [transacoes, setTransacoes] = useState([
    { id: '1', descricao: 'Salário', valor: 6200.0, tipo: 'receita', categoria: 'Salário', formaPagamento: 'Transferência', data: '01/09' },
    { id: '2', descricao: 'Freelance', valor: 500.0, tipo: 'receita', categoria: 'Freelance', formaPagamento: 'Pix', data: '10/09' },
    { id: '3', descricao: 'Supermercado', valor: 320.0, tipo: 'despesa', categoria: 'Alimentação', formaPagamento: 'Cartão de Débito', data: '03/09' },
    { id: '4', descricao: 'Uber', valor: 45.5, tipo: 'despesa', categoria: 'Transporte', formaPagamento: 'Cartão de Crédito', data: '05/09' },
    { id: '5', descricao: 'Cinema', valor: 60.0, tipo: 'despesa', categoria: 'Lazer', formaPagamento: 'Dinheiro', data: '07/09' },
    { id: '6', descricao: 'Farmácia', valor: 90.0, tipo: 'despesa', categoria: 'Saúde', formaPagamento: 'Cartão de Débito', data: '09/09' },
  ]);

  // Adiciona um novo lançamento à lista central de transações.
  // Esta função é passada como prop para ListaGastos.js (aoAdicionarTransacao),
  // que a chama depois de validar o formulário de "Novo Lançamento".
  const adicionarTransacao = (dadosNovaTransacao) => {
    const novaTransacao = {
      id: String(Date.now()), // usa o horário atual como um id "único o bastante"
      data: formatarDataAtual(), // marca a data de hoje no lançamento
      ...dadosNovaTransacao, // espalha descricao, valor, tipo, categoria e formaPagamento
    };
    // Coloca a nova transação no início da lista, mantendo as antigas
    setTransacoes((atual) => [novaTransacao, ...atual]);
  };

  // Receitas: filtra só as transações do tipo 'receita' e soma os valores com reduce
  const receitas = transacoes
    .filter((transacao) => transacao.tipo === 'receita')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  // Despesas: filtra só as transações do tipo 'despesa' e soma os valores com reduce
  const despesas = transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  // Saldo Atual é sempre Receitas menos Despesas
  const saldoAtual = receitas - despesas;

  // Para cada categoria orçada, calcula quanto já foi gasto: filtra as
  // transações de despesa daquela categoria e soma os valores.
  // O resultado (categoriasComGasto) é passado para o componente Categorias.
  const categoriasComGasto = categoriasOrcamento.map((categoria) => {
    const gastoCategoria = transacoes
      .filter((transacao) => transacao.tipo === 'despesa' && transacao.categoria === categoria.nome)
      .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);
    return { ...categoria, gasto: gastoCategoria }; // categoria original + o gasto calculado
  });

  return (
    // PaperProvider precisa envolver todo o app para os componentes do
    // react-native-paper (Card, Button, Text, etc.) funcionarem corretamente
    <PaperProvider>
      {/* [Critério 1]: Montagem do componente Appbar no topo da aplicação */}
      <Appbar titulo={`Olá, ${usuario}`} subtitulo="Bem-vinda de volta ao Savvr" />

      {/* ScrollView permite rolar a tela quando o conteúdo não cabe inteiro */}
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        {/* Card de destaque do Saldo Atual (fundo roxo) */}
        <View style={styles.linhaResumo}>
          <Card style={[styles.cardResumo, styles.cardSaldo]}>
            <Card.Content>
              <Text style={styles.rotuloResumoClaro}>Saldo Atual</Text>
              <Text style={styles.valorSaldo}>R$ {saldoAtual.toFixed(2)}</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Dois cards lado a lado: Receitas (verde) e Despesas (vermelho) */}
        <View style={styles.linhaResumo}>
          <Card style={[styles.cardResumo, styles.cardMetade]}>
            <Card.Content>
              <Text style={styles.rotuloResumo}>Receitas</Text>
              <Text style={styles.valorReceita}>R$ {receitas.toFixed(2)}</Text>
            </Card.Content>
          </Card>
          <Card style={[styles.cardResumo, styles.cardMetade]}>
            <Card.Content>
              <Text style={styles.rotuloResumo}>Despesas</Text>
              <Text style={styles.valorDespesa}>R$ {despesas.toFixed(2)}</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Card "Saldo das Contas": lista cada conta com map() */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.titulo}>
              Saldo das Contas
            </Text>
            {contas.map((conta) => (
              <View key={conta.id} style={styles.linhaConta}>
                <Text>{conta.nome}</Text>
                <Text style={styles.valorConta}>R$ {conta.saldo.toFixed(2)}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* [Critério 1]: Montagem do componente Categorias (função anônima) */}
        <Categorias categorias={categoriasComGasto} />

        {/* [Critério 1]: Montagem do componente LimiteDiario (arrow function) */}
        <LimiteDiario saldoAtual={saldoAtual} transacoes={transacoes} diasRestantesMes={20} />

        {/* [Critério 1]: Montagem do componente Historico (componente de classe) */}
        <Historico transacoes={transacoes} />

        {/* [Critério 2]: Montagem do componente ListaGastos, com busca, filter() e
            formulário para adicionar receitas/despesas por categoria pré-definida.
            Repare que passamos 'adicionarTransacao' como prop: é assim que
            ListaGastos.js consegue atualizar os dados aqui em App.js. */}
        <ListaGastos
          transacoes={transacoes}
          categoriasDespesa={categoriasDespesa}
          categoriasReceita={categoriasReceita}
          aoAdicionarTransacao={adicionarTransacao}
        />

        {/* [Critério 3]: Montagem do componente FormularioGastos, com cálculo e try/catch */}
        <FormularioGastos />

        {/* Espaço em branco no final, só para não colar o último card na borda da tela */}
        <View style={{ height: 24 }} />
      </ScrollView>
    </PaperProvider>
  );
}

// Estilos visuais usados nesta tela
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F3FA' },
  conteudo: { paddingBottom: 24 },
  linhaResumo: { flexDirection: 'row', paddingHorizontal: 8, marginTop: 12 },
  cardResumo: { flex: 1, margin: 4, borderRadius: 12, elevation: 2 },
  cardMetade: { flex: 1 },
  cardSaldo: { backgroundColor: '#4B2E83' },
  rotuloResumo: { color: '#555', marginBottom: 4 },
  rotuloResumoClaro: { color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  valorSaldo: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  valorReceita: { color: '#2E7D32', fontSize: 18, fontWeight: 'bold' },
  valorDespesa: { color: '#D32F2F', fontSize: 18, fontWeight: 'bold' },
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 10, fontWeight: 'bold' },
  linhaConta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  valorConta: { fontWeight: 'bold', color: '#4B2E83' },
});
