// import { CiSearch } from "react-icons/ci";
// import { CiSquarePlus } from "react-icons/ci";
// import ConversationList from "./ConversationList";
// import GroupList from "./GroupList";
// import { useState } from "react";
// import Unread from "./Unread";
// import ChatWindow from "./ChatWindow";
// import AddGroup from "./AddGroup";
// import Members from "./Members";
// import { useEffect } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import fallbackAvatar from '../../../assets/logo/logo-eye.webp';

// function Chatsv2() {
//     const [active, setactive] = useState('chats')
//     const [members, setmembers] = useState([])
//     const [myprofile, setmyProfile] = useState()
//     const [searchTerm, setSearchTerm] = useState("");

//     const { userstatus } = useContext(ChatContextv2)
//     const employeeId = localStorage.getItem('employeeId');

//     useEffect(() => {
//         const users = async () => {
//             const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/chat/member`)
//             setmembers(response.data.data)
//             const me = response.data.data.find(m => m.employee_Id === employeeId);
//             if (me) {
//                 setmyProfile(me.user_Avatar);
//             }

//         }

//         users();

//     }, [])

//     const handleCategories = (category) => {
//         setactive(category)
//     }
//     return (
//         <div className="container">
//             <div className="inner-section flex rounded-xl dark:bg-black bg-white">
//                 <aside className="chats-section p-3 h-screen w-[40%] border border-gray-400 rounded-tl-xl rounded-bl-xl overflow-y-auto">
//                     <div className="search-profile flex gap-4">
//                         <img src={myprofile || fallbackAvatar} alt={myprofile} className="profile rounded-full border-2 dark:border-blue-500 h-12 w-12 object-cover" />

//                         <div className="search-bar dark:bg-black bg-gray-100 flex gap-4 w-full rounded-full items-center border-2 dark:border-gray-600">
//                             <div className="search-icon rounded-full dark:bg-gray-200 bg-white h-full w-11 flex justify-center items-center">
//                                 <CiSearch className="text-black w-7 h-7" />
//                             </div>
//                             <input type="text" placeholder="search.." className="border-none dark:bg-black bg-gray-100 text-black outline-none rounded-full" value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)} />
//                         </div>
//                         <button className="members flex justify-center items-center" onClick={() => handleCategories("members")}>
//                             <CiSquarePlus className="w-8 h-8" />
//                         </button>
//                     </div>
//                     <div className="categories">
//                         <div className="categories-inner flex justify-center dark:bg-gray-400 bg-gray-100 p-3 my-4 rounded-full gap-4">
//                             <button className={`${active == 'chats' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'}  p-2 rounded-xl w-full`} onClick={() => handleCategories('chats')}>Chats</button>
//                             <button className={`${active == 'unread' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'}  p-2 rounded-xl w-full`} onClick={() => handleCategories('unread')}>Unread</button>
//                             <button className={`${active == 'Groups' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'}  p-2 rounded-xl w-full`} onClick={() => handleCategories('Groups')}>Groups</button>
//                             <button className={`${active == 'AddGroups' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'} p-2 rounded-xl w-full`} onClick={() => handleCategories('AddGroups')}>+Group</button>
//                         </div>
//                     </div>
//                     <div className={`status ${active == 'members' ? 'hidden' : ''}`}>
//                         <div className="inner-status">
//                             <div className="top flex justify-between items-center">
//                                 <h2 className="text-md font-bold">Online Now</h2>
//                                 <span className="text-sm cursor-pointer" onClick={() => handleCategories("members")}>See All</span>
//                             </div>
//                             <div className="profile-status flex gap-5 my-4 w-full overflow-x-auto whitespace-nowrap no-scrollbar">
//                                 {
//                                     members
//                                         .filter(member => member.isOnline)
//                                         .map((member, index) => (
//                                             <div key={index} className="relative inline-block text-center mr-4">
//                                                 <div className="relative w-12 h-12">
//                                                     <img
//                                                         src={member.user_Avatar}
//                                                         alt={member.first_Name}
//                                                         className="rounded-full w-12 h-12 border border-gray-300 object-cover"
//                                                     />
//                                                     <span
//                                                         className="absolute bottom-0 right-0 w-3 h-3 bg-[#2B85FF] rounded-full border-2 border-white"
//                                                         title="Online"
//                                                     ></span>
//                                                 </div>
//                                                 <p className="text-sm text-gray-400 mt-2">{member.first_Name}</p>
//                                             </div>
//                                         ))
//                                 }

