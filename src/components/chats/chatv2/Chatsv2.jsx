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

import { FaEdit } from "react-icons/fa";

function Chatsv2() {
  const [active, setactive] = useState("chats");
  const [members, setmembers] = useState([]);
  const [myprofile, setmyProfile] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const { userStatus, selectedGroup, isGroupAdmin, openGroupSettingsModal } =
    useContext(ChatContextv2);
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
        <aside className="chats-section p-2 h-screen w-full sm:w-[40%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
           <div className="search-profile flex items-center gap-2 mb-3">
             <div className="relative">
               <img
                 src={myprofile || fallbackAvatar}
                 alt="Profile"
                 className="profile rounded-full border-2 border-blue-500 dark:border-blue-400 w-10 h-10 object-cover shadow-sm"
               />
               <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white dark:border-gray-900 rounded-full"></div>
             </div>

             <div className="search-bar bg-gray-100 dark:bg-gray-800 flex items-center gap-2 w-[70%] rounded-full border border-gray-200 dark:border-gray-600 transition-colors duration-200 hover:border-blue-500 dark:hover:border-blue-400">
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

             <button
               className="members p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
               onClick={() => handleCategories("members")}
             >
               <CiSquarePlus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
             </button>

             {selectedGroup && isGroupAdmin(selectedGroup) && (
               <button
                 className="p-1.5 w-8 h-8 rounded-full bg-orange-400/20 hover:bg-orange-400/40
                  dark:bg-orange-500/30 dark:hover:bg-orange-500/50
                  border border-orange-400 dark:border-orange-500
                  flex items-center justify-center transition-all duration-200 shadow-lg"
                 title="Edit group"
                 onClick={() => openGroupSettingsModal(selectedGroup)}
               >
                 <FaEdit className="w-4 h-4 text-orange-600 dark:text-orange-200" />
               </button>
             )}
           </div>
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
                Add Group
              </button>
            </div>
          </div>

          

          <div className={`conversation-list ${active =="AddGroups" ? "h-[calc(100vh-300px)]" : "h-[calc(100vh-100px)"} overflow-y-auto`}>
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
