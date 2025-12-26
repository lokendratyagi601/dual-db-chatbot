import React from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;