import React from 'react';
import { Plus, History, Play, Users, TrendingUp, Trophy } from 'lucide-react';

const Home = ({ 
  currentGame, 
  gameHistoryCount, 
  playerProfilesCount, 
  onNavigate 
}) => {
  return (
    <div className="min-h-screen bg-gray-900" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #374151 100%)' }}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="relative max-w-sm mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
              boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)'
            }}
          >
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Stradl
          </h1>
          <p className="text-gray-400 text-sm">Your poker community awaits</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            className="rounded-xl p-4 border"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.3)',
              borderColor: 'rgba(75, 85, 99, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-400 text-xs font-medium">GAMES</span>
            </div>
            <div className="text-xl font-bold text-white">{gameHistoryCount}</div>
          </div>
          <div 
            className="rounded-xl p-4 border"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-400 text-xs font-medium">PLAYERS</span>
            </div>
            <div className="text-xl font-bold text-white">{playerProfilesCount}</div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          {/* Continue Game Button */}
          {currentGame && (
            <button
              onClick={() => onNavigate('game')}
              className="group w-full rounded-2xl p-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
                e.target.style.boxShadow = '0 20px 40px -10px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                e.target.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.2)';
              }}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-white font-semibold text-lg mb-1">Continue Game</div>
                  <div className="text-emerald-100 text-sm opacity-90">{currentGame.tableName}</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-2 group-hover:bg-opacity-30 transition-all">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
            </button>
          )}

          {/* New Game Button */}
          <button
            onClick={() => onNavigate('setup')}
            className="group w-full rounded-2xl p-4 border transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.4)',
              borderColor: 'rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(75, 85, 99, 0.6)';
              e.target.style.borderColor = 'rgba(107, 114, 128, 0.5)';
              e.target.style.boxShadow = '0 10px 25px -5px rgba(75, 85, 99, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.4)';
              e.target.style.borderColor = 'rgba(75, 85, 99, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-white font-semibold text-lg mb-1">New Game</div>
                <div className="text-gray-300 text-sm">Start a fresh table</div>
              </div>
              <div 
                className="rounded-full p-2 transition-all"
                style={{ backgroundColor: 'rgba(75, 85, 99, 0.4)' }}
              >
                <Plus className="w-5 h-5 text-white" />
              </div>
            </div>
          </button>

          {/* Game History Button */}
          <button
            onClick={() => onNavigate('history')}
            className="group w-full rounded-2xl p-4 border transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.2)',
              borderColor: 'rgba(75, 85, 99, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(75, 85, 99, 0.4)';
              e.target.style.borderColor = 'rgba(107, 114, 128, 0.4)';
              e.target.style.boxShadow = '0 10px 25px -5px rgba(75, 85, 99, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.2)';
              e.target.style.borderColor = 'rgba(75, 85, 99, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-white font-semibold text-lg mb-1">Game History</div>
                <div className="text-gray-400 text-sm">{gameHistoryCount} games completed</div>
              </div>
              <div 
                className="rounded-full p-2 transition-all"
                style={{ backgroundColor: 'rgba(75, 85, 99, 0.2)' }}
              >
                <History className="w-5 h-5 text-gray-300" />
              </div>
            </div>
          </button>

          {/* Manage Players Button */}
          <button
            onClick={() => onNavigate('managePlayers')}
            className="group w-full rounded-2xl p-4 border transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.2)',
              borderColor: 'rgba(75, 85, 99, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(75, 85, 99, 0.4)';
              e.target.style.borderColor = 'rgba(107, 114, 128, 0.4)';
              e.target.style.boxShadow = '0 10px 25px -5px rgba(75, 85, 99, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.2)';
              e.target.style.borderColor = 'rgba(75, 85, 99, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-white font-semibold text-lg mb-1">Manage Players</div>
                <div className="text-gray-400 text-sm">{playerProfilesCount} players in network</div>
              </div>
              <div 
                className="rounded-full p-2 transition-all"
                style={{ backgroundColor: 'rgba(75, 85, 99, 0.2)' }}
              >
                <Users className="w-5 h-5 text-gray-300" />
              </div>
            </div>
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="text-gray-500 text-sm mb-4">Ready to play?</div>
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

export default Home;