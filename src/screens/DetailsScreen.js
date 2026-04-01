import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Text, Button } from 'react-native-paper';

const DetailsScreen = ({ route, navigation }) => {
  const { Title, Year, Type, Poster } = route.params;

  return (
    <View style={styles.container}>
      {Poster !== 'N/A' && (
        <Image 
          source={{ uri: Poster }} 
          style={styles.poster}
        />
      )}

      <Text variant="headlineMedium" style={styles.titulo}>
        {Title}
      </Text>

      <Text variant="bodyMedium" style={styles.info}>
        Ano: {Year}
      </Text>

      <Text variant="bodyMedium" style={styles.info}>
        Tipo: {Type}
      </Text>

      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()}
        style={styles.botao}
      >
        Voltar
      </Button>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ddd',
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  info: {
    marginBottom: 8,
    color: '#666',
  },
  botao: {
    marginTop: 20,
    backgroundColor: '#0066cc',
  },
});

export default DetailsScreen;
