import React from 'react';
// Importa o Appbar do react-native-paper, renomeando para PaperAppbar
// (assim não conflita com o nome do nosso próprio componente "Appbar" abaixo)
import { Appbar as PaperAppbar } from 'react-native-paper';

// =====================================================================
// [Critério 4]: Componente criado utilizando ARROW FUNCTION
// const Appbar = (...) => { ... }
// Este é o topo do app: mostra a saudação ("Olá, Mariana") e dois ícones.
// =====================================================================
const Appbar = ({ titulo, subtitulo }) => {
  // 'titulo' e 'subtitulo' chegam como props do App.js (ex: "Olá, Mariana")
  return (
    // Appbar.Header é a barra roxa fixa no topo da tela
    <PaperAppbar.Header style={{ backgroundColor: '#4B2E83' }}>
      {/* Appbar.Content mostra o título e o subtítulo dentro da barra */}
      <PaperAppbar.Content
        title={titulo}
        subtitle={subtitulo}
        titleStyle={{ fontWeight: 'bold' }}
        subtitleStyle={{ color: '#E4DDF5' }}
      />
      {/* Ícone de sino (notificações) — apenas visual, não faz nada ao tocar */}
      <PaperAppbar.Action icon="bell-outline" color="#fff" onPress={() => {}} />
      {/* Ícone de perfil do usuário — apenas visual, não faz nada ao tocar */}
      <PaperAppbar.Action icon="account-circle-outline" color="#fff" onPress={() => {}} />
    </PaperAppbar.Header>
  );
};

export default Appbar;
