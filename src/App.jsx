import React, { useState, useEffect } from 'react';
import { Plus, Minus, DollarSign, Users, Clock, History, Play, Square, ArrowLeft, Receipt, Check, Lock, Unlock } from 'lucide-react';

const PokerCashGameApp = () => {
  // setup home view state
  const [currentView, setCurrentView] = useState('home');
  const [currentGame, setCurrentGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  // setup view state
  const [tableName, setTableName] = useState('');
  const [smallBlind, setSmallBlind] = useState(1);
  const [bigBlind, setBigBlind] = useState(2);
  const [defaultBuyIn, setDefaultBuyIn] = useState(30);

  // game view state
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerBuyIn, setNewPlayerBuyIn] = useState(30);

  // Rebuy state
  const [showRebuyModal, setShowRebuyModal] = useState(false);
  const [rebuyPlayerId, setRebuyPlayerId] = useState(null);
  const [rebuyAmount, setRebuyAmount] = useState(30);

  const handleRebuy = () => {
    if (!isNaN(rebuyAmount) && rebuyAmount > 0 && rebuyPlayerId) {
    setCurrentGame(prev => ({
      ...prev,
      players: prev.players.map(p =>
        p.id === rebuyPlayerId
          ? {
              ...p,
              buyIn: p.buyIn + rebuyAmount,
              currentChips: p.currentChips + rebuyAmount
            }
            : p
          ),
          moneyOnTable: prev.moneyOnTable + rebuyAmount 
        }));
      }
      setRebuyAmount(30);
      setRebuyPlayerId(null);
      setShowRebuyModal(false);
    };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('currentPokerGame');
    const savedHistory = localStorage.getItem('pokerGameHistory');
    
    if (savedGame) {
      setCurrentGame(JSON.parse(savedGame));
    }
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (currentGame) {
      localStorage.setItem('currentPokerGame', JSON.stringify(currentGame));
    }
  }, [currentGame]);

  useEffect(() => {
    localStorage.setItem('pokerGameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  const startNewGame = (gameSettings) => {
    const newGame = {
      id: Date.now().toString(),
      tableName: gameSettings.tableName || 'Poker Game',
      smallBlind: gameSettings.smallBlind || 1,
      bigBlind: gameSettings.bigBlind || 2,
      defaultBuyIn: gameSettings.defaultBuyIn || 30,
      startTime: new Date().toISOString(),
      players: [],
      isActive: true,
      moneyOnTable: 0
    };
    setCurrentGame(newGame);
    setCurrentView('game');
  };

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
    
    setCurrentGame(prev => ({
      ...prev,
      players: [...prev.players, newPlayer],
      moneyOnTable: prev.moneyOnTable + newPlayer.buyIn
    }));
  };

  const updatePlayerChips = (playerId, amount) => {
    setCurrentGame(prev => ({
      ...prev,
      players: prev.players.map(player =>
        player.id === playerId
          ? { ...player, currentChips: Math.max(0, player.currentChips + amount) }
          : player
      )
    }));
  };

  const cashOutPlayer = (playerId) => {
    setCurrentGame(prev => {
      const player = prev.players.find(p => p.id === playerId);
      return {
        ...prev,
        players: prev.players.map(player =>
          player.id === playerId
            ? { ...player, isActive: false, cashOutTime: new Date().toISOString() }
            : player
        ),
        moneyOnTable: prev.moneyOnTable - (player ? player.currentChips : 0)  // 🔥 subtract final stack
      };
    });
  };

  const toggleLockPlayer = (playerId) => {
    setCurrentGame(prev => ({
      ...prev,
      players: prev.players.map(player =>
        player.id === playerId
          ? { ...player, isLocked: !player.isLocked }
          : player
      )
    }));
  };

  const cashOutLockedPlayers = () => {
    setCurrentGame(prev => {
      // calculate total chips being cashed out
      const totalCashOut = prev.players
        .filter(p => p.isLocked && p.isActive)
        .reduce((sum, p) => sum + p.currentChips, 0);

      return {
        ...prev,
        players: prev.players.map(player =>
          player.isLocked && player.isActive
            ? { ...player, isActive: false, cashOutTime: new Date().toISOString() }
            : player
        ),
        moneyOnTable: prev.moneyOnTable - totalCashOut  // 🔥 subtract cashed-out chips
      };
    });
  };

  const endGame = () => {
    const finalGame = {
      ...currentGame,
      endTime: new Date().toISOString(),
      isActive: false
    };
    
    setGameHistory(prev => [finalGame, ...prev]);
    setCurrentGame(null);
    localStorage.removeItem('currentPokerGame');
    setCurrentView('home');
  };

  const getTotalPot = () => {
    if (!currentGame) return 0;
    return currentGame.players
      .filter(p => p.isActive)
      .reduce((sum, player) => sum + player.currentChips, 0);
  };

  const getTotalBuyIns = () => {
    if (!currentGame) return 0;
    return currentGame.players.reduce((sum, player) => sum + player.buyIn, 0);
  };

  const getMoneyOnTable = () => {
    if (!currentGame) return 0;
    return currentGame.players
      .filter(p => p.isActive)
      .reduce((sum, player) => sum + player.currentChips, 0);
  };

  // Home View
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white p-6 transition-all duration-300 ease-in-out">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-green-100 border-b border-yellow-600/40 pb-2"
            style={{ fontFamily: "'Quantico', sans-serif", fontSize: '2.5rem' }}>
            title
          </h1>
          
          <div className="space-y-4">
            {currentGame && (
              <button
                onClick={() => setCurrentView('game')}
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
              onClick={() => setCurrentView('setup')} // or 'game' / 'history'
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
              onClick={() => setCurrentView('history')}
              className="w-full bg-gray-600 hover:bg-gray-700 px-4 rounded-lg
                        h-16 flex items-center justify-between gap-3 transition-all duration-300 ease-in-out"
            >
              <div className="flex-1 text-left flex flex-col justify-center">
                <div className="font-semibold leading-tight">Game History</div>
                <div className="text-sm text-gray-300 leading-tight">{gameHistory.length} games played</div>
              </div>
              <History className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Setup View
  if (currentView === 'setup') {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white p-6 transition-all duration-300 ease-in-out">
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
              onClick={() => setCurrentView('home')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                startNewGame({ tableName: tableName || 'Poker Game', smallBlind, bigBlind, defaultBuyIn });
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

  // Game History View
  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white p-6 transition-all duration-300 ease-in-out">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold mb-6 border-b border-yellow-600/40 pb-2">Game History</h2>
            <button
              onClick={() => setCurrentView('home')}
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
  }

  // Main Game View
  if (currentView === 'game' && currentGame) {
    const isOnePlayerLocked =
      currentGame.players.length > 0 &&
      currentGame.players.filter(p => p.isActive).some(p => p.isLocked);
    const totalsMatch = getTotalPot() === currentGame.moneyOnTable;
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white p-6 transition-all duration-300 ease-in-out">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-bold">{currentGame.tableName}</h1>
                <div className="text-sm text-green-300">
                  Blinds: ${currentGame.smallBlind}/{currentGame.bigBlind}
                </div>
              </div>
              <button
                onClick={() => setCurrentView('home')}
                className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
              <ArrowLeft className="w-6 h-6" />
              </button>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-green-800/80 p-3 rounded-xl text-center shadow-md">
                <div className="text-sm text-gray-300 flex items-center justify-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Active</span>
                </div>
                <div className="text-xl font-bold">
                  {currentGame.players.filter(p => p.isActive).length}
                </div>
              </div>
              <div className="bg-green-800/80 p-3 rounded-xl text-center shadow-md">
                <div className="text-sm text-gray-300 flex items-center justify-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Player Total</span> 
                </div>
                <div className="text-xl font-bold">${getTotalPot()}</div>
              </div>
              <div className="bg-green-800/80 p-3 rounded-xl text-center shadow-md">
                <div className="text-sm text-gray-300 flex items-center justify-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>On Table</span>
                </div>
                <div className="text-xl font-bold">${currentGame.moneyOnTable}</div>
              </div>
            </div>

            {/* Add Player Section */}
            {showAddPlayer && (
              <div className="bg-green-800 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-3">Add Player</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    className="w-full p-2 bg-green-700 border border-green-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Buy-in amount"
                    value={newPlayerBuyIn}
                    onChange={(e) => setNewPlayerBuyIn(Number(e.target.value))}
                    className="w-full p-2 bg-green-700 border border-green-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowAddPlayer(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 p-2 rounded transition-colors"
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
                      className="flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors"
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
                    <div key={player.id} className="bg-gradient-to-r from-green-800 to-green-700 p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="font-semibold text-lg">{player.name}</div>
                          <div className="text-sm">
                            <span className="text-gray-300">Buy-in: ${player.buyIn}</span> |
                            <span className={profit >= 0 ? "text-green-400 ml-1" : "text-red-400 ml-1"}>
                              P&L: {profit >= 0 ? "+" : ""}{profit}
                            </span>
                          </div>
                        </div>
                        <div className="text-xl font-bold">${player.currentChips}</div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updatePlayerChips(player.id, -5)}
                          disabled={player.isLocked}
                          className={`p-2 rounded-full transition-colors shadow-md ${
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
                          className={`px-3 py-1 rounded-full text-sm transition-colors shadow-md ${
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
                          className={`px-3 py-1 rounded-full text-sm transition-colors shadow-md ${
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
                          className={`p-2 rounded-full transition-colors shadow-m ${
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
                          className={`px-3 py-1 rounded-full text-sm transition-colors shadow-md ${
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
                          className={`p-2 rounded-full transition-colors shadow-md ml-auto ${
                              player.isLocked
                                ? "bg-gray-600 text-gray-300"
                                : "bg-green-600 hover:bg-green-700"
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

            {/* Cashed Out Players (unchanged) */}
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
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
                className={`flex-1 p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                  isOnePlayerLocked
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }`}
              >
                <Receipt className="w-5 h-5" />
                <span>Cash Out</span>
              </button>

              <button
                onClick={endGame}
                className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Square className="w-5 h-5" />
                <span>End Game</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rebuy Modal — now INSIDE the return */}
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
  }

  return null;
};

export default PokerCashGameApp;