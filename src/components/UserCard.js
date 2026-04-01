import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Componente que exibe um usuário em forma de card
const UserCard = ({ user, onPress }) => {
  // Pega o primeiro nome do usuário
  const firstName = user.name.split(' ')[0].toLowerCase();
  const email = `${firstName}@gmail.com`;
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.website}>{user.website}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  phone: {
    fontSize: 12,
    color: '#999',
  },
  website: {
    fontSize: 12,
    color: '#0066cc',
  },
});

