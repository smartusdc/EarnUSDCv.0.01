// src/App.tsx
import React from 'react';
import { WalletConnector } from './components/WalletConnector';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto p-4">
        <header className="py-6">
          <h1 className="text-2xl font-bold text-zinc-900">USDC Earn</h1>
        </header>
        <main>
          <WalletConnector />
        </main>
      </div>
    </div>
  );
}

export default App;
