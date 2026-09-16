import React from 'react';
import { Appbar as PaperAppbar } from 'react-native-paper';

//arrow function
const Appbar = ({ titulo }) => {
  return (
    <PaperAppbar.Header style={{ backgroundColor: '#4B2E83' }}>
      <PaperAppbar.Content
        title={titulo}
        titleStyle={{ fontWeight: 'bold' }}
      />
    </PaperAppbar.Header>
  );
};

export default Appbar;
