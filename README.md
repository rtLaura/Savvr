# Savvr — Gerenciador de Gastos / Finanças Pessoais

Aplicativo mobile em **React Native** (com **React Native Paper**) para controle de
finanças pessoais, com dashboard inspirado em interfaces de apps financeiros
("Olá, Mariana", saldo atual, receitas, despesas, saldo das contas e orçamentos
por categoria).

## 🧰 Tecnologias

- React Native + Expo
- React Native Paper (componentes de UI: Card, Appbar, List, ProgressBar, etc.)
- JavaScript / JSX

## ▶️ Como executar

Pré-requisitos: Node.js instalado e o app **Expo Go** no celular Android
(ou um emulador Android configurado).

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar o projeto
npm start

# 3. No terminal/navegador do Expo, escolha "Run on Android device/emulator"
#    ou escaneie o QR code com o app Expo Go
```

## 📁 Estrutura de pastas

```
Savvr/
├── assets/
├── diversos/
│   ├── Appbar.js
│   ├── Categorias.js
│   ├── Historico.js
│   └── LimiteDiario.js
├── formulario/
│   └── FormularioGastos.js
├── listagem/
│   └── ListaGastos.js
├── App.js
├── package.json
└── README.md
```

## ✅ Mapeamento dos critérios de avaliação

### Critério 1 — Organização e Funcionamento Geral (1,5 pt)
- Estrutura de pastas segue exatamente o modelo solicitado (`diversos/`, `formulario/`,
  `listagem/`).
- Todos os componentes são importados e montados em `App.js`, que centraliza o
  dashboard "Olá, Mariana" (Saldo Atual, Receitas, Despesas, Saldo das Contas e
  Orçamentos por Categoria).
- Comentários `// [Critério 1]: ...` marcam os pontos de importação/montagem em `App.js`.

### Critério 2 — Listagem com filtro usando `filter()` (2,0 pts)
- Arquivo: `listagem/ListaGastos.js`.
- Vetor `gastos` com 8 objetos, cada um com 4 atributos: `nome`, `valor`, `tipo`,
  `formaPagamento`.
- Campo `Searchbar` + botão **"Filtrar"** que aplica `.filter()` sobre o vetor,
  buscando por nome, tipo ou forma de pagamento.
- Comentários `// [Critério 2]: ...` indicam o uso do `filter()` e o botão acionável.

### Critério 3 — Formulário com cálculo e tratamento de erros (2,0 pts)
- Arquivo: `formulario/FormularioGastos.js`.
- Três entradas do usuário: Renda Mensal, Despesas Previstas e Taxa de Reserva (%).
- Cálculo financeiro: **Saldo Final Livre** = Renda − Despesas − Reserva(%), e
  **Teto Seguro de Gasto Diário** = Saldo Final Livre ÷ 30.
- Bloco `try...catch` trata: campos vazios, valores não numéricos, valores
  negativos e taxa de reserva acima de 100%.
- Comentários `// [Critério 3]: ...` marcam cada validação.

### Critério 4 — Componentes na pasta `diversos/` (3,0 pts)
| Arquivo | Tipo de declaração | Funções de array usadas |
|---|---|---|
| `diversos/Appbar.js` | Arrow function | — |
| `diversos/Categorias.js` | Função anônima (`const Categorias = function(props) {...}`) | `.reduce()` (soma orçamentos/gastos) e `.map()` (renderiza cards de categoria) |
| `diversos/Historico.js` | Componente de classe (`class Historico extends React.Component`) | `.filter()` (filtra por receita/despesa) e `.map()` (renderiza itens do histórico) |
| `diversos/LimiteDiario.js` | Arrow function | `.filter()` (seleciona despesas) e `.reduce()` (soma total de despesas) |

Todos os usos de `.map()`, `.filter()` e `.reduce()` estão comentados com
`// [Critério 4]: ...` diretamente acima da linha de código correspondente.

## 👩‍🎓 Autor
Trabalho escolar — Gerenciador de Gastos "Savvr".
