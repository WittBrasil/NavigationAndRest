import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Card, Searchbar, ActivityIndicator, Text } from 'react-native-paper';
import { buscarFilmes } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const filmesIniciaisSpiderMan = [
    {
      "Title": "Spider-Man: No Way Home",
      "Year": "2021",
      "imdbID": "tt10872600",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man",
      "Year": "2002",
      "imdbID": "tt0145487",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Homecoming",
      "Year": "2017",
      "imdbID": "tt2250912",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man 2",
      "Year": "2004",
      "imdbID": "tt0316654",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNGQ0YTQyYTgtNWI2YS00NTE2LWJmNDItNTFlMTUwNmFlZTM0XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Into the Spider-Verse",
      "Year": "2018",
      "imdbID": "tt4633694",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg"
    },
    {
      "Title": "The Amazing Spider-Man",
      "Year": "2012",
      "imdbID": "tt0948470",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man 3",
      "Year": "2007",
      "imdbID": "tt0413300",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BODE2NzNhMDctYjUzMC00Y2M1LWI2Y2EtODJkZTFjN2Y5ODlmXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Far from Home",
      "Year": "2019",
      "imdbID": "tt6320628",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzNhNTE0NWQtN2E1Ny00NjcwLTg1YTctMGY1NmMwODJmY2NmXkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "The Amazing Spider-Man 2",
      "Year": "2014",
      "imdbID": "tt1872181",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_SX300.jpg"
    },
    {
      "Title": "Spider-Man: Across the Spider-Verse",
      "Year": "2023",
      "imdbID": "tt9362722",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_SX300.jpg"
    }
  ];

  const [filmes, setFilmes] = useState(filmesIniciaisSpiderMan);
  const [busca, setBusca] = useState('spider man');
  const [carregando, setCarregando] = useState(false);
  const [refrescando, setRefrescando] = useState(false);
  const [erro, setErro] = useState(null);



  const carregarFilmes = async (termo) => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarFilmes(termo);
      setFilmes(dados || []);
    } catch (erro) {
      console.error('Erro ao carregar filmes:', erro);
      setErro('Erro ao buscar filmes!');
    } finally {
      setCarregando(false);
    }
  };

  const aoAtualizar = async () => {
    try {
      setRefrescando(true);
      await carregarFilmes(busca);
    } catch (erro) {
      console.error('Erro ao atualizar:', erro);
    } finally {
      setRefrescando(false);
    }
  };

  const irParaDetalhes = (filme) => {
    navigation.navigate('Detalhes', { 
      Title: filme.Title,
      Year: filme.Year,
      Type: filme.Type,
      Poster: filme.Poster
    });
  };

  const renderFilme = ({ item }) => (
    <Card 
      style={styles.card}
      onPress={() => irParaDetalhes(item)}
    >
      {item.Poster !== 'N/A' ? (
        <Card.Cover source={{ uri: item.Poster }} style={styles.poster} />
      ) : (
        <View style={styles.posterVazio}>
          <Text>Sem Imagem</Text>
        </View>
      )}
      <Card.Content>
        <Text variant="titleSmall" numberOfLines={2} style={styles.titulo}>
          {item.Title}
        </Text>
        <Text variant="bodySmall" style={styles.ano}>
          Ano: {item.Year}
        </Text>
        <Text variant="bodySmall" style={styles.tipo}>
          Tipo: {item.Type}
        </Text>
      </Card.Content>
    </Card>
  );

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar filmes..."
        onChangeText={setBusca}
        value={busca}
        onSubmitEditing={() => carregarFilmes(busca)}
        style={styles.searchbar}
      />

      {erro && <Text style={styles.erro}>{erro}</Text>}

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.imdbID}
        renderItem={renderFilme}
        numColumns={2}
        columnWrapperStyle={styles.coluna}
        contentContainerStyle={styles.lista}
        refreshControl={
          <RefreshControl refreshing={refrescando} onRefresh={aoAtualizar} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 10,
  },
  card: {
    margin: 8,
    flex: 1,
  },
  poster: {
    height: 200,
    backgroundColor: '#ddd',
  },
  posterVazio: {
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  ano: {
    marginTop: 5,
    color: '#666',
  },
  tipo: {
    marginTop: 3,
    color: '#999',
  },
  coluna: {
    justifyContent: 'space-between',
  },
  lista: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  loader: {
    marginVertical: 20,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  erro: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
