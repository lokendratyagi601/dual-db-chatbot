import React from 'react';
import { Database, Brain, Zap } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <Brain className="brain-icon" />
            <Zap className="zap-icon" />
          </div>
          <div className="logo-text">
            <h1>AI Query Assistant</h1>
            <p>Elasticsearch & PostgreSQL Natural Language Interface</p>
          </div>
        </div>
        
        <div className="status-indicators">
          <div className="status-item">
            <Database className="database-icon elasticsearch" />
            <span>Elasticsearch</span>
            <div className="status-dot online"></div>
          </div>
          <div className="status-item">
            <Database className="database-icon postgresql" />
            <span>PostgreSQL</span>
            <div className="status-dot online"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;