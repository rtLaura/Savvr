import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, TextInput, Button, HelperText } from 'react-native-paper';

// =====================================================================
// [Critério 3]: Formulário com cálculo financeiro e tratamento de erros
// Este componente simula um orçamento mensal: o usuário digita a renda,
// as despesas previstas e uma taxa de reserva, e o app calcula quanto
// sobra livre no mês e quanto dá pra gastar por dia com segurança.
// =====================================================================
const FormularioGastos = () => {
  // Cada TextInput do formulário guarda seu valor digitado como texto (string).
  // Convertemos para número só na hora de calcular, dentro do try/catch.
  const [renda, setRenda] = useState('');
  const [despesasPrevistas, setDespesasPrevistas] = useState('');
  const [taxaReserva, setTaxaReserva] = useState('');

  // 'resultado' guarda os números já calculados (ou null se ainda não calculou)
  const [resultado, setResultado] = useState(null);
  // 'erro' guarda a mensagem de erro a ser exibida (string vazia = sem erro)
  const [erro, setErro] = useState('');

  // Função chamada quando o usuário aperta o botão "Calcular"
  const calcular = () => {
    // Limpa erro e resultado anteriores antes de tentar calcular de novo
    setErro('');
    setResultado(null);

    // [Critério 3]: Uso OBRIGATÓRIO do bloco try...catch para tratar erros de entrada.
    // Qualquer "throw new Error(...)" dentro do try é capturado pelo catch,
    // que guarda a mensagem em 'erro' e é exibida na tela pelo HelperText.
    try {
      // 1) Verifica se algum campo foi deixado em branco
      if (renda.trim() === '' || despesasPrevistas.trim() === '' || taxaReserva.trim() === '') {
        throw new Error('Preencha todos os campos antes de calcular.');
      }

      // Converte o texto digitado em número. O replace troca vírgula por ponto,
      // assim funciona tanto "1500,50" quanto "1500.50".
      const rendaNum = Number(renda.replace(',', '.'));
      const despesasNum = Number(despesasPrevistas.replace(',', '.'));
      const taxaNum = Number(taxaReserva.replace(',', '.'));

      // 2) Verifica se a conversão deu certo (Number.isNaN detecta texto inválido, ex: "abc")
      if (Number.isNaN(rendaNum) || Number.isNaN(despesasNum) || Number.isNaN(taxaNum)) {
        throw new Error('Os valores informados devem ser numéricos.');
      }

      // 3) Verifica se algum valor é negativo (não faz sentido nesse contexto)
      if (rendaNum < 0 || despesasNum < 0 || taxaNum < 0) {
        throw new Error('Não são permitidos valores negativos.');
      }

      // 4) Verifica se a taxa de reserva passou de 100%, o que também não faz sentido
      if (taxaNum > 100) {
        throw new Error('A taxa de reserva não pode ser maior que 100%.');
      }

      // ------------------------------------------------------------------
      // Fórmula financeira: Saldo Final Livre e Teto Seguro de Gasto Diário
      // ------------------------------------------------------------------
      // valorReserva = quanto da renda vai ser guardado, de acordo com a taxa (%)
      const valorReserva = rendaNum * (taxaNum / 100);
      // saldoFinalLivre = o que sobra depois de tirar despesas e reserva da renda
      const saldoFinalLivre = rendaNum - despesasNum - valorReserva;
      // tetoSeguroDiario = o saldo livre dividido por 30 dias (um mês "padrão")
      const tetoSeguroDiario = saldoFinalLivre / 30;

      // Salva os três valores calculados no estado, para exibir na tela
      setResultado({
        saldoFinalLivre,
        tetoSeguroDiario,
        valorReserva,
      });
    } catch (error) {
      // [Critério 3]: Erro capturado e sua mensagem é guardada para ser mostrada ao usuário
      setErro(error.message);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* Título do card */}
        <Text variant="titleMedium" style={styles.titulo}>
          Simulador de Orçamento Mensal
        </Text>

        {/* Campo 1: renda mensal digitada pelo usuário */}
        <TextInput
          label="Renda mensal (R$)"
          value={renda}
          onChangeText={setRenda}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        {/* Campo 2: despesas previstas para o mês */}
        <TextInput
          label="Despesas previstas (R$)"
          value={despesasPrevistas}
          onChangeText={setDespesasPrevistas}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        {/* Campo 3: percentual da renda que o usuário quer guardar de reserva */}
        <TextInput
          label="Taxa de reserva (%)"
          value={taxaReserva}
          onChangeText={setTaxaReserva}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        {/* Mensagem de erro: só aparece quando 'erro' não está vazio */}
        <HelperText type="error" visible={erro !== ''}>
          {erro}
        </HelperText>

        {/* Botão que dispara o cálculo (chama a função 'calcular' definida acima) */}
        <Button mode="contained" onPress={calcular} style={styles.botao}>
          Calcular
        </Button>

        {/* Card de resultado: só aparece depois que 'resultado' deixa de ser null */}
        {resultado && (
          <Card style={styles.resultadoCard}>
            <Card.Content>
              {/* Cada Text abaixo tem uma cor escura definida explicitamente (styles.linhaResultado),
                  para garantir contraste com o fundo claro do card, independente do tema do app */}
              <Text style={styles.linhaResultado}>
                Reserva separada: R$ {resultado.valorReserva.toFixed(2)}
              </Text>
              <Text style={styles.linhaResultado}>
                Saldo Final Livre: R$ {resultado.saldoFinalLivre.toFixed(2)}
              </Text>
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

// Estilos visuais do componente (cores, espaçamentos, etc.)
const styles = StyleSheet.create({
  card: { margin: 12, borderRadius: 12, elevation: 2 },
  titulo: { marginBottom: 12, fontWeight: 'bold' },
  input: { marginBottom: 10 },
  botao: { marginTop: 4 },
  // Fundo lilás claro do card de resultado
  resultadoCard: { marginTop: 14, backgroundColor: '#EDE7F6', borderRadius: 8 },
  // Texto escuro para as linhas normais do resultado (bom contraste no fundo lilás claro)
  linhaResultado: { color: '#3A3550', marginBottom: 4, fontSize: 14 },
  // Texto em destaque (o teto seguro diário): roxo escuro, negrito e um pouco maior
  destaque: { fontWeight: 'bold', color: '#2E1F52', marginTop: 6, fontSize: 15 },
});

export default FormularioGastos;
