import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, Minus, TrendingUp, TrendingDown } from 'lucide-react';

const ManagePlayers = ({ 
  playerProfiles, 
  onAddPlayer, 
  onDeletePlayer, 
  onNavigate 
}) => {
  const [showAddPlayerProfile, setShowAddPlayerProfile] = useState(false);
  const [newPlayerProfile, setNewPlayerProfile] = useState({
    name: '',
    contactInfo: { venmo: '', phone: '' }
  });

  const handleAddPlayer = () => {
    if (newPlayerProfile.name.trim()) {
      onAddPlayer(newPlayerProfile);
      setNewPlayerProfile({
        name: '',
        contactInfo: { venmo: '', phone: '' }
      });
      setShowAddPlayerProfile(false);
    }
  };

  const handleCancel = () => {
    setShowAddPlayerProfile(false);
    setNewPlayerProfile({
      name: '',
      contactInfo: { venmo: '', phone: '' }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #000000 50%, #374151 100%)' }}>
      {/* Add custom styles */}
      <style>{`
        .add-player-btn {
          background-color: rgba(55, 65, 81, 0.2);
          border-color: rgba(75, 85, 99, 0.2);
          backdrop-filter: blur(10px);
        }
        .add-player-btn:hover {
          background-color: rgba(75, 85, 99, 0.4) !important;
          border-color: rgba(107, 114, 128, 0.4) !important;
          box-shadow: 0 10px 25px -5px rgba(75, 85, 99, 0.15) !important;
        }
        .cancel-btn {
          background-color: rgba(75, 85, 99, 0.4);
          border-color: rgba(107, 114, 128, 0.3);
          backdrop-filter: blur(10px);
        }
        .cancel-btn:hover {
          background-color: rgba(107, 114, 128, 0.6);
          border-color: rgba(156, 163, 175, 0.5);
        }
        
        .confirm-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px -2px rgba(16, 185, 129, 0.2);
        }
        .confirm-btn:hover {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
          box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.3);
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
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Players</h2>
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

        {/* Add Player Profile Section */}
        {showAddPlayerProfile && (
          <div 
            className="rounded-2xl p-6 mb-6 border"
            style={{ 
              backgroundColor: 'rgba(55, 65, 81, 0.3)',
              borderColor: 'rgba(75, 85, 99, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <h3 className="text-white font-semibold text-lg mb-4">Add New Player</h3>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Player name"
                  value={newPlayerProfile.name}
                  onChange={(e) => setNewPlayerProfile(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  className="w-full p-3 rounded-xl border text-white placeholder-gray-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                           transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    borderColor: 'rgba(75, 85, 99, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Venmo username (optional)"
                  value={newPlayerProfile.contactInfo.venmo}
                  onChange={(e) => setNewPlayerProfile(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, venmo: e.target.value }
                  }))}
                  className="w-full p-3 rounded-xl border text-white placeholder-gray-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                           transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    borderColor: 'rgba(75, 85, 99, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone number (optional)"
                  value={newPlayerProfile.contactInfo.phone}
                  onChange={(e) => setNewPlayerProfile(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, phone: e.target.value }
                  }))}
                  className="w-full p-3 rounded-xl border text-white placeholder-gray-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                           transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    borderColor: 'rgba(75, 85, 99, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleCancel}
                  className="cancel-btn flex-1 p-3 rounded-xl border text-white font-medium
                           transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPlayer}
                  className="confirm-btn flex-1 p-3 rounded-xl text-white font-medium
                           transition-all duration-200 transform hover:scale-105"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Player Button */}
        {!showAddPlayerProfile && (
          <button
            onClick={() => setShowAddPlayerProfile(true)}
            className="add-player-btn w-full rounded-2xl p-4 mb-6 
                     flex items-center justify-center space-x-3 
                     transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Players List */}
        {playerProfiles.length === 0 ? (
          <div className="text-center mt-16">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ 
                backgroundColor: 'rgba(75, 85, 99, 0.2)',
                border: '1px solid rgba(107, 114, 128, 0.2)'
              }}
            >
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Players Yet</h3>
            <p className="text-gray-400 text-sm mb-1">Add players to track their stats</p>
            <p className="text-gray-500 text-xs">and manage your poker network</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white"></h3>
              <div className="text-sm text-gray-400">{playerProfiles.length} player{playerProfiles.length !== 1 ? 's' : ''}</div>
            </div>
            
            {playerProfiles.map((profile) => (
              <div 
                key={profile.id} 
                className="rounded-2xl p-4 border transition-all duration-300 transform hover:scale-[1.02]"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-2">{profile.name}</h4>
                    {(profile.contactInfo.venmo || profile.contactInfo.phone) && (
                      <div className="space-y-1">
                        {profile.contactInfo.venmo && (
                          <div className="text-gray-300 text-sm">@{profile.contactInfo.venmo}</div>
                        )}
                        {profile.contactInfo.phone && (
                          <div className="text-gray-300 text-sm">{profile.contactInfo.phone}</div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onDeletePlayer(profile.id)}
                    className="rounded-full p-2 transition-all duration-200 transform hover:scale-110"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                    }}
                  >
                    <Minus className="w-4 h-4 text-red-400" />
                  </button>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div 
                    className="rounded-xl p-3 border"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.3)',
                      borderColor: 'rgba(75, 85, 99, 0.2)'
                    }}
                  >
                    <div className="text-gray-400 text-xs font-medium mb-1">SESSIONS</div>
                    <div className="text-white font-bold text-lg">{profile.stats.totalSessions}</div>
                  </div>
                  <div 
                    className="rounded-xl p-3 border"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.3)',
                      borderColor: 'rgba(75, 85, 99, 0.2)'
                    }}
                  >
                    <div className="text-gray-400 text-xs font-medium mb-1">NET P&L</div>
                    <div className={`font-bold text-lg flex items-center gap-1 ${
                      profile.stats.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {profile.stats.netProfit >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {profile.stats.netProfit >= 0 ? '+' : ''}${profile.stats.netProfit}
                    </div>
                  </div>
                </div>

                {profile.stats.totalSessions > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div 
                      className="rounded-xl p-3 border"
                      style={{ 
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderColor: 'rgba(16, 185, 129, 0.2)'
                      }}
                    >
                      <div className="text-emerald-300 text-xs font-medium mb-1">BIGGEST WIN</div>
                      <div className="text-emerald-400 font-semibold">+${profile.stats.biggestWin}</div>
                    </div>
                    <div 
                      className="rounded-xl p-3 border"
                      style={{ 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderColor: 'rgba(239, 68, 68, 0.2)'
                      }}
                    >
                      <div className="text-red-300 text-xs font-medium mb-1">BIGGEST LOSS</div>
                      <div className="text-red-400 font-semibold">${profile.stats.biggestLoss}</div>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 pt-2 border-t border-gray-700/30">
                  Added {new Date(profile.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePlayers;