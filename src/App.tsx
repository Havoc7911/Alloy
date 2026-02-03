import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header style={{ padding: '20px', backgroundColor: '#1a1a2e', color: 'white' }}>
        <h1>🚀 Alloy Workspace</h1>
        <p>Node-based productivity and workflow management suite</p>
      </header>
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '30px' }}>
          <h2>Welcome to Alloy!</h2>
          <p>A unified workspace suite for modern productivity. Create, modify, automate, and save anything—then share it anywhere.</p>
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '40px' }}>
          <div style={{ padding: '20px', border: '2px solid #eee', borderRadius: '8px' }}>
            <h3>📊 Canvas Editor</h3>
            <p>Visual node-based workflow editor for creating complex automations</p>
          </div>
          <div style={{ padding: '20px', border: '2px solid #eee', borderRadius: '8px' }}>
            <h3>🎯 Node Library</h3>
            <p>40+ node types for files, APIs, users, devices, and automation workflows</p>
          </div>
          <div style={{ padding: '20px', border: '2px solid #eee', borderRadius: '8px' }}>
            <h3>⚡ Execution Engine</h3>
            <p>Run workflows with real-time progress tracking and execution controls</p>
          </div>
          <div style={{ padding: '20px', border: '2px solid #eee', borderRadius: '8px' }}>
            <h3>💾 Data Persistence</h3>
            <p>Browser localStorage for projects, workflows, and execution history</p>
          </div>
        </section>
        <section style={{ marginTop: '40px', padding: '30px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>🛠️ Status: Development Environment Active</h3>
          <p>All dependencies installed successfully!</p>
          <ul style={{ marginTop: '15px', lineHeight: '1.8' }}>
            <li>✅ React + TypeScript</li>
            <li>✅ MobX State Management</li>
            <li>✅ Vite Build System</li>
            <li>✅ React Flow (Node Editor)</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
