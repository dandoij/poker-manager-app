import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import GameSetup from './components/GameSetup';
import GameView from './components/GameView';
import GameHistory from './components/GameHistory';
import ManagePlayers from './components/ManagePlayers';

const PokerCashGameApp = () => {
  // Main app state
  const [currentView, setCurrentView] = useState('home');
  const [currentGame, setCurrentGame] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [playerProfiles, setPlayerProfiles] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('currentPokerGame');
    const savedHistory = localStorage.getItem('pokerGameHistory');
    const savedPlayerProfiles = localStorage.getItem('playerProfiles');
    
    if (savedGame) {
      setCurrentGame(JSON.parse(savedGame));
    }
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
    if (savedPlayerProfiles) {
      setPlayerProfiles(JSON.parse(savedPlayerProfiles));
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

  useEffect(() => {
    localStorage.setItem('playerProfiles', JSON.stringify(playerProfiles));
  }, [playerProfiles]);

  // Game management functions
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

  // Player profile management functions
  const addPlayerProfile = (profileData) => {
    const newProfile = {
      id: Date.now().toString(),
      name: profileData.name,
      contactInfo: profileData.contactInfo,
      createdAt: new Date().toISOString(),
      sessions: [],
      stats: {
        totalSessions: 0,
        totalBuyIns: 0,
        totalCashOuts: 0,
        netProfit: 0,
        biggestWin: 0,
        biggestLoss: 0
      }
    };
    
    setPlayerProfiles(prev => [...prev, newProfile]);
  };

  const deletePlayerProfile = (profileId) => {
    setPlayerProfiles(prev => prev.filter(profile => profile.id !== profileId));
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home
            currentGame={currentGame}
            gameHistoryCount={gameHistory.length}
            playerProfilesCount={playerProfiles.length}
            onNavigate={setCurrentView}
          />
        );
      case 'setup':
        return (
          <GameSetup
            onStartGame={startNewGame}
            onNavigate={setCurrentView}
          />
        );
      case 'game':
        return (
          <GameView
            currentGame={currentGame}
            setCurrentGame={setCurrentGame}
            onEndGame={endGame}
            onNavigate={setCurrentView}
          />
        );
      case 'history':
        return (
          <GameHistory
            gameHistory={gameHistory}
            onNavigate={setCurrentView}
          />
        );
      case 'managePlayers':
        return (
          <ManagePlayers
            playerProfiles={playerProfiles}
            onAddPlayer={addPlayerProfile}
            onDeletePlayer={deletePlayerProfile}
            onNavigate={setCurrentView}
          />
        );
      default:
        return (
          <Home
            currentGame={currentGame}
            gameHistoryCount={gameHistory.length}
            playerProfilesCount={playerProfiles.length}
            onNavigate={setCurrentView}
          />
        );
    }
  };

  return renderCurrentView();
};

export default PokerCashGameApp;