import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Provider as PaperProvider, Card, Text } from 'react-native-paper';
import formatarDataAtual from '../diversos/utils/FormatarData'


export const usuario = 'Mariana';

export const contas = [
  { id: '1', nome: 'Conta Corrente', saldo: 3200.0 },
  { id: '2', nome: 'Poupança', saldo: 1200.5 },
  { id: '3', nome: 'Carteira', saldo: 420.0 },
];

export const categoriasOrcamento = [
  { id: '1', nome: 'Alimentação', orcamento: 800 },
  { id: '2', nome: 'Transporte', orcamento: 300 },
  { id: '3', nome: 'Lazer', orcamento: 400 },
  { id: '4', nome: 'Saúde', orcamento: 250 },
];

export const categoriasDespesa = [
  'Alimentação',
  'Animais',
  'Educação',
  'Estética',
  'Finanças',
  'Imóveis',
  'Impostos',
  'Investimentos',
  'Lazer',
  'Moradia',
  'Pessoas',
  'Saúde',
  'Seguros',
  'Tecnologia',
  'Transporte',
];

export const categoriasReceita = [
  'Freelance',
  'Investimentos',
  'Outros',
  'Salário',
]

export const transacoes = [
    { id: '1', descricao: 'Salário', valor: 6200.0, tipo: 'receita', categoria: 'Salário', formaPagamento: 'Transferência', data: '01/09' },
    { id: '2', descricao: 'Freelance', valor: 500.0, tipo: 'receita', categoria: 'Freelance', formaPagamento: 'Pix', data: '10/09' },
    { id: '3', descricao: 'Supermercado', valor: 320.0, tipo: 'despesa', categoria: 'Alimentação', formaPagamento: 'Cartão de Débito', data: '03/09' },
    { id: '4', descricao: 'Uber', valor: 45.5, tipo: 'despesa', categoria: 'Transporte', formaPagamento: 'Cartão de Crédito', data: '05/09' },
    { id: '5', descricao: 'Cinema', valor: 60.0, tipo: 'despesa', categoria: 'Lazer', formaPagamento: 'Dinheiro', data: '07/09' },
    { id: '6', descricao: 'Farmácia', valor: 90.0, tipo: 'despesa', categoria: 'Saúde', formaPagamento: 'Cartão de Débito', data: '09/09' },
  ];

export const formasPagamento = [
    'Boleto',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Dinheiro',
    'Pix',
    'Transferência',
  ];

