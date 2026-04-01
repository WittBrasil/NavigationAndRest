# 🎬 Buscador de Filmes

Um app React Native que busca e exibe informações de filmes usando a API OMDB.

## 📋 Requisitos da Atividade

✅ Consumir dados da API OMDB  
✅ Exibir lista de filmes na tela principal  
✅ Utilizar React Navigation para navegação entre telas  
✅ Usar React Native Paper para estilização dos componentes  

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o app
npm start
```

Escaneie o QR code com o app Expo no seu celular.

## 📱 Funcionalidades

- 🔍 **Buscar filmes** - Searchbar para pesquisar qualquer filme
- 🎬 **Lista de filmes** - Exibe grid com 10 filmes
- 👆 **Detalhes** - Clique em um filme para ver informações
- 🔄 **Pull-to-refresh** - Puxe a tela para atualizar

## 🛠️ Tecnologias

- React Native
- Expo
- React Navigation
- React Native Paper
- OMDB API

## 📂 Estrutura

```
src/
├── screens/
│   ├── HomeScreen.js      (Lista de filmes)
│   └── DetailsScreen.js   (Detalhes do filme)
├── services/
│   └── api.js             (Chamadas para OMDB)
└── navigation/
    └── RootNavigator.js   (Configuração de navegação)
```

## 🎓 Autora

Trabalho acadêmico - Atividade de React Native
