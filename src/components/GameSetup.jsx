import React, { useState } from 'react';

const GameSetup = ({ onStartGame, onNavigate }) => {
  const [tableName, setTableName] = useState('');
  const [smallBlind, setSmallBlind] = useState(1);
  const [bigBlind, setBigBlind] = useState(2);
  const [defaultBuyIn, setDefaultBuyIn] = useState(30);

  const handleStartGame = () => {
    onStartGame({ 
      tableName: tableName || 'Poker Game', 
      smallBlind, 
      bigBlind, 
      defaultBuyIn 
    });
  };

  return (
    <div className="min-h-screen bg-green-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 border-b border-yellow-600/40 pb-2">Setup New Game</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Table Name</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Name"
              className="w-full p-3 bg-green-800 border border-green-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Small Blind</label>
              <input
                type="number"
                value={smallBlind}
                onChange={(e) => setSmallBlind(Number(e.target.value))}
                className="w-full p-3 bg-green-800 border border-green-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Big Blind</label>
              <input
                type="number"
                value={bigBlind}
                onChange={(e) => setBigBlind(Number(e.target.value))}
                className="w-full p-3 bg-green-800 border border-green-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Default Buy-in</label>
            <input
              type="number"
              value={defaultBuyIn}
              onChange={(e) => setDefaultBuyIn(Number(e.target.value))}
              className="w-full p-3 bg-green-800 border border-green-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStartGame}
              className="flex-1 bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;