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
import fallbackAvatar from '../../../assets/logo/logo-eye.webp';

function Chatsv2() {
    const [active, setactive] = useState('chats')
    const [members, setmembers] = useState([])
    const [myprofile, setmyProfile] = useState()
    const [searchTerm, setSearchTerm] = useState("");

    const { userstatus } = useContext(ChatContextv2)
    const employeeId = localStorage.getItem('employeeId');

    useEffect(() => {
        const users = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/chat/member`)
            setmembers(response.data.data)
            const me = response.data.data.find(m => m.employee_Id === employeeId);
            if (me) {
                setmyProfile(me.user_Avatar);
            }

        }

        users();

    }, [])



    const handleCategories = (category) => {
        setactive(category)
    }
    return (
        <div className="container">
            <div className="inner-section flex rounded-xl dark:bg-black bg-white">
                <aside className="chats-section p-3 h-screen w-[40%] border border-gray-400 rounded-tl-xl rounded-bl-xl overflow-y-auto">
                    <div className="search-profile flex gap-4">
                        <img src={myprofile || fallbackAvatar} alt={myprofile} className="profile rounded-full border-2 dark:border-blue-500 h-12 w-12 object-cover" />

                        <div className="search-bar dark:bg-black bg-gray-100 flex gap-4 w-full rounded-full items-center border-2 dark:border-gray-600">
                            <div className="search-icon rounded-full dark:bg-gray-200 bg-white h-full w-11 flex justify-center items-center">
                                <CiSearch className="text-black w-7 h-7" />
                            </div>
                            <input type="text" placeholder="search.." className="border-none dark:bg-black bg-gray-100 text-black outline-none rounded-full" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <button className="members flex justify-center items-center" onClick={() => handleCategories("members")}>
                            <CiSquarePlus className="w-8 h-8" />
                        </button>
                    </div>
                    <div className="categories">
                        <div className="categories-inner flex justify-center dark:bg-gray-400 bg-gray-100 p-3 my-4 rounded-full gap-4">
                            <button className={`${active == 'chats' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'}  p-2 rounded-xl w-full`} onClick={() => handleCategories('chats')}>Chats</button>
                            <button className={`${active == 'unread' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'}  p-2 rounded-xl w-full`} onClick={() => handleCategories('unread')}>Unread</button>
                            <button className={`${active == 'Groups' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'}  p-2 rounded-xl w-full`} onClick={() => handleCategories('Groups')}>Groups</button>
                            <button className={`${active == 'AddGroups' ? 'bg-[#2B85FF] text-white' : 'bg-white text-black'} p-2 rounded-xl w-full`} onClick={() => handleCategories('AddGroups')}>+Group</button>
                        </div>
                    </div>
                    <div className={`status ${active == 'members' ? 'hidden' : ''}`}>
                        <div className="inner-status">
                            <div className="top flex justify-between items-center">
                                <h2 className="text-md font-bold">Online Now</h2>
                                <span className="text-sm cursor-pointer" onClick={() => handleCategories("members")}>See All</span>
                            </div>
                            <div className="profile-status flex gap-5 my-4 w-full overflow-x-auto whitespace-nowrap no-scrollbar">
                                {
                                    members
                                        .filter(member => member.isOnline)
                                        .map((member, index) => (
                                            <div key={index} className="relative inline-block text-center mr-4">
                                                <div className="relative w-12 h-12">
                                                    <img
                                                        src={member.user_Avatar}
                                                        alt={member.first_Name}
                                                        className="rounded-full w-12 h-12 border border-gray-300 object-cover"
                                                    />
                                                    <span
                                                        className="absolute bottom-0 right-0 w-3 h-3 bg-[#2B85FF] rounded-full border-2 border-white"
                                                        title="Online"
                                                    ></span>
                                                </div>
                                                <p className="text-sm text-gray-400 mt-2">{member.first_Name}</p>
                                            </div>
                                        ))
                                }

                            </div>

                        </div>
                    </div>

                    <div className="conversation-list">
                        {
                            active == 'chats' ? <ConversationList searchTerm={searchTerm} /> :
                                active == 'Groups' ? <GroupList searchTerm={searchTerm} /> :
                                    active == 'AddGroups' ? <AddGroup /> :
                                        active == 'unread' ? <Unread searchTerm={searchTerm} /> :
                                            active == 'members' ? <Members searchTerm={searchTerm} /> :
                                                null
                        }
                    </div>
                </aside>
                <section className="conversation w-full border-gray-400">
                    <div className="overflow-hidden h-screen">
                        <ChatWindow />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Chatsv2
