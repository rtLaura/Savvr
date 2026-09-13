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

// Gera a data de hoje no formato dd/mm, usada ao adicionar um novo lançamento
const formatarDataAtual = () => {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}`;
};

export default function App() {
  // Dados centrais da aplicação, compartilhados entre os componentes do dashboard
  const [usuario] = useState('Mariana');

  const [contas] = useState([
    { id: '1', nome: 'Conta Corrente', saldo: 3200.0 },
    { id: '2', nome: 'Poupança', saldo: 1200.5 },
    { id: '3', nome: 'Carteira', saldo: 420.0 },
  ]);

  // Categorias pré-definidas de despesa, cada uma com um orçamento mensal.
  // São as mesmas categorias reutilizadas no formulário de "Novo Lançamento"
  // em listagem/ListaGastos.js.
  const [categoriasDespesa] = useState([
    { id: '1', nome: 'Alimentação', orcamento: 800 },
    { id: '2', nome: 'Transporte', orcamento: 300 },
    { id: '3', nome: 'Lazer', orcamento: 400 },
    { id: '4', nome: 'Saúde', orcamento: 250 },
  ]);

  // Categorias pré-definidas de receita, também reutilizadas no formulário
  const categoriasReceita = ['Salário', 'Freelance', 'Investimentos', 'Outros'];

  // Fonte única de verdade: todos os lançamentos (receitas e despesas).
  // Saldo, Receitas, Despesas e o gasto de cada categoria são derivados
  // deste vetor sempre que ele muda (ex: quando o usuário adiciona um novo
  // lançamento em ListaGastos.js).
  const [transacoes, setTransacoes] = useState([
    { id: '1', descricao: 'Salário', valor: 6200.0, tipo: 'receita', categoria: 'Salário', formaPagamento: 'Transferência', data: '01/09' },
    { id: '2', descricao: 'Freelance', valor: 500.0, tipo: 'receita', categoria: 'Freelance', formaPagamento: 'Pix', data: '10/09' },
    { id: '3', descricao: 'Supermercado', valor: 320.0, tipo: 'despesa', categoria: 'Alimentação', formaPagamento: 'Cartão de Débito', data: '03/09' },
    { id: '4', descricao: 'Uber', valor: 45.5, tipo: 'despesa', categoria: 'Transporte', formaPagamento: 'Cartão de Crédito', data: '05/09' },
    { id: '5', descricao: 'Cinema', valor: 60.0, tipo: 'despesa', categoria: 'Lazer', formaPagamento: 'Dinheiro', data: '07/09' },
    { id: '6', descricao: 'Farmácia', valor: 90.0, tipo: 'despesa', categoria: 'Saúde', formaPagamento: 'Cartão de Débito', data: '09/09' },
  ]);

  // Adiciona um novo lançamento (receita ou despesa) à lista central.
  // É passada como prop para ListaGastos.js, que chama esta função após
  // validar o formulário de "Novo Lançamento".
  const adicionarTransacao = (dadosNovaTransacao) => {
    const novaTransacao = {
      id: String(Date.now()),
      data: formatarDataAtual(),
      ...dadosNovaTransacao,
    };
    setTransacoes((atual) => [novaTransacao, ...atual]);
  };

  // Receitas: soma de todas as transações do tipo 'receita'
  const receitas = transacoes
    .filter((transacao) => transacao.tipo === 'receita')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  // Despesas: soma de todas as transações do tipo 'despesa'
  const despesas = transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

  const saldoAtual = receitas - despesas;

  // Para cada categoria de despesa pré-definida, calcula quanto já foi
  // gasto somando as transações daquela categoria
  const categoriasComGasto = categoriasDespesa.map((categoria) => {
    const gastoCategoria = transacoes
      .filter((transacao) => transacao.tipo === 'despesa' && transacao.categoria === categoria.nome)
      .reduce((acumulador, transacao) => acumulador + transacao.valor, 0);
    return { ...categoria, gasto: gastoCategoria };
  });

  return (
    <PaperProvider>
      {/* [Critério 1]: Montagem do componente Appbar no topo da aplicação */}
      <Appbar titulo={`Olá, ${usuario}`} subtitulo="Bem-vinda de volta ao Savvr" />

      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
        {/* Card de destaque do Saldo Atual */}
        <View style={styles.linhaResumo}>
          <Card style={[styles.cardResumo, styles.cardSaldo]}>
            <Card.Content>
              <Text style={styles.rotuloResumoClaro}>Saldo Atual</Text>
              <Text style={styles.valorSaldo}>R$ {saldoAtual.toFixed(2)}</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Cards de Receitas e Despesas */}
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

        {/* Saldo das Contas */}
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
            formulário para adicionar receitas/despesas por categoria pré-definida */}
        <ListaGastos
          transacoes={transacoes}
          categoriasDespesa={categoriasDespesa}
          categoriasReceita={categoriasReceita}
          aoAdicionarTransacao={adicionarTransacao}
        />

        {/* [Critério 3]: Montagem do componente FormularioGastos, com cálculo e try/catch */}
        <FormularioGastos />

        <View style={{ height: 24 }} />
      </ScrollView>
    </PaperProvider>
  );
}

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
