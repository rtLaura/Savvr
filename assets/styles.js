import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#F5F3FA' 
    },

  conteudo: { 
    paddingBottom: 24
    },

  linhaResumo: { 
    flexDirection: 'row', 
    paddingHorizontal: 8, 
    marginTop: 12 
    },

  cardResumo: { 
    flex: 1, 
    margin: 4,
    borderRadius: 12, 
    elevation: 2 
    },
  
    cardMetade: { 
    flex: 1 
},
  
  cardSaldo: { 
    backgroundColor: '#4B2E83' 
},
  
  rotuloResumo: { 
    color: '#555',
    marginBottom: 4 },
  
  rotuloResumoClaro: { 
    color: 'rgba(255,255,255,0.8)', 
    marginBottom: 4 
},
 
  valorSaldo: { 
    color: '#fff', 
    fontSize: 26, 
    fontWeight: 'bold' 
},
  
  valorReceita: { 
    color: '#2E7D32', 
    fontSize: 18, 
    fontWeight: 'bold' 
},
  
  valorDespesa: { 
    color: '#D32F2F', 
    fontSize: 18, 
    fontWeight: 'bold' 
},

  card: { 
    margin: 12, 
    borderRadius: 12, 
    elevation: 2 
  },
  titulo: { 
    marginBottom: 10, 
    fontWeight: 'bold' 
},

  linhaConta: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 6
},

  valorConta: { 
    fontWeight: 'bold', 
    color: '#4B2E83'
},

  linhaTipo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
},

  botaoTipo: {
    flex: 1,
    marginHorizontal: 2,
},

  input: {
    marginBottom: 10,
},

  calculo: {
    marginBottom: 12,
    color: '#4B2E83',
    fontWeight: 'bold',
},

  rotuloCategoria: {
    marginBottom: 6,
    color: '#555',
},

  linhaChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
},

  chip: {
    marginRight: 6,
    marginBottom: 6,
},

  botaoAdicionar: {
    marginTop: 4,
},

  linhaFiltros: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 
},

  botaoFiltro: { 
    flex: 1, 
    marginHorizontal: 2 
},

  receita: { 
    color: '#2E7D32', 
    fontWeight: 'bold', 
    alignSelf: 'center' 
}, 
    
  despesa: { 
    color: '#D32F2F', 
    fontWeight: 'bold', 
    alignSelf: 'center' 
}, 
});

export default styles;