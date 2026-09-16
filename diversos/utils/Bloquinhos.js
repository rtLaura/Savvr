import React from 'react';
import { ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import styles from '../../assets/styles'

const Bloquinhos = ({ opcoes, valorSelecionado, aoSelecionar }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scrollChips}
    contentContainerStyle={styles.linhaChips}
  >
    {opcoes.map((opcao) => (
      <Chip
        key={opcao}
        selected={valorSelecionado === opcao}
        onPress={() => aoSelecionar(valorSelecionado === opcao ? '' : opcao)}
        style={styles.chip}
        mode={valorSelecionado === opcao ? 'flat' : 'outlined'}
      >{opcao}</Chip>
    ))}
  </ScrollView>
);

export default Bloquinhos;