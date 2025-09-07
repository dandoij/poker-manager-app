import React, { useState } from 'react';
import { Plus, Minus, DollarSign, Users, Clock, ArrowLeft, Receipt, Square, Lock, Unlock, Check, X, TrendingUp, Target } from 'lucide-react';

const GameView = ({ 
  currentGame, 
  setCurrentGame, 
  onEndGame, 
  onNavigate,
  playerProfiles = []
}) => {
  // Local state for UI interactions
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerBuyIn, setNewPlayerBuyIn] = useState(currentGame?.defaultBuyIn || 30);
  const [showRebuyModal, setShowRebuyModal] = useState(false);
  const [rebuyPlayerId, setRebuyPlayerId] = useState(null);
  const [rebuyAmount, setRebuyAmount] = useState(currentGame?.defaultBuyIn || 30);
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center" 
           style={{ background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #374151 100%)' }}>
        <div className="text-center">
          <p className="text-xl mb-4">No active game found</p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Filter out players already in the game
  const availablePlayers = playerProfiles.filter(profile => 
    !currentGame.players.some(player => player.name === profile.name)
  );

  const addPlayer = (playerData) => {
    const newPlayer = {
      id: Date.now().toString(),
      name: playerData.name,
      buyIn: playerData.buyIn,
      currentChips: playerData.buyIn,
      isActive: true,
      isLocked: false,
      addedAt: new Date().toISOString(),
      profileId: null 
    };
    
    const updatedGame = {
      ...currentGame,
      players: [...currentGame.players, newPlayer],
      moneyOnTable: currentGame.moneyOnTable + newPlayer.buyIn
    };
    
    setCurrentGame(updatedGame);
  };

  const addSelectedPlayers = () => {
    const newPlayers = selectedPlayers.map(playerId => {
      const profile = playerProfiles.find(p => p.id === playerId);
      return {
        id: Date.now().toString() + Math.random(),
        name: profile.name,
        buyIn: newPlayerBuyIn,
        currentChips: newPlayerBuyIn,
        isActive: true,
        isLocked: false,
        addedAt: new Date().toISOString(),
        profileId: profile.id
      };
    });

    const totalBuyIn = newPlayers.reduce((sum, player) => sum + player.buyIn, 0);

    const updatedGame = {
      ...currentGame,
      players: [...currentGame.players, ...newPlayers],
      moneyOnTable: currentGame.moneyOnTable + totalBuyIn
    };
    
    setCurrentGame(updatedGame);
    setSelectedPlayers([]);
    setShowPlayerSelector(false);
    setShowAddPlayer(false);
  };

  const updatePlayerChips = (playerId, amount) => {
    const updatedGame = {
      ...currentGame,
      players: currentGame.players.map(player =>
        player.id === playerId
          ? { ...player, currentChips: Math.max(0, player.currentChips + amount) }
          : player
      )
    };
    
    setCurrentGame(updatedGame);
  };

  const toggleLockPlayer = (playerId) => {
    const updatedGame = {
      ...currentGame,
      players: currentGame.players.map(player =>
        player.id === playerId
          ? { ...player, isLocked: !player.isLocked }
          : player
      )
    };
    
    setCurrentGame(updatedGame);
  };

  const handleRebuy = () => {
    if (!isNaN(rebuyAmount) && rebuyAmount > 0 && rebuyPlayerId) {
      const updatedGame = {
        ...currentGame,
        players: currentGame.players.map(p =>
          p.id === rebuyPlayerId
            ? {
                ...p,
                buyIn: p.buyIn + rebuyAmount,
                currentChips: p.currentChips + rebuyAmount
              }
              : p
            ),
            moneyOnTable: currentGame.moneyOnTable + rebuyAmount 
      };
      
      setCurrentGame(updatedGame);
    }
    setRebuyAmount(currentGame.defaultBuyIn);
    setRebuyPlayerId(null);
    setShowRebuyModal(false);
  };

  const cashOutLockedPlayers = () => {
    // Calculate total chips being cashed out
    const totalCashOut = currentGame.players
      .filter(p => p.isLocked && p.isActive)
      .reduce((sum, p) => sum + p.currentChips, 0);

    const updatedGame = {
      ...currentGame,
      players: currentGame.players.map(player =>
        player.isLocked && player.isActive
          ? { ...player, isActive: false, cashOutTime: new Date().toISOString() }
          : player
      ),
      moneyOnTable: currentGame.moneyOnTable - totalCashOut
    };
    
    setCurrentGame(updatedGame);
  };

  const getTotalPot = () => {
    return currentGame.players
      .filter(p => p.isActive)
      .reduce((sum, player) => sum + player.currentChips, 0);
  };

  const isOnePlayerLocked = currentGame.players.length > 0 &&
    currentGame.players.filter(p => p.isActive).some(p => p.isLocked);
  
  const totalsMatch = getTotalPot() === currentGame.moneyOnTable;

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #374151 100%)' }}>
        <style>{`
          .player-card {
            background-color: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          .player-card:hover {
            background-color: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
          }
          
          .stat-card {
            background-color: rgba(16, 185, 129, 0.1);
            border-color: rgba(16, 185, 129, 0.2);
            backdrop-filter: blur(20px);
          }
          .stat-card:hover {
            background-color: rgba(16, 185, 129, 0.15);
            box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.2);
          }
          
          .add-player-card {
            background-color: rgba(55, 65, 81, 0.2);
            border-color: rgba(75, 85, 99, 0.2);
            backdrop-filter: blur(10px);
          }

          .add-player-card:hover {
            background-color: rgba(75, 85, 99, 0.4) !important;
            border-color: rgba(107, 114, 128, 0.4) !important;
            box-shadow: 0 10px 25px -5px rgba(75, 85, 99, 0.15) !important;
          }
          
          .input-field {
            background-color: rgba(55, 65, 81, 0.6);
            border-color: rgba(75, 85, 99, 0.4);
            backdrop-filter: blur(10px);
          }
          
          .action-btn {
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }
          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          }
          
          .chip-btn {
            background-color: rgba(55, 65, 81, 0.8);
            border-color: rgba(75, 85, 99, 0.6);
            backdrop-filter: blur(10px);
          }
          .chip-btn:hover {
            background-color: rgba(75, 85, 99, 0.9);
          }
          
          .cash-out-btn {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            box-shadow: 0 4px 15px -3px rgba(245, 158, 11, 0.2);
          }
          .cash-out-btn:hover {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.3);
          }
          
          .end-game-btn {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            box-shadow: 0 4px 15px -3px rgba(239, 68, 68, 0.2);
          }
          .end-game-btn:hover {
            background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
            box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.3);
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
              <h1 className="text-xl font-bold text-white">{currentGame.tableName}</h1>
              <div className="text-sm text-gray-300">
                ${currentGame.smallBlind}/${currentGame.bigBlind} blinds
              </div>
            </div>
            
            <div className="w-12"></div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="stat-card p-4 rounded-2xl border text-center transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300 font-medium">ACTIVE</span>
              </div>
              <div className="text-xl font-bold text-white">
                {currentGame.players.filter(p => p.isActive).length}
              </div>
            </div>
            <div className="stat-card p-4 rounded-2xl border text-center transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300 font-medium">TOTAL</span>
              </div>
              <div className="text-xl font-bold text-white">${getTotalPot()}</div>
            </div>
            <div className="stat-card p-4 rounded-2xl border text-center transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-300 font-medium">TABLE</span>
              </div>
              <div className="text-xl font-bold text-white">${currentGame.moneyOnTable}</div>
            </div>
          </div>

          {/* Add Player Section */}
          {showAddPlayer && (
            <div className="add-player-card p-6 rounded-2xl mb-6 border">
              <h3 className="font-semibold mb-4 text-white text-lg">Add Players</h3>
              
              {/* Buy-in amount input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-2 font-medium">Buy-in Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={newPlayerBuyIn}
                  onChange={(e) => setNewPlayerBuyIn(Number(e.target.value))}
                  className="input-field w-full p-3 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Player selection tabs */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setShowPlayerSelector(false)}
                  className={`p-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    !showPlayerSelector 
                      ? 'bg-emerald-600 text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setShowPlayerSelector(true)}
                  className={`p-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    showPlayerSelector 
                      ? 'bg-emerald-600 text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Profiles ({availablePlayers.length})
                </button>
              </div>

              {showPlayerSelector ? (
                /* Player Profile Selector */
                <div className="mb-4">
                  <div className="max-h-48 overflow-y-auto overflow-x-hidden space-y-3 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(75, 85, 99, 0.5) transparent' }}>
                    <style>{`
                      /* Custom scrollbar for webkit browsers */
                      .max-h-48::-webkit-scrollbar {
                        width: 6px;
                      }
                      .max-h-48::-webkit-scrollbar-track {
                        background: rgba(55, 65, 81, 0.3);
                        border-radius: 3px;
                      }
                      .max-h-48::-webkit-scrollbar-thumb {
                        background: rgba(75, 85, 99, 0.6);
                        border-radius: 3px;
                      }
                      .max-h-48::-webkit-scrollbar-thumb:hover {
                        background: rgba(107, 114, 128, 0.8);
                      }
                    `}</style>
                    {availablePlayers.length === 0 ? (
                      <div className="text-center text-gray-400 py-6">
                        <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="font-medium">No available players</p>
                        <p className="text-xs">All profiles are in the game</p>
                      </div>
                    ) : (
                      availablePlayers.map((profile) => (
                        <div
                          key={profile.id}
                          onClick={() => togglePlayerSelection(profile.id)}
                          className={`p-3 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between border min-w-0 ${
                            selectedPlayers.includes(profile.id)
                              ? 'bg-emerald-600/20 border-emerald-500/50'
                              : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="font-medium text-white truncate">{profile.name}</div>
                            <div className="text-xs text-gray-400 truncate">
                              {profile.stats.totalSessions} sessions • @{profile.contactInfo.venmo}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            {selectedPlayers.includes(profile.id) && (
                              <Check className="w-5 h-5 text-emerald-400" />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                /* Manual Player Entry */
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    className="input-field w-full p-3 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowAddPlayer(false);
                    setShowPlayerSelector(false);
                    setSelectedPlayers([]);
                    setNewPlayerName('');
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (showPlayerSelector && selectedPlayers.length > 0) {
                      addSelectedPlayers();
                    } else if (!showPlayerSelector && newPlayerName) {
                      addPlayer({ name: newPlayerName, buyIn: newPlayerBuyIn });
                      setNewPlayerName('');
                      setNewPlayerBuyIn(currentGame.defaultBuyIn);
                      setShowAddPlayer(false);
                    }
                  }}
                  disabled={showPlayerSelector ? selectedPlayers.length === 0 : !newPlayerName}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
                >
                  Add {showPlayerSelector && selectedPlayers.length > 1 ? `(${selectedPlayers.length})` : ''}
                </button>
              </div>
            </div>
          )}

          {/* Active Players List */}
          <div className="space-y-4 mb-6">
            {currentGame.players
              .filter(player => player.isActive)
              .map((player) => {
                const profit = player.currentChips - player.buyIn;
                return (
                  <div key={player.id} className="player-card p-5 rounded-2xl border transition-all duration-300 transform hover:scale-102">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="flex items-center space-x-3">
                          {(() => {
                            const profile = player.profileId 
                                ? playerProfiles.find(p => p.id === player.profileId)
                                : null;
                            return (
                              <>
                                <div className="font-semibold text-lg text-white">
                                  {player.name}
                                </div>
                                {profile?.contactInfo.venmo && (
                                  <div className="text-cyan-400 text-sm font-medium">
                                    @{profile.contactInfo.venmo}
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="text-gray-300">Buy-in: ${player.buyIn}</span>
                          <span className="text-gray-400 mx-2">•</span>
                          <span className={profit >= 0 ? "text-emerald-400" : "text-red-400"}>
                            P&L: {profit >= 0 ? "+" : ""}{profit}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">${player.currentChips}</div>
                        <button
                          onClick={() => toggleLockPlayer(player.id)}
                          className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 mt-1 ${
                            player.isLocked
                              ? "bg-gray-600/80 text-gray-300"
                              : "bg-emerald-600/80 hover:bg-emerald-500/80 text-white"
                          }`}>
                          {player.isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Unlock className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updatePlayerChips(player.id, -5)}
                        disabled={player.isLocked}
                        className={`chip-btn p-2 rounded-xl border transition-all duration-300 transform hover:scale-110 ${
                          player.isLocked
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-red-600/80 hover:border-red-500/60"
                        }`}
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => updatePlayerChips(player.id, -currentGame.smallBlind)}
                        disabled={player.isLocked}
                        className={`chip-btn px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          player.isLocked
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-red-600/80 hover:border-red-500/60"
                        }`}
                      >
                        -${currentGame.smallBlind}
                      </button>
                      <button
                        onClick={() => updatePlayerChips(player.id, currentGame.smallBlind)}
                        disabled={player.isLocked}
                        className={`chip-btn px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          player.isLocked
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-emerald-600/80 hover:border-emerald-500/60"
                        }`}
                      >
                        +${currentGame.smallBlind}
                      </button>
                      <button
                        onClick={() => updatePlayerChips(player.id, 5)}
                        disabled={player.isLocked}
                        className={`chip-btn p-2 rounded-xl border transition-all duration-300 transform hover:scale-110 ${
                          player.isLocked
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-emerald-600/80 hover:border-emerald-500/60"
                        }`}
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => {
                          setRebuyPlayerId(player.id);
                          setShowRebuyModal(true);
                          setRebuyAmount(currentGame.defaultBuyIn);
                        }}
                        disabled={player.isLocked}
                        className={`chip-btn px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          player.isLocked
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-cyan-600/80 hover:border-cyan-500/60"
                        }`}
                      >
                        Rebuy
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Cashed Out Players */}
          {currentGame.players.some(p => !p.isActive) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Cashed Out Players</h3>
              <div className="space-y-3">
                {currentGame.players
                  .filter(player => !player.isActive)
                  .map((player) => (
                    <div key={player.id} className="player-card p-4 rounded-xl border opacity-75">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-white">{player.name}</div>
                          <div className="text-sm text-gray-400 mt-1">
                            Final: ${player.currentChips} • P&L: {player.currentChips - player.buyIn >= 0 ? '+' : ''}{player.currentChips - player.buyIn}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-gray-300">${player.currentChips}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setNewPlayerBuyIn(currentGame.defaultBuyIn);
                setShowAddPlayer(true);
              }}
              className="add-player-card w-full rounded-2xl p-4 mb-6 
                     flex items-center justify-center space-x-3 
                     transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (!totalsMatch) {
                    alert("⚠️ Warning: Player chips do not equal the chips on the table! Please double-check before cashing out.");
                  } else {
                    cashOutLockedPlayers();
                  }
                }}
                disabled={!isOnePlayerLocked}
                className={`cash-out-btn action-btn p-4 rounded-2xl flex items-center justify-center space-x-2 text-white font-medium transition-all duration-300 transform ${
                  isOnePlayerLocked
                    ? "hover:scale-105"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <Receipt className="w-5 h-5" />
                <span>Cash Out</span>
              </button>

              <button
                onClick={onEndGame}
                className="end-game-btn action-btn p-4 rounded-2xl flex items-center justify-center space-x-2 text-white font-medium transition-all duration-300 transform hover:scale-105"
              >
                <Square className="w-5 h-5" />
                <span>End Game</span>
              </button>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-8 text-center">
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

      {/* Rebuy Modal */}
      {showRebuyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div 
            className="p-6 rounded-2xl shadow-2xl w-80 border"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.95)',
              borderColor: 'rgba(75, 85, 99, 0.5)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white text-center">Rebuy Chips</h3>
            <div className="relative mb-6">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                min="1"
                value={rebuyAmount}
                onChange={(e) => setRebuyAmount(Number(e.target.value))}
                className="input-field w-full pl-10 pr-4 py-4 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                placeholder="Enter rebuy amount"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRebuyModal(false);
                  setRebuyPlayerId(null);
                  setRebuyAmount(currentGame.defaultBuyIn); 
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleRebuy}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 p-3 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105"
              >
                Confirm Rebuy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameView;