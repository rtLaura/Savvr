import React from 'react';
import { Appbar as PaperAppbar } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando ARROW FUNCTION
// const Appbar = (...) => { ... }
// =====================================================================
const Appbar = ({ titulo, subtitulo }) => {
  return (
    <PaperAppbar.Header style={{ backgroundColor: '#4B2E83' }}>
      <PaperAppbar.Content
        title={titulo}
        subtitle={subtitulo}
        titleStyle={{ fontWeight: 'bold' }}
        subtitleStyle={{ color: '#E4DDF5' }}
      />
      <PaperAppbar.Action icon="bell-outline" color="#fff" onPress={() => {}} />
      <PaperAppbar.Action icon="account-circle-outline" color="#fff" onPress={() => {}} />
    </PaperAppbar.Header>
  );
};

export default Appbar;
