import React from 'react';
import { ArrowLeft, History } from 'lucide-react';

const GameHistory = ({ gameHistory, onNavigate }) => {
  return (
    <div className="min-h-screen bg-green-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold mb-6 border-b border-yellow-600/40 pb-2">Game History</h2>
          <button
            onClick={() => onNavigate('home')}
            className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        
        {gameHistory.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <History className="w-12 h-12 mx-auto mb-4" />
            <p>No games played yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {gameHistory.map((game) => (
              <div key={game.id} className="bg-green-800 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{game.tableName}</h3>
                  <div className="text-sm text-gray-300">
                    {new Date(game.startTime).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  <div>Players: {game.players.length}</div>
                  <div>Total Buy-ins: ${game.players.reduce((sum, p) => sum + p.buyIn, 0)}</div>
                  <div>Blinds: ${game.smallBlind}/${game.bigBlind}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHistory;