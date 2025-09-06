import React from 'react';
import { ArrowLeft, History, Users, DollarSign, Clock, TrendingUp } from 'lucide-react';

const GameHistory = ({ gameHistory, onNavigate }) => {
  const calculateTotalPot = (game) => {
    return game.players.reduce((sum, p) => sum + p.buyIn, 0);
  };

  const formatDuration = (startTime, endTime) => {
    if (!endTime) return "In Progress";
    const duration = new Date(endTime) - new Date(startTime);
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">History</h2>
            <p className="text-gray-400 text-sm">Your poker game sessions</p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="rounded-full p-3 border transition-all duration-300 transform hover:scale-105"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.4)',
              borderColor: 'rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(75, 85, 99, 0.6)';
              e.target.style.borderColor = 'rgba(107, 114, 128, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.4)';
              e.target.style.borderColor = 'rgba(75, 85, 99, 0.3)';
            }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Quick Stats */}
        {gameHistory.length > 0 && (
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
                <span className="text-gray-400 text-xs font-medium">TOTAL GAMES</span>
              </div>
              <div className="text-xl font-bold text-white">{gameHistory.length}</div>
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
                <DollarSign className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400 text-xs font-medium">TOTAL POT</span>
              </div>
              <div className="text-xl font-bold text-white">
                ${gameHistory.reduce((sum, game) => sum + calculateTotalPot(game), 0)}
              </div>
            </div>
          </div>
        )}
        
        {/* Games List */}
        {gameHistory.length === 0 ? (
          <div className="text-center mt-16">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ 
                backgroundColor: 'rgba(75, 85, 99, 0.2)',
                border: '1px solid rgba(107, 114, 128, 0.2)'
              }}
            >
              <History className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Games Yet</h3>
            <p className="text-gray-400 text-sm mb-1">Start your first poker session</p>
            <p className="text-gray-500 text-xs">to see your game history here</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Games</h3>
              <div className="text-sm text-gray-400">{gameHistory.length} session{gameHistory.length !== 1 ? 's' : ''}</div>
            </div>
            
            {gameHistory.map((game, index) => (
              <div 
                key={game.id}
                className="rounded-2xl p-4 border transition-all duration-300 transform hover:scale-[1.02]"
                style={{ 
                  backgroundColor: index === 0 && !game.endTime 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  borderColor: index === 0 && !game.endTime 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white font-semibold text-lg">{game.tableName}</h4>
                      {index === 0 && !game.endTime && (
                        <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Live
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">{formatDate(game.startTime)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">${calculateTotalPot(game)}</div>
                    <div className="text-gray-400 text-xs">Total Pot</div>
                  </div>
                </div>
                
                {/* Game Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div 
                    className="rounded-xl p-3 border text-center"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.3)',
                      borderColor: 'rgba(75, 85, 99, 0.2)'
                    }}
                  >
                    <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-white font-bold">{game.players.length}</div>
                    <div className="text-gray-400 text-xs">Players</div>
                  </div>
                  
                  <div 
                    className="rounded-xl p-3 border text-center"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.3)',
                      borderColor: 'rgba(75, 85, 99, 0.2)'
                    }}
                  >
                    <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">{formatDuration(game.startTime, game.endTime)}</div>
                    <div className="text-gray-400 text-xs">Duration</div>
                  </div>
                  
                  <div 
                    className="rounded-xl p-3 border text-center"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.3)',
                      borderColor: 'rgba(75, 85, 99, 0.2)'
                    }}
                  >
                    <div className="text-gray-400 text-xs mb-1">Blinds</div>
                    <div className="text-white font-bold text-sm">${game.smallBlind}/${game.bigBlind}</div>
                  </div>
                </div>

                {/* Player Summary */}
                {game.players.length > 0 && (
                  <div 
                    className="rounded-xl p-3 border"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.2)',
                      borderColor: 'rgba(75, 85, 99, 0.15)'
                    }}
                  >
                    <div className="text-gray-400 text-xs font-medium mb-2">PLAYERS</div>
                    <div className="flex flex-wrap gap-1">
                      {game.players.slice(0, 4).map((player, playerIndex) => (
                        <div 
                          key={playerIndex}
                          className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          {player.name}
                        </div>
                      ))}
                      {game.players.length > 4 && (
                        <div className="bg-gray-700/50 text-gray-400 text-xs px-2 py-1 rounded-full">
                          +{game.players.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHistory;