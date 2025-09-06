import React, { useState } from 'react';
import { ArrowLeft, Plus, Users, Minus } from 'lucide-react';

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
    <div className="min-h-screen bg-green-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold border-b border-yellow-600/40 pb-2">Manage Players</h2>
          <button
            onClick={() => onNavigate('home')}
            className="bg-gray-600 hover:bg-gray-700 p-2 rounded-lg transition-colors
                     shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                     transform hover:translate-y-[-1px]"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Add Player Profile Section */}
        {showAddPlayerProfile && (
          <div className="bg-gradient-to-br from-green-700 to-green-800 p-4 rounded-xl mb-4
                        shadow-[0_8px_20px_rgba(0,0,0,0.35),0_4px_10px_rgba(0,0,0,0.25)]
                        border border-green-600/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-3 text-white">Add New Player</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Player name"
                value={newPlayerProfile.name}
                onChange={(e) => setNewPlayerProfile(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                className="w-full p-2 bg-green-800/80 border border-green-600/60 rounded 
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              />
              <input
                type="text"
                placeholder="Venmo username (optional)"
                value={newPlayerProfile.contactInfo.venmo}
                onChange={(e) => setNewPlayerProfile(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, venmo: e.target.value }
                }))}
                className="w-full p-2 bg-green-800/80 border border-green-600/60 rounded 
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              />
              <input
                type="text"
                placeholder="Phone number (optional)"
                value={newPlayerProfile.contactInfo.phone}
                onChange={(e) => setNewPlayerProfile(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, phone: e.target.value }
                }))}
                className="w-full p-2 bg-green-800/80 border border-green-600/60 rounded 
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 p-2 rounded transition-all duration-200 
                           shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                           transform hover:translate-y-[-1px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPlayer}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 p-2 rounded transition-all duration-200 
                           shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
                           transform hover:translate-y-[-1px]"
                >
                  Add Player
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Player Button */}
        {!showAddPlayerProfile && (
          <button
            onClick={() => setShowAddPlayerProfile(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg mb-6 
                     flex items-center justify-center space-x-2 transition-all duration-200 
                     shadow-[0_6px_14px_rgba(0,0,0,0.35),0_3px_7px_rgba(0,0,0,0.25)] 
                     hover:shadow-[0_8px_18px_rgba(0,0,0,0.45),0_4px_9px_rgba(0,0,0,0.35)]
                     transform hover:translate-y-[-2px]"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Player</span>
          </button>
        )}

        {/* Players List */}
        {playerProfiles.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <p>No players saved yet</p>
            <p className="text-sm">Add players to track their stats across games</p>
          </div>
        ) : (
          <div className="space-y-3">
            {playerProfiles.map((profile) => (
              <div key={profile.id} className="bg-gradient-to-br from-green-700 to-green-800 p-4 rounded-xl
                                             shadow-[0_8px_16px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.2)] 
                                             border border-green-600/30 hover:shadow-[0_12px_20px_rgba(0,0,0,0.4),0_6px_10px_rgba(0,0,0,0.3)] 
                                             transform hover:translate-y-[-2px] transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{profile.name}</h3>
                    <div className="text-sm text-gray-200 space-y-1">
                      {profile.contactInfo.venmo && (
                        <div>Venmo: @{profile.contactInfo.venmo}</div>
                      )}
                      {profile.contactInfo.phone && (
                        <div>Phone: {profile.contactInfo.phone}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onDeletePlayer(profile.id)}
                    className="bg-red-600 hover:bg-red-700 p-1.5 rounded transition-all duration-200
                             shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.4)]
                             transform hover:translate-y-[-1px]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-800/50 p-2 rounded">
                    <div className="text-gray-300">Sessions</div>
                    <div className="font-semibold">{profile.stats.totalSessions}</div>
                  </div>
                  <div className="bg-green-800/50 p-2 rounded">
                    <div className="text-gray-300">Net P&L</div>
                    <div className={`font-semibold ${profile.stats.netProfit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {profile.stats.netProfit >= 0 ? '+' : ''}${profile.stats.netProfit}
                    </div>
                  </div>
                </div>

                {profile.stats.totalSessions > 0 && (
                  <div className="grid grid-cols-2 gap-3 text-sm mt-2">
                    <div className="bg-green-800/50 p-2 rounded">
                      <div className="text-gray-300">Biggest Win</div>
                      <div className="font-semibold text-green-300">+${profile.stats.biggestWin}</div>
                    </div>
                    <div className="bg-green-800/50 p-2 rounded">
                      <div className="text-gray-300">Biggest Loss</div>
                      <div className="font-semibold text-red-300">${profile.stats.biggestLoss}</div>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-2">
                  Added: {new Date(profile.createdAt).toLocaleDateString()}
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