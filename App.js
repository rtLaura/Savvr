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

export default function App() {
  // Dados centrais da aplicação, compartilhados entre os componentes do dashboard
  const [usuario] = useState('Mariana');
  const [saldoAtual] = useState(4820.5);
  const [receitas] = useState(6700.0);
  const [despesas] = useState(1379.5);

  const [contas] = useState([
    { id: '1', nome: 'Conta Corrente', saldo: 3200.0 },
    { id: '2', nome: 'Poupança', saldo: 1200.5 },
    { id: '3', nome: 'Carteira', saldo: 420.0 },
  ]);

  const [categorias] = useState([
    { id: '1', nome: 'Alimentação', orcamento: 800, gasto: 620 },
    { id: '2', nome: 'Transporte', orcamento: 300, gasto: 180 },
    { id: '3', nome: 'Lazer', orcamento: 400, gasto: 250 },
    { id: '4', nome: 'Saúde', orcamento: 250, gasto: 90 },
  ]);

  const [transacoes] = useState([
    { id: '1', descricao: 'Salário', valor: 6200.0, tipo: 'receita', data: '01/09' },
    { id: '2', descricao: 'Freelance', valor: 500.0, tipo: 'receita', data: '10/09' },
    { id: '3', descricao: 'Supermercado', valor: 320.0, tipo: 'despesa', data: '03/09' },
    { id: '4', descricao: 'Uber', valor: 45.5, tipo: 'despesa', data: '05/09' },
    { id: '5', descricao: 'Cinema', valor: 60.0, tipo: 'despesa', data: '07/09' },
    { id: '6', descricao: 'Farmácia', valor: 90.0, tipo: 'despesa', data: '09/09' },
  ]);

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
        <Categorias categorias={categorias} />

        {/* [Critério 1]: Montagem do componente LimiteDiario (arrow function) */}
        <LimiteDiario saldoAtual={saldoAtual} transacoes={transacoes} diasRestantesMes={20} />

        {/* [Critério 1]: Montagem do componente Historico (componente de classe) */}
        <Historico transacoes={transacoes} />

        {/* [Critério 2]: Montagem do componente ListaGastos, com busca e filter() */}
        <ListaGastos />

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
