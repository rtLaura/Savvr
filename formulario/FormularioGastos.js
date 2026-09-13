import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, TextInput, Button, HelperText } from 'react-native-paper';

// =====================================================================
// [Critério 3]: Formulário com cálculo financeiro e tratamento de erros
// =====================================================================
const FormularioGastos = () => {
  const [renda, setRenda] = useState('');
  const [despesasPrevistas, setDespesasPrevistas] = useState('');
  const [taxaReserva, setTaxaReserva] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const calcular = () => {
    setErro('');
    setResultado(null);

    // [Critério 3]: Uso OBRIGATÓRIO do bloco try...catch para tratar erros de entrada
    try {
      if (renda.trim() === '' || despesasPrevistas.trim() === '' || taxaReserva.trim() === '') {
        throw new Error('Preencha todos os campos antes de calcular.');
      }

      const rendaNum = Number(renda.replace(',', '.'));
      const despesasNum = Number(despesasPrevistas.replace(',', '.'));
      const taxaNum = Number(taxaReserva.replace(',', '.'));

      // Trata entradas não numéricas
      if (Number.isNaN(rendaNum) || Number.isNaN(despesasNum) || Number.isNaN(taxaNum)) {
        throw new Error('Os valores informados devem ser numéricos.');
      }

      // Trata valores negativos
      if (rendaNum < 0 || despesasNum < 0 || taxaNum < 0) {
        throw new Error('Não são permitidos valores negativos.');
      }

      // Trata taxa de reserva acima de 100%
      if (taxaNum > 100) {
        throw new Error('A taxa de reserva não pode ser maior que 100%.');
      }

      // ------------------------------------------------------------------
      // Fórmula financeira: Saldo Final Livre e Teto Seguro de Gasto Diário
      // Saldo Final Livre = Renda - Despesas Previstas - Reserva(%)
      // ------------------------------------------------------------------
      const valorReserva = rendaNum * (taxaNum / 100);
      const saldoFinalLivre = rendaNum - despesasNum - valorReserva;
      const tetoSeguroDiario = saldoFinalLivre / 30; // considerando mês de 30 dias

      setResultado({
        saldoFinalLivre,
        tetoSeguroDiario,
        valorReserva,
      });
    } catch (error) {
      // [Critério 3]: Erro capturado e exibido de forma amigável para o usuário
      setErro(error.message);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.titulo}>
          Simulador de Orçamento Mensal
        </Text>

        <TextInput
          label="Renda mensal (R$)"
          value={renda}
          onChangeText={setRenda}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Despesas previstas (R$)"
          value={despesasPrevistas}
          onChangeText={setDespesasPrevistas}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Taxa de reserva (%)"
          value={taxaReserva}
          onChangeText={setTaxaReserva}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <HelperText type="error" visible={erro !== ''}>
          {erro}
        </HelperText>

        <Button mode="contained" onPress={calcular} style={styles.botao}>
          Calcular
        </Button>

        {resultado && (
          <Card style={styles.resultadoCard}>
            <Card.Content>
              <Text>Reserva separada: R$ {resultado.valorReserva.toFixed(2)}</Text>
              <Text>Saldo Final Livre: R$ {resultado.saldoFinalLivre.toFixed(2)}</Text>
              <Text style={styles.destaque}>
                Teto Seguro de Gasto Diário: R$ {resultado.tetoSeguroDiario.toFixed(2)}
              </Text>
            </Card.Content>
          </Card>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 12, fontWeight: 'bold' },
  input: { marginBottom: 10 },
  botao: { marginTop: 4 },
  resultadoCard: { marginTop: 14, backgroundColor: '#F1EDFB' },
  destaque: { fontWeight: 'bold', color: '#4B2E83', marginTop: 4 },
});

export default FormularioGastos;
