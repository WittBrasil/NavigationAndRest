const OMDB_URL = 'https://www.omdbapi.com/';
const API_KEY = '1cd66749';

export const buscarFilmes = async (termo) => {
  try {
    const response = await fetch(
      `${OMDB_URL}?s=${termo}&apikey=${API_KEY}`
    );
    const dados = await response.json();
    
    if (dados.Response === 'True') {
      return dados.Search;
    } else {
      throw new Error('Nenhum filme encontrado');
    }
  } catch (erro) {
    console.error('Erro ao buscar filmes:', erro);
    throw erro;
  }
};

export const obterDetalhesFilme = async (imdbID) => {
  try {
    const response = await fetch(
      `${OMDB_URL}?i=${imdbID}&apikey=${API_KEY}`
    );
    const dados = await response.json();
    return dados;
  } catch (erro) {
    console.error('Erro ao buscar detalhes:', erro);
    throw erro;
  }
};
