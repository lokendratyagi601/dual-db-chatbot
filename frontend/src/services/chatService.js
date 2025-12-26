import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ChatService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // 30 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging
    this.apiClient.interceptors.request.use(
      (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.status, error.message);
        
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Unable to connect to the server. Please make sure the backend is running.');
        }
        
        if (error.response?.status === 500) {
          throw new Error('Server error occurred. Please try again.');
        }
        
        if (error.response?.status === 404) {
          throw new Error('API endpoint not found.');
        }
        
        throw error;
      }
    );
  }

  async sendMessage(message, conversationId = 'default') {
    try {
      const response = await this.apiClient.post('/chat', {
        message,
        conversation_id: conversationId,
      });

      return response.data;
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  }

  async getHealth() {
    try {
      const response = await this.apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }

  async getElasticsearchSchema() {
    try {
      const response = await this.apiClient.get('/schema/elasticsearch');
      return response.data;
    } catch (error) {
      console.error('ES schema error:', error);
      throw error;
    }
  }

  async getPostgreSQLSchema() {
    try {
      const response = await this.apiClient.get('/schema/postgresql');
      return response.data;
    } catch (error) {
      console.error('PG schema error:', error);
      throw error;
    }
  }

  // Utility method to check if backend is available
  async checkBackendAvailability() {
    try {
      await this.apiClient.get('/');
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const chatService = new ChatService();
export default chatService;