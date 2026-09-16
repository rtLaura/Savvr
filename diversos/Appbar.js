import React from 'react';
import { Appbar as PaperAppbar } from 'react-native-paper';

//[Critério 4]: arrow function
const Appbar = ({ titulo, subtitulo }) => {
  return (
    <PaperAppbar.Header style={{ backgroundColor: '#4B2E83' }}>
      <PaperAppbar.Content
        title={titulo}
        subtitle={subtitulo}
        titleStyle={{ fontWeight: 'bold' }}
      />
    </PaperAppbar.Header>
  );
};

export default Appbar;