//                             </div>

//                         </div>
//                     </div>

//                     <div className="conversation-list">
//                         {
//                             active == 'chats' ? <ConversationList searchTerm={searchTerm} /> :
//                                 active == 'Groups' ? <GroupList searchTerm={searchTerm} /> :
//                                     active == 'AddGroups' ? <AddGroup /> :
//                                         active == 'unread' ? <Unread searchTerm={searchTerm} /> :
//                                             active == 'members' ? <Members searchTerm={searchTerm} /> :
//                                                 null
//                         }
//                     </div>
//                 </aside>
//                 <section className="conversation w-full border-gray-400">
//                     <div className="overflow-hidden h-screen">
//                         <ChatWindow />
//                     </div>
//                 </section>
//             </div>
//         </div>
//     )
// }

// export default Chatsv2

// import { CiSearch } from "react-icons/ci";
// import { CiSquarePlus } from "react-icons/ci";
// import ConversationList from "./ConversationList";
// import GroupList from "./GroupList";
// import { useState } from "react";
// import Unread from "./Unread";
// import ChatWindow from "./ChatWindow";
// import AddGroup from "./AddGroup";
// import Members from "./Members";
// import { useEffect } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { ChatContextv2 } from "../../../contexts/ChatContextv2";
// import fallbackAvatar from "../../../assets/logo/logo-eye.webp";

// function Chatsv2() {
//   const [active, setactive] = useState("chats");
//   const [members, setmembers] = useState([]);
//   const [myprofile, setmyProfile] = useState();
//   const [searchTerm, setSearchTerm] = useState("");

//   const { userstatus } = useContext(ChatContextv2);
//   const employeeId = localStorage.getItem("employeeId");

//   useEffect(() => {
//     const users = async () => {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/chat/member`
//       );
//       setmembers(response.data.data);
//       const me = response.data.data.find((m) => m.employee_Id === employeeId);
//       if (me) {
//         setmyProfile(me.user_Avatar);
//       }
//     };

//     users();
//   }, []);

//   const handleCategories = (category) => {
//     setactive(category);
//   };

//   return (
//     <div className="container mx-auto   h-[calc(100vh-150px)] ">
//       <div className="inner-section flex rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-138px)]">
//         {/* Sidebar */}
//         <aside className="chats-section p-4 h-screen w-full sm:w-[40%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
//           {/* Header Section */}
//           <div className="search-profile flex items-center gap-4 mb-6">
//             {/* Profile Image */}
//             <div className="relative">
//               <img
//                 src={myprofile || fallbackAvatar}
//                 alt="Profile"
//                 className="profile rounded-full border-2 border-blue-500 dark:border-blue-400 h-12 w-12 object-cover shadow-md"
//               />
//               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
//             </div>

//             {/* Search Bar */}
//             <div className="search-bar bg-gray-100 dark:bg-gray-800 flex items-center gap-3 w-full rounded-full border border-gray-200 dark:border-gray-600 transition-colors duration-200 hover:border-blue-500 dark:hover:border-blue-400">
//               <div className="search-icon rounded-full bg-white dark:bg-gray-700 h-10 w-10 flex justify-center items-center ml-1 shadow-sm">
//                 <CiSearch className="text-gray-600 dark:text-gray-300 w-5 h-5" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search conversations..."
//                 className="bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none flex-1 pr-4 text-sm"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Add Members Button */}
//             <button
//               className="members p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
//               onClick={() => handleCategories("members")}
//             >
//               <CiSquarePlus className="w-6 h-6 text-gray-600 dark:text-gray-300" />
//             </button>
//           </div>

