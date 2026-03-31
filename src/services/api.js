// Serviço para chamadas REST API
// Usando JSONPlaceholder como exemplo de API pública

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Buscar lista de usuários
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

// Buscar um usuário específico
export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};

// Buscar posts de um usuário
export const fetchUserPosts = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};
