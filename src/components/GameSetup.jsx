import React, { useState } from 'react';
import { ArrowLeft, Settings, DollarSign, Users } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-900" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #374151 100%)' }}>
      <style>{`
        .input-field {
          background-color: rgba(55, 65, 81, 0.4);
          border-color: rgba(75, 85, 99, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .input-field:focus {
          background-color: rgba(55, 65, 81, 0.6) !important;
          border-color: rgba(16, 185, 129, 0.6) !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
        }
        
        .start-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.2);
        }
        .start-btn:hover {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%) !important;
          box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.3) !important;
        }
        
        .cancel-btn {
          background-color: rgba(55, 65, 81, 0.4);
          border-color: rgba(75, 85, 99, 0.3);
          backdrop-filter: blur(10px);
        }
        .cancel-btn:hover {
          background-color: rgba(75, 85, 99, 0.6) !important;
          border-color: rgba(107, 114, 128, 0.5) !important;
          box-shadow: 0 10px 25px -5px rgba(75, 85, 99, 0.2) !important;
        }
        
        .stat-card {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}</style>

      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="relative max-w-sm mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.4)',
              borderColor: 'rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="text-center">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-2 shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                boxShadow: '0 20px 40px -12px rgba(16, 185, 129, 0.25)'
              }}
            >
              <Settings className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Setup Game</h1>
            <p className="text-gray-400 text-sm">Configure your table</p>
          </div>
          
          <div className="w-12"></div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Table Name */}
          <div>
            <label className="block text-white font-medium mb-3 text-sm">Table Name</label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter table name"
              className="input-field w-full p-4 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none"
            />
          </div>

          {/* Blinds Section */}
          <div>
            <label className="block text-white font-medium mb-3 text-sm">Blinds</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-2 font-medium">SMALL BLIND</div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={smallBlind}
                    onChange={(e) => setSmallBlind(Number(e.target.value))}
                    className="input-field w-full pl-10 pr-4 py-4 border rounded-2xl text-white transition-all duration-300 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-2 font-medium">BIG BLIND</div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={bigBlind}
                    onChange={(e) => setBigBlind(Number(e.target.value))}
                    className="input-field w-full pl-10 pr-4 py-4 border rounded-2xl text-white transition-all duration-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Default Buy-in */}
          <div>
            <label className="block text-white font-medium mb-3 text-sm">Default Buy-in</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={defaultBuyIn}
                onChange={(e) => setDefaultBuyIn(Number(e.target.value))}
                className="input-field w-full pl-10 pr-4 py-4 border rounded-2xl text-white transition-all duration-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Preview Card */}
          <div className="stat-card p-4 rounded-2xl border">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-2 font-medium">GAME PREVIEW</div>
              <div className="text-white font-semibold mb-1">{tableName || 'Poker Game'}</div>
              <div className="text-sm text-gray-300">
                ${smallBlind}/${bigBlind} • ${defaultBuyIn} buy-in
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => onNavigate('home')}
              className="cancel-btn flex-1 py-4 px-6 border rounded-2xl text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={handleStartGame}
              className="start-btn flex-1 py-4 px-6 rounded-2xl text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              Start Game
            </button>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div 
              className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" 
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" 
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;