//           {/* Categories Section */}
//           <div className="categories mb-6">
//             <div className="categories-inner flex justify-center bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl gap-1 border border-gray-200 dark:border-gray-600">
//               <button
//                 className={`${
//                   active === "chats"
//                     ? "bg-blue-500 text-white shadow-md"
//                     : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 } px-4 py-2 rounded-xl w-full transition-all duration-200 text-sm font-medium`}
//                 onClick={() => handleCategories("chats")}
//               >
//                 Chats
//               </button>
//               <button
//                 className={`${
//                   active === "unread"
//                     ? "bg-blue-500 text-white shadow-md"
//                     : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 } px-4 py-2 rounded-xl w-full transition-all duration-200 text-sm font-medium`}
//                 onClick={() => handleCategories("unread")}
//               >
//                 Unread
//               </button>
//               <button
//                 className={`${
//                   active === "Groups"
//                     ? "bg-blue-500 text-white shadow-md"
//                     : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 } px-4 py-2 rounded-xl w-full transition-all duration-200 text-sm font-medium`}
//                 onClick={() => handleCategories("Groups")}
//               >
//                 Groups
//               </button>
//               <button
//                 className={`${
//                   active === "AddGroups"
//                     ? "bg-blue-500 text-white shadow-md"
//                     : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 } px-4 py-2 rounded-xl w-full transition-all duration-200 text-sm font-medium`}
//                 onClick={() => handleCategories("AddGroups")}
//               >
//                 +Group
//               </button>
//             </div>
//           </div>

//           {/* Online Status Section */}
//           <div
//             className={`status mb-6 ${active === "members" ? "hidden" : ""}`}
//           >
//             <div className="inner-status">
//               <div className="top flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
//                   Online Now
//                 </h2>
//                 <span
//                   className="text-sm text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
//                   onClick={() => handleCategories("members")}
//                 >
//                   See All
//                 </span>
//               </div>

//               {/* Online Members */}
//               <div className="profile-status flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar pb-2 ">
//                 {members
//                   .filter((member) => member.isOnline)
//                   .map((member, index) => (
//                     <div
//                       key={index}
//                       className="relative inline-block text-center flex-shrink-0"
//                     >
//                       <div className="relative w-12 h-12">
//                         <img
//                           src={member.user_Avatar}
//                           alt={member.first_Name}
//                           className="rounded-full w-12 h-12 border-2 border-gray-200 dark:border-gray-600 object-cover shadow-sm"
//                         />
//                         <span
//                           className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
//                           title="Online"
//                         ></span>
//                       </div>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate w-12">
//                         {member.first_Name}
//                       </p>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>

//           {/* Conversation List */}
//           <div className="conversation-list  h-[calc(100vh-460px)] ">
//             {active === "chats" ? (
//               <ConversationList searchTerm={searchTerm} />
//             ) : active === "Groups" ? (
//               <GroupList searchTerm={searchTerm} />
//             ) : active === "AddGroups" ? (
//               <AddGroup />
//             ) : active === "unread" ? (
//               <Unread searchTerm={searchTerm} />
//             ) : active === "members" ? (
//               <Members searchTerm={searchTerm} />
//             ) : null}
//           </div>
//         </aside>

//         {/* Main Chat Section */}
//         <section className="conversation w-full bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-[calc(100vh-150px)]">
//           <div className="overflow-hidden h-[calc(100vh-150px)]">
//             <ChatWindow />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Chatsv2;



import { CiSearch } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import ConversationList from "./ConversationList";
import GroupList from "./GroupList";
import { useState } from "react";
import Unread from "./Unread";
import ChatWindow from "./ChatWindow";
import AddGroup from "./AddGroup";
import Members from "./Members";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { ChatContextv2 } from "../../../contexts/ChatContextv2";
import fallbackAvatar from "../../../assets/logo/logo-eye.webp";

