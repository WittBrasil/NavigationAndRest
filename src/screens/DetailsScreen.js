import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { fetchUserById, fetchUserPosts } from '../services/api';

const DetailsScreen = ({ route }) => {
  const { userId, userName } = route.params;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados do usuário e posts em paralelo
      const [userData, postsData] = await Promise.all([
        fetchUserById(userId),
        fetchUserPosts(userId),
      ]);

      setUser(userData);
      setPosts(postsData);
    } catch (err) {
      setError('Erro ao carregar detalhes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Informações do usuário */}
      <View style={styles.userInfoCard}>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Email: </Text>
          {user?.email}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Telefone: </Text>
          {user?.phone}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Website: </Text>
          {user?.website}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Empresa: </Text>
          {user?.company?.name}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Cidade: </Text>
          {user?.address?.city}
        </Text>
      </View>

      {/* Posts do usuário */}
      <View style={styles.postsContainer}>
        <Text style={styles.postsTitle}>Posts ({posts.length})</Text>

        {posts.length > 0 ? (
          <FlatList
            data={posts}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postBody} numberOfLines={3}>
                  {item.body}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noPostsText}>Nenhum post encontrado</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userInfoCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  info: {
    fontSize: 14,
    marginVertical: 6,
    color: '#555',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  postsContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  postBody: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  noPostsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 16,
    color: '#cc0000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DetailsScreen;
