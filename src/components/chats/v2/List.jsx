import React, { useState, useEffect } from 'react';
import { fetchAllMember, fetchConversations } from '../../../service/chatService'; // adjust the import paths

// Component to display conversations for a selected contact
const ConversationList = ({ contactId, contactName }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!contactId) return;

    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetchConversations(contactId);
        // Assuming the API returns the conversation messages in response.data.conversations
        setConversations(response.data.conversations);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Error fetching conversations');
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [contactId]);

  if (loading) return <div>Loading conversation...</div>;
  if (error) return <div>{error}</div>;
  if (conversations.length === 0)
    return <div>No conversation found with {contactName}.</div>;

  return (
    <div>
      <h3>Conversation with {contactName}</h3>
      <ul>
        {conversations.map((msg) => (
          <li key={msg.id}>
            {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

const List = () => {
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [errorMembers, setErrorMembers] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetchAllMember();
        // Extract the array from response.data.data
        setMembers(response.data.data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setErrorMembers("Error fetching members");
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);

  if (loadingMembers) return <div>Loading contacts...</div>;
  if (errorMembers) return <div>{errorMembers}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Contact List */}
      <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h2>Contacts</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {members.map((member) => (
            <li 
              key={member._id}
              style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
              onClick={() => setSelectedMember(member)}
            >
              {member.first_Name} {member.last_Name} - {member.designation}
            </li>
          ))}
        </ul>
      </div>

      {/* Conversation View */}
      <div style={{ width: '70%', padding: '20px', overflowY: 'auto' }}>
        {selectedMember ? (
          <ConversationList 
            contactId={selectedMember._id} 
            contactName={`${selectedMember.first_Name} ${selectedMember.last_Name}`}
          />
        ) : (
          <div>Select a contact to start the conversation</div>
        )}
      </div>
    </div>
  );
};

export default List;
