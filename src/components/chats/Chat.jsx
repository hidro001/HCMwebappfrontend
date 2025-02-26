
import ChatHome from './ChatHome'

export default function Chat() {
  return (
   <>
   <ChatHome/>
   </>
  )
}



// import React, { useState } from 'react';
// import ChatWindow from './v2/ChatWindow';
// import Conversation from './v2/Conversation';
// import List from './v2/List';

// export default function Chat() {
//   const [selectedUser, setSelectedUser] = useState(null);

//   // When a user is selected from the List, update state
//   const handleSelectUser = (user) => {
//     setSelectedUser(user);
//   };

//   // Optionally, a function to reset the selected user (e.g. back button)
//   const handleBack = () => {
//     setSelectedUser(null);
//   };

//   return (
//     <div className="h-screen flex flex-col md:flex-row">
//       {selectedUser ? (
//         <>
//           {/* Conversation list (left side) */}
//           <div className="md:w-1/3 border-r border-gray-200 dark:border-gray-700">
//             <Conversation selectedUser={selectedUser} onBack={handleBack} />
//           </div>
//           {/* Chat window (right side) */}
//           <div className="md:w-2/3">
//             <ChatWindow selectedUser={selectedUser} />
//           </div>
//         </>
//       ) : (
//         // When no user is selected, show the full list
//         <div className="w-full">
//           <List onSelectUser={handleSelectUser} />
//         </div>
//       )}
//     </div>
//   );
// }
