import React from 'react';
import { User, Bot, Clock, Database, Brain } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
import ResultsDisplay from './ResultsDisplay';
import '../styles/ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { type, content, data, queryInfo, timestamp, error } = message;

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getMessageIcon = () => {
    if (type === 'user') return <User size={20} />;
    if (error) return <Bot size={20} className="error-icon" />;
    return <Bot size={20} />;
  };

  const getSourceIndicators = () => {
    if (!queryInfo) return null;

    const { routing } = queryInfo;
    if (!routing) return null;

    const indicators = [];
    
    if (routing.use_elasticsearch) {
      indicators.push(
        <div key="es" className="source-indicator elasticsearch">
          <Database size={14} />
          <span>ES</span>
        </div>
      );
    }
    
    if (routing.use_postgresql) {
      indicators.push(
        <div key="pg" className="source-indicator postgresql">
          <Database size={14} />
          <span>PG</span>
        </div>
      );
    }

    return indicators.length > 0 ? (
      <div className="source-indicators">
        {indicators}
      </div>
    ) : null;
  };

  return (
    <div className={`message ${type}-message ${error ? 'error' : ''}`}>
      <div className={`message-avatar ${type}`}>
        {getMessageIcon()}
      </div>
      
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">
            {type === 'user' ? 'You' : 'AI Assistant'}
          </span>
          <div className="message-meta">
            {getSourceIndicators()}
            <div className="message-time">
              <Clock size={12} />
              {formatTime(timestamp)}
            </div>
          </div>
        </div>
        
        <div className="message-text">
          <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}></div>
        </div>

        {queryInfo && (
          <div className="query-info">
            <div className="query-info-header">
              <Brain size={14} />
              <span>Query Analysis</span>
            </div>
            <div className="query-details">
              {queryInfo.intent && (
                <div className="query-detail">
                  <strong>Intent:</strong> {queryInfo.intent.replace('_', ' ')}
                </div>
              )}
              {queryInfo.entities && queryInfo.entities.length > 0 && (
                <div className="query-detail">
                  <strong>Entities:</strong> {queryInfo.entities.map(e => e.text).join(', ')}
                </div>
              )}
              {queryInfo.routing && (
                <div className="query-detail">
                  <strong>Sources:</strong> {
                    [
                      queryInfo.routing.use_elasticsearch && 'Elasticsearch',
                      queryInfo.routing.use_postgresql && 'PostgreSQL'
                    ].filter(Boolean).join(', ')
                  }
                </div>
              )}
            </div>
          </div>
        )}

        {data && <ResultsDisplay data={data} />}
      </div>
    </div>
  );
};

export default ChatMessage;