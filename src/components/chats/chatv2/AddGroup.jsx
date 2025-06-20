import React, { useState, useContext } from 'react';
import { ChatContextv2 } from '../../../contexts/ChatContextv2';
import toast from 'react-hot-toast';
import { getsocket } from '../../../service/socketService';

export default function AddGroup({ onClose }) {
  const { employeeId, members } = useContext(ChatContextv2);
  const [groupName, setGroupName] = useState('');
  const [groupIcon, setGroupIcon] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [creating, setCreating] = useState(false);

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast.error('Group name is required.');
      return;
    }

    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member.');
      return;
    }

    const socket = getsocket();
    if (!socket) {
      toast.error('Socket not connected.');
      return;
    }

    setCreating(true);

    const payload = {
      groupName,
      admin: employeeId,
      members: selectedMembers,
      groupIcon 
    };

    socket.emit('createGroup', payload, (res) => {
      setCreating(false);
      if (res.success) {
        toast.success('Group created successfully!');
        if (onClose) onClose();
      } else {
        toast.error(res.message || 'Failed to create group.');
      }
    });
  };

  return (
    <div className="p-4 relative h-full overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Create New Group</h2>

      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group Name"
        className="w-full p-2 border rounded mb-4"
      />
      <input type="file" placeholder="Group Icon" onChange={(e) => setGroupIcon(e.target.value)}
        className="w-full p-2 border rounded mb-4" />

      <div className="mb-4 max-h-72 overflow-y-auto pr-2">
        <h3 className="font-medium mb-2">Select Members</h3>
        {members.map((member) => {
          if (member.employeeId === employeeId) return null;

          const isSelected = selectedMembers.includes(member.employeeId);

          return (
            <div
              key={member.employeeId}
              onClick={() => toggleMember(member.employeeId)}
              className={`flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all ${isSelected
                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                : 'bg-white text-black'
                }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.user_Avatar || 'https://via.placeholder.com/40'}
                  alt={member.firstName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{member.firstName} {member.lastName}</p>
                  <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                    {member.employeeId}
                  </p>
                </div>
              </div>

              {isSelected && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-bold">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-6">

        <button
          onClick={handleCreateGroup}
          disabled={creating}
          className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center text-xl shadow-lg hover:bg-blue-700 transition"
          title="Create Group"
        >
          {creating ? '...' : '➤'}
        </button>
      </div>
    </div>
  );
}
