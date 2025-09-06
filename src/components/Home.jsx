import React from 'react';
import { Plus, History, Play, Users } from 'lucide-react';

const Home = ({ 
  currentGame, 
  gameHistoryCount, 
  playerProfilesCount, 
  onNavigate 
}) => {
  return (
    <div className="min-h-screen bg-green-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-green-100 border-b border-yellow-600/40 pb-2"
          style={{ fontFamily: "'Quantico', sans-serif", fontSize: '2.5rem' }}>
          Chipply
        </h1>
        
        <div className="space-y-4">
          {currentGame && (
            <button
              onClick={() => onNavigate('game')}
              className="w-full bg-green-600 hover:bg-green-700 px-4 rounded-lg
                      h-16 flex items-center justify-between gap-3 transition-all duration-300 ease-in-out"
            >
              <div className="flex-1 text-left flex flex-col justify-center">
                <div className="font-semibold leading-tight">Continue Game</div>
                <div className="text-sm text-green-200 leading-tight">{currentGame.tableName}</div>
              </div>
              <Play className="w-6 h-6" />
            </button>
          )}
          
          <button
            onClick={() => onNavigate('setup')}
            className="w-full bg-blue-600 hover:bg-blue-700 px-4 rounded-lg
                      h-16 flex items-center justify-between gap-3 transition-all duration-300 ease-in-out"
          >
            <div className="flex-1 text-left flex flex-col justify-center">
              <div className="font-semibold leading-tight">New Game</div>
              <div className="text-sm text-gray-300 leading-tight">Start fresh table</div>
            </div>
            <Plus className="w-6 h-6 shrink-0" />
          </button>
          
          <button
            onClick={() => onNavigate('history')}
            className="w-full bg-gray-600 hover:bg-gray-700 px-4 rounded-lg
                      h-16 flex items-center justify-between gap-3 transition-all duration-300 ease-in-out"
          >
            <div className="flex-1 text-left flex flex-col justify-center">
              <div className="font-semibold leading-tight">Game History</div>
              <div className="text-sm text-gray-300 leading-tight">{gameHistoryCount} games played</div>
            </div>
            <History className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => onNavigate('managePlayers')}
            className="w-full bg-purple-600 hover:bg-purple-700 px-4 rounded-lg
                      h-16 flex items-center justify-between gap-3 transition-all duration-300 ease-in-out"
          >
            <div className="flex-1 text-left flex flex-col justify-center">
              <div className="font-semibold leading-tight">Manage Players</div>
              <div className="text-sm text-gray-300 leading-tight">{playerProfilesCount} players saved</div>
            </div>
            <Users className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;