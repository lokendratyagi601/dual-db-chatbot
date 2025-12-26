#AI-Powered Query Tool

A sophisticated natural language interface for querying both **Elasticsearch** and **PostgreSQL** databases simultaneously. Built with modern technologies and AI-powered query processing.

## 🌟 Features

### 🧠 Advanced NLP Processing
- **Generative AI Integration**: Uses Hugging Face transformers for intent classification and response generation
- **Multi-source Query Routing**: Intelligently routes queries to appropriate data sources
- **Entity Recognition**: Extracts entities, temporal information, and query parameters
- **Natural Language Responses**: Generates human-readable responses using AI

### 🔍 Dual Database Support
- **Elasticsearch**: Full-text search, document retrieval, and complex aggregations
- **PostgreSQL**: Structured queries, joins, and statistical analysis
- **Intelligent Routing**: Automatically determines which database(s) to query based on intent

### 🎯 Query Capabilities
- **Text Search**: "Find documents about machine learning"
- **Analytics**: "Count users by department"
- **Aggregations**: "Average salary by role"
- **Filtering**: "Show orders from last month"
- **Time-based Queries**: "Users hired this year"
- **Comparisons**: "Compare sales by quarter"

### 🎨 Modern UI/UX
- **Real-time Chat Interface**: Conversational query experience
- **Multi-view Results**: Summary, table, and timeline views
- **Quick Query Templates**: Pre-built queries for common tasks
- **Source Indicators**: Shows which databases were queried
- **Responsive Design**: Works on desktop and mobile

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)

### Option 1: Docker Compose (Recommended)

1. **Clone and start everything:**
   ```bash
   git clone <repository-url>
   cd chatbot
   docker-compose up -d
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database Admin: http://localhost:8080 (Adminer)

3. **Health check:**
   ```bash
   curl http://localhost:8000/health
   ```

### Option 2: Local Development

1. **Start databases:**
   ```bash
   docker-compose up -d postgres elasticsearch
   ```

2. **Backend setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   uvicorn main:app --reload
   ```

3. **Frontend setup:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🏗️ Architecture

### Backend (FastAPI)
```
backend/
├── main.py                 # FastAPI application
├── services/
│   ├── nlp_processor.py    # AI-powered NLP processing
│   ├── query_router.py     # Intelligent query routing
│   ├── elasticsearch_service.py  # ES connection & queries
│   ├── postgresql_service.py     # PostgreSQL ORM & queries
│   └── data_merger.py      # Result aggregation
└── requirements.txt
```

### Frontend (React)
```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatInterface.js    # Main chat component
│   │   ├── ChatMessage.js      # Message display
│   │   ├── QuickQueries.js     # Query templates
│   │   └── ResultsDisplay.js   # Multi-view results
│   ├── services/
│   │   └── chatService.js      # API client
│   └── styles/                 # CSS modules
└── package.json
```

## 🎮 Usage Examples

### Search Queries
```
"Find documents about machine learning"
"Search for articles by author john_doe"
"Show me content tagged with 'technology'"
```

### Analytics Queries
```
"How many users do we have?"
"Count products by category"
"Average salary by department"
"Total revenue last quarter"
```

### Time-based Queries
```
"Show users hired this month"
"Orders from last week"
"Documents created today"
```

### Complex Queries
```
"Compare sales between Q1 and Q2"
"Find products with low stock in electronics category"
"Show top 5 employees by salary in engineering"
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=hackathon_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=password

# Elasticsearch Configuration
ES_HOST=localhost
ES_PORT=9200
ES_INDEX=hackathon_index

# Application Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000
```

### Sample Data
The application automatically creates sample data:

**PostgreSQL Tables:**
- `users`: Employee information (id, name, department, salary, hire_date)
- `products`: Product catalog (id, name, category, price, stock)
- `orders`: Order transactions (id, user_id, product_id, amount, date)

**Elasticsearch Documents:**
- Articles and documents with title, content, author, tags, and metadata

## 🎯 API Endpoints

### Core Endpoints
- `POST /chat` - Main chat interface
- `GET /health` - System health check
- `GET /schema/elasticsearch` - ES index mapping
- `GET /schema/postgresql` - Database schema

### Chat API Request
```json
{
  "message": "How many users do we have?",
  "conversation_id": "optional-session-id"
}
```

### Chat API Response
```json
{
  "response": "I found 5 users in the database.",
  "data": {
    "total_results": 5,
    "results": [...],
    "aggregations": {...}
  },
  "query_info": {
    "intent": "count_records",
    "entities": [...],
    "routing": {...}
  },
  "conversation_id": "session-id"
}
```

## 🔍 Technical Details

### NLP Processing Pipeline
1. **Query Preprocessing**: Clean and normalize input
2. **Intent Classification**: Determine query type using BART
3. **Entity Extraction**: Extract named entities with spaCy
4. **Query Routing**: Decide which database(s) to query
5. **Query Building**: Generate optimized database queries
6. **Result Merging**: Combine and format results
7. **Response Generation**: Create natural language response

### Database Query Optimization
- **Elasticsearch**: Uses multi-match queries, aggregations, and filters
- **PostgreSQL**: Generates optimized SQL with joins and indexing
- **Caching**: Results cached for common queries
- **Connection Pooling**: Efficient database connections

### AI Integration
- **Hugging Face Transformers**: For intent classification and response generation
- **spaCy**: For named entity recognition and text processing
- **NLTK**: For text preprocessing and tokenization

## 🚀 Deployment

### Production Deployment
1. Update environment variables for production
2. Use production-grade database instances
3. Configure SSL/TLS certificates
4. Set up monitoring and logging
5. Scale with Kubernetes or similar orchestration

### Performance Optimization
- Enable database indexing
- Configure Elasticsearch clusters
- Use Redis for caching
- Implement API rate limiting
- Add CDN for frontend assets

## 🏆 Hackathon Features

### What Makes This Special
- **Dual Database Integration**: Seamlessly queries both ES and PostgreSQL
- **AI-Powered Understanding**: Advanced NLP with generative AI
- **Real-time Interface**: Instant query processing and results
- **Intelligent Routing**: Smart decision-making about data sources
- **Production Ready**: Docker deployment with health checks
- **Extensible Architecture**: Easy to add new data sources

### Demo Scenarios
1. **Search Documents**: Show full-text search capabilities
2. **Analytics Dashboard**: Demonstrate aggregation queries
3. **Cross-database Queries**: Query both sources simultaneously
4. **Time-series Analysis**: Show temporal query capabilities
5. **Natural Language**: Demonstrate AI understanding

## 🤝 Contributing

This is a hackathon project, but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project as a starting point for your own applications!
