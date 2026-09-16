import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, TextInput, Button, HelperText} from 'react-native-paper';
import styles from '../assets/styles'
import { formasPagamento } from '../listagem/Constants';
import Bloquinhos from '../diversos/utils/Bloquinhos'
import calcularTetoDiario from '../diversos/utils/Calculos'


const FormularioGastos = ({
  categoriasDespesa,
  categoriasReceita,
  aoAdicionarTransacao,
  saldoAtual,
  diasRestantesMes,
}) => {


  const [novoTipo, setNovoTipo] = useState('despesa');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoValor, setNovoValor] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaFormaPagamento, setNovaFormaPagamento] = useState('');
  const [erroForm, setErroForm] = useState('');

  const categoriasDisponiveis =
    novoTipo === 'despesa'
      ? categoriasDespesa
      : categoriasReceita;

  const escolherTipo = (tipo) => {
    setNovoTipo(tipo);
    setNovaCategoria('');
  };

  // [Critério 3]: Cálculo com fórmula significativa, feito aqui dentro do
  // próprio formulário.
  // A cada valor digitado, é simulado como ficaria o "teto seguro de gastos
  // por dia" (mesma fórmula do LimiteDiario.js: saldo disponível / dias
  // restantes no mês) SE esse lançamento fosse confirmado agora.
  let tetoSimulado = null;
  let erroTetoSimulado = '';

  // Só calcula se o usuário já digitou algo no campo Valor
  if (novoValor.trim() !== '') {
    try {
      const valorDigitado = Number(novoValor.replace(',', '.'));

      if (Number.isNaN(valorDigitado) || valorDigitado <= 0) {
        throw new Error('Informe um valor numérico maior que zero.');
      }

      // Simula o saldo após confirmar este lançamento. Soma se for receita, subtrai se for despesa
      const saldoSimulado =
        novoTipo === 'receita'
          ? saldoAtual + valorDigitado
          : saldoAtual - valorDigitado;

      //A mesma fórmula usada em LimiteDiario.js
      tetoSimulado = calcularTetoDiario(saldoSimulado, diasRestantesMes);
    } catch (erro) {
      // [Critério 3]: erro do cálculo tratado com try...catch
      erroTetoSimulado = erro.message;
    }
  }

  const adicionarLancamento = () => {
    setErroForm('');

    // tratamento de erros
    try {
      if (novaDescricao.trim() === '') {
        throw new Error(
          'Informe uma descrição para o lançamento.'
        );
      }

      const valorNum = Number(
        novoValor.replace(',', '.')
      );

      if (
        Number.isNaN(valorNum) ||
        valorNum <= 0
      ) {
        throw new Error(
          'Informe um valor numérico maior que zero.'
        );
      }

      if (novaCategoria === '') {
        throw new Error(
          'Selecione uma categoria.'
        );
      }

      aoAdicionarTransacao({
        descricao: novaDescricao.trim(),
        valor: valorNum,
        tipo: novoTipo,
        categoria: novaCategoria,
        formaPagamento:
          novaFormaPagamento === ''
            ? 'Não informado'
            : novaFormaPagamento,
      });

      // Limpa o formulário após o sucesso
      setNovaDescricao('');
      setNovoValor('');
      setNovaCategoria('');
      setNovaFormaPagamento('');

    } catch (error) {

      // [Critério 3]: mensagem do erro exibida na tela
      setErroForm(error.message);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>

        <Text variant="titleMedium" style={styles.titulo}>Novo Lançamento</Text>
        <View style={styles.linhaTipo}>
          <Button
            compact
            mode={
              novoTipo === 'despesa'
                ? 'contained'
                : 'outlined'
            }
            onPress={() =>
              escolherTipo('despesa')
            }
            style={styles.botaoTipo}
          >Despesa</Button>

          <Button
            compact
            mode={
              novoTipo === 'receita'
                ? 'contained'
                : 'outlined'
            }
            onPress={() =>
              escolherTipo('receita')
            }
            style={styles.botaoTipo}
          >Receita</Button>

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

        {/* [Critério 3]: resultado do cálculo do teto diário simulado,
            atualizado conforme o usuário digita o valor */}
        {novoValor.trim() !== '' && (
          tetoSimulado !== null ? (
            <Text style={styles.calculo}>
              Você pode gastar até R$ {tetoSimulado.toFixed(2)} hoje
            </Text>
          ) : (
            <HelperText type="error" visible={erroTetoSimulado !== ''}>
              {erroTetoSimulado}
            </HelperText>
          )
        )}

        <Text style={styles.rotuloCategoria}>Categoria</Text>
        <Bloquinhos
          opcoes={categoriasDisponiveis}
          valorSelecionado={novaCategoria}
          aoSelecionar={setNovaCategoria}
        />
        <Text style={styles.rotuloCategoria}>
          Forma de pagamento (opcional)
        </Text>
        <Bloquinhos
          opcoes={formasPagamento}
          valorSelecionado={novaFormaPagamento}
          aoSelecionar={setNovaFormaPagamento}
        />
        <HelperText
          type="error"
          visible={erroForm !== ''}
        >
          {erroForm}
        </HelperText>

        {/* Botão */}
        <Button
          mode="contained"
          onPress={adicionarLancamento}
          style={styles.botaoAdicionar}
        >
          Adicionar{' '}
          {novoTipo === 'despesa'
            ? 'Despesa'
            : 'Receita'}
        </Button>

      </Card.Content>
    </Card>
  );
};

export default FormularioGastos;