function Chatsv2() {
  const [active, setactive] = useState("chats");
  const [members, setmembers] = useState([]);
  const [myprofile, setmyProfile] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const { userstatus } = useContext(ChatContextv2);
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const users = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/chat/member`
      );
      setmembers(response.data.data);
      const me = response.data.data.find((m) => m.employee_Id === employeeId);
      if (me) {
        setmyProfile(me.user_Avatar);
      }
    };

    users();
  }, []);

  const handleCategories = (category) => {
    setactive(category);
  };

  return (
    <div className="container mx-auto h-[calc(100vh-150px)]">
      <div className="inner-section flex rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-136px)]">
        {/* Sidebar */}
        <aside className="chats-section p-2 h-screen w-full sm:w-[40%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          {/* Header Section */}
          <div className="search-profile flex items-center gap-2 mb-3">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={myprofile || fallbackAvatar}
                alt="Profile"
                className="profile rounded-full border-2 border-blue-500 dark:border-blue-400 h-8 w-8 object-cover shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white dark:border-gray-900 rounded-full"></div>
            </div>

            {/* Search Bar */}
            <div className="search-bar bg-gray-100 dark:bg-gray-800 flex items-center gap-2 w-full rounded-full border border-gray-200 dark:border-gray-600 transition-colors duration-200 hover:border-blue-500 dark:hover:border-blue-400">
              <div className="search-icon rounded-full bg-white dark:bg-gray-700 h-8 w-8 flex justify-center items-center ml-0.5 shadow-sm">
                <CiSearch className="text-gray-600 dark:text-gray-300 w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none flex-1 pr-2 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add Members Button */}
            <button
              className="members p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
              onClick={() => handleCategories("members")}
            >
              <CiSquarePlus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Categories Section */}
          <div className="categories mb-3">
            <div className="categories-inner flex justify-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl gap-0.5 border border-gray-200 dark:border-gray-600">
              <button
                className={`${
                  active === "chats"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                } px-2 py-1.5 rounded-lg w-full transition-all duration-200 text-xs font-medium`}
                onClick={() => handleCategories("chats")}
              >
                Chats
              </button>
              <button
                className={`${
                  active === "unread"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                } px-2 py-1.5 rounded-lg w-full transition-all duration-200 text-xs font-medium`}
                onClick={() => handleCategories("unread")}
              >
                Unread
              </button>
              <button
                className={`${
                  active === "Groups"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                } px-2 py-1.5 rounded-lg w-full transition-all duration-200 text-xs font-medium`}
                onClick={() => handleCategories("Groups")}
              >
                Groups
              </button>
              <button
                className={`${
                  active === "AddGroups"
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                } px-2 py-1.5 rounded-lg w-full transition-all duration-200 text-xs font-medium`}
                onClick={() => handleCategories("AddGroups")}
              >
                +Group
              </button>
            </div>
          </div>

          {/* Online Status Section */}
          <div
            className={`status mb-3 ${active === "members" ? "hidden" : ""}`}
          >
            <div className="inner-status">
              <div className="top flex justify-between items-center mb-2">
                <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Online Now
                </h2>
                <span
                  className="text-xs text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
                  onClick={() => handleCategories("members")}
                >
                  See All
                </span>
              </div>

              {/* Online Members */}
              <div className="profile-status flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
                {members
                  .filter((member) => member.isOnline)
                  .map((member, index) => (
                    <div
                      key={index}
                      className="relative inline-block text-center flex-shrink-0"
                    >
                      <div className="relative w-8 h-8">
                        <img
                          src={member.user_Avatar}
                          alt={member.first_Name}
                          className="rounded-full w-8 h-8 border border-gray-200 dark:border-gray-600 object-cover shadow-sm"
                        />
                        <span
                          className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-900"
                          title="Online"
                        ></span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate w-10 text-center">
                        {member.first_Name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Conversation List */}
          <div className="conversation-list h-[calc(100vh-340px)]">
            {active === "chats" ? (
              <ConversationList searchTerm={searchTerm} />
            ) : active === "Groups" ? (
              <GroupList searchTerm={searchTerm} />
            ) : active === "AddGroups" ? (
              <AddGroup />
            ) : active === "unread" ? (
              <Unread searchTerm={searchTerm} />
            ) : active === "members" ? (
              <Members searchTerm={searchTerm} />
            ) : null}
          </div>
        </aside>

        {/* Main Chat Section */}
        <section className="conversation w-full bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-[calc(100vh-120px)]">
          <div className="overflow-hidden h-[calc(100vh-130px)]">
            <ChatWindow />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Chatsv2;