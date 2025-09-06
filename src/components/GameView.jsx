import React, { useState } from 'react';
import { Plus, Minus, DollarSign, Users, Clock, ArrowLeft, Receipt, Square, Lock, Unlock } from 'lucide-react';

const GameView = ({ 
  currentGame, 
  onUpdateGame, 
  onEndGame, 
  onNavigate 
}) => {
  // Local state for UI interactions
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerBuyIn, setNewPlayerBuyIn] = useState(currentGame?.defaultBuyIn || 30);
  const [showRebuyModal, setShowRebuyModal] = useState(false);
  const [rebuyPlayerId, setRebuyPlayerId] = useState(null);
  const [rebuyAmount, setRebuyAmount] = useState(currentGame?.defaultBuyIn || 30);

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-green-800 text-white p-6 flex items-center justify-center">
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

  const addPlayer = (playerData) => {
    const newPlayer = {
      id: Date.now().toString(),
      name: playerData.name,
      buyIn: playerData.buyIn,
      currentChips: playerData.buyIn,
      isActive: true,
      isLocked: false,
      addedAt: new Date().toISOString()
    };
    
    const updatedGame = {
      ...currentGame,
      players: [...currentGame.players, newPlayer],
      moneyOnTable: currentGame.moneyOnTable + newPlayer.buyIn
    };
    
    onUpdateGame(updatedGame);
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
    
    onUpdateGame(updatedGame);
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
    
    onUpdateGame(updatedGame);
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
      
      onUpdateGame(updatedGame);
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

  const getMoneyOnTable = () => {
    return currentGame.players
      .filter(p => p.isActive)
      .reduce((sum, player) => sum + player.currentChips, 0);
  };

  const isOnePlayerLocked = currentGame.players.length > 0 &&
    currentGame.players.filter(p => p.isActive).some(p => p.isLocked);
  
  const totalsMatch = getTotalPot() === currentGame.moneyOnTable;

  return (
    <>
      <div className="min-h-screen bg-green-800 text-white p-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-bold">{currentGame.tableName}</h1>
              <div className="text-sm text-green-300">
                Blinds: ${currentGame.smallBlind}/${currentGame.bigBlind}
              </div>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-700 to-green-800 p-3 rounded-xl text-center 
                          shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] 
                          border border-green-600/30 hover:shadow-[0_12px_20px_rgba(0,0,0,0.4),0_6px_10px_rgba(0,0,0,0.3)] 
                          transform hover:translate-y-[-2px] transition-all duration-200">
              <div className="text-sm text-gray-300 flex items-center justify-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Active</span>
              </div>
              <div className="text-xl font-bold">
                {currentGame.players.filter(p => p.isActive).length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-700 to-green-800 p-3 rounded-xl text-center 
                          shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] 
                          border border-green-600/30 hover:shadow-[0_12px_20px_rgba(0,0,0,0.4),0_6px_10px_rgba(0,0,0,0.3)] 
                          transform hover:translate-y-[-2px] transition-all duration-200">
              <div className="text-sm text-gray-300 flex items-center justify-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>Player Total</span> 
              </div>
              <div className="text-xl font-bold">${getTotalPot()}</div>
            </div>
            <div className="bg-gradient-to-br from-green-700 to-green-800 p-3 rounded-xl text-center 
                          shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] 
                          border border-green-600/30 hover:shadow-[0_12px_20px_rgba(0,0,0,0.4),0_6px_10px_rgba(0,0,0,0.3)] 
                          transform hover:translate-y-[-2px] transition-all duration-200">
              <div className="text-sm text-gray-300 flex items-center justify-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>On Table</span>
              </div>
              <div className="text-xl font-bold">${currentGame.moneyOnTable}</div>
            </div>
          </div>

          {/* Add Player Section */}
          {showAddPlayer && (
            <div className="bg-gradient-to-br from-green-700 to-green-800 p-4 rounded-xl mb-4
                          shadow-[0_8px_20px_rgba(0,0,0,0.35),0_4px_10px_rgba(0,0,0,0.25)]
                          border border-green-600/40 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Add Player</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Player name"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="w-full p-2 bg-green-800/80 border border-green-600/60 rounded 
                           focus:ring-2 focus:ring-green-500 focus:border-transparent
                           shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                />
                <input
                  type="number"
                  placeholder="Buy-in amount"
                  value={newPlayerBuyIn}
                  onChange={(e) => setNewPlayerBuyIn(Number(e.target.value))}
                  className="w-full p-2 bg-green-800/80 border border-green-600/60 rounded 
                           focus:ring-2 focus:ring-green-500 focus:border-transparent
                           shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowAddPlayer(false)}
                    className="flex-1 bg-gradient-to-b from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 
                             p-2 rounded transition-all duration-200 
                             shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                             transform hover:translate-y-[-1px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newPlayerName) {
                        addPlayer({ name: newPlayerName, buyIn: newPlayerBuyIn });
                        setNewPlayerName('');
                        setNewPlayerBuyIn(currentGame.defaultBuyIn);
                        setShowAddPlayer(false);
                      }
                    }}
                    className="flex-1 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                             p-2 rounded transition-all duration-200 
                             shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                             transform hover:translate-y-[-1px]"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Players List */}
          <div className="space-y-3 mb-6">
            {currentGame.players
              .filter(player => player.isActive)
              .map((player) => {
                const profit = player.currentChips - player.buyIn;
                return (
                  <div key={player.id} className="bg-gradient-to-br from-green-700 via-green-800 to-green-900
                  p-4 rounded-2xl 
                  shadow-[0_10px_25px_rgba(0,0,0,0.4),0_6px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] 
                  border border-green-600/40
                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_8px_15px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] 
                  hover:scale-[1.02] transform transition-all duration-300 ease-in-out
                  backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-semibold text-lg text-white drop-shadow-sm">{player.name}</div>
                        <div className="text-sm">
                          <span className="text-gray-200">Buy-in: ${player.buyIn}</span> |
                          <span className={profit >= 0 ? "text-green-300 ml-1" : "text-red-300 ml-1"}>
                            P&L: {profit >= 0 ? "+" : ""}{profit}
                          </span>
                        </div>
                      </div>
                      <div className="text-xl font-bold text-white drop-shadow-sm">${player.currentChips}</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updatePlayerChips(player.id, -5)}
                        disabled={player.isLocked}
                        className={`p-2 rounded-full transition-all duration-200 
                          shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                          transform hover:translate-y-[-1px] ${
                          player.isLocked
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updatePlayerChips(player.id, -currentGame.smallBlind)}
                        disabled={player.isLocked}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 
                          shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                          transform hover:translate-y-[-1px] ${
                          player.isLocked
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        -${currentGame.smallBlind}
                      </button>
                      <button
                        onClick={() => updatePlayerChips(player.id, currentGame.smallBlind)}
                        disabled={player.isLocked}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 
                          shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                          transform hover:translate-y-[-1px] ${
                          player.isLocked
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        +${currentGame.smallBlind}
                      </button>
                      <button
                        onClick={() => updatePlayerChips(player.id, 5)}
                        disabled={player.isLocked}
                        className={`p-2 rounded-full transition-all duration-200 
                          shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                          transform hover:translate-y-[-1px] ${
                          player.isLocked
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setRebuyPlayerId(player.id);
                          setShowRebuyModal(true);
                          setRebuyAmount(currentGame.defaultBuyIn);
                        }}
                        disabled={player.isLocked}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 
                          shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                          transform hover:translate-y-[-1px] ${
                          player.isLocked
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        Rebuy
                      </button>
                      <div className="flex-1" />
                      <button
                        onClick={() => toggleLockPlayer(player.id)}
                        className={`p-2 rounded-full transition-all duration-200 ml-auto
                          shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                          transform hover:translate-y-[-1px] ${
                            player.isLocked
                              ? "bg-gradient-to-b from-gray-600 to-gray-700 text-gray-300"
                              : "bg-gradient-to-b from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                          }`}>
                        {player.isLocked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Cashed Out Players */}
          {currentGame.players.some(p => !p.isActive) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-300">Cashed Out</h3>
              <div className="space-y-2">
                {currentGame.players
                  .filter(player => !player.isActive)
                  .map((player) => (
                    <div key={player.id} className="bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-gray-400">
                            Final: ${player.currentChips} | P&L: {player.currentChips - player.buyIn >= 0 ? '+' : ''}{player.currentChips - player.buyIn}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setNewPlayerBuyIn(currentGame.defaultBuyIn);
                setShowAddPlayer(true);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex items-center justify-center space-x-2 
                       transition-all duration-200 
                       shadow-[0_6px_14px_rgba(0,0,0,0.35),0_3px_7px_rgba(0,0,0,0.25)] 
                       hover:shadow-[0_8px_18px_rgba(0,0,0,0.45),0_4px_9px_rgba(0,0,0,0.35)]
                       transform hover:translate-y-[-2px]"
            >
              <Users className="w-5 h-5" />
              <span>Add Player</span>
            </button>
            <button
              onClick={() => {
                if (!totalsMatch) {
                  alert("⚠️ Warning: Player chips do not equal the chips on the table! Please double-check before cashing out.");
                } else {
                  cashOutLockedPlayers();
                }
              }}
              disabled={!isOnePlayerLocked}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center space-x-2 
                        transition-all duration-200 
                        shadow-[0_6px_14px_rgba(0,0,0,0.35),0_3px_7px_rgba(0,0,0,0.25)]
                        transform ${
                isOnePlayerLocked
                  ? "bg-yellow-600 hover:bg-yellow-700 hover:shadow-[0_8px_18px_rgba(0,0,0,0.45),0_4px_9px_rgba(0,0,0,0.35)] hover:translate-y-[-2px]"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
              }`}
            >
              <Receipt className="w-5 h-5" />
              <span>Cash Out</span>
            </button>

            <button
              onClick={onEndGame}
              className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded-lg flex items-center justify-center space-x-2 
                       transition-all duration-200 
                       shadow-[0_6px_14px_rgba(0,0,0,0.35),0_3px_7px_rgba(0,0,0,0.25)] 
                       hover:shadow-[0_8px_18px_rgba(0,0,0,0.45),0_4px_9px_rgba(0,0,0,0.35)]
                       transform hover:translate-y-[-2px]"
            >
              <Square className="w-5 h-5" />
              <span>End Game</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rebuy Modal */}
      {showRebuyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-green-900 p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-xl font-semibold mb-4 text-white">Rebuy Chips</h3>
            <input
              type="number"
              min="1"
              value={rebuyAmount}
              onChange={(e) => setRebuyAmount(Number(e.target.value))}
              className="w-full p-3 bg-green-800 border border-green-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-inner mb-4 text-white"
              placeholder="Enter rebuy amount"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowRebuyModal(false);
                  setRebuyPlayerId(null);
                  setRebuyAmount(currentGame.defaultBuyIn); 
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 p-3 rounded-full shadow-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleRebuy}
                className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-md text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameView;