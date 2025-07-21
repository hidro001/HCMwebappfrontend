import React, { useState } from "react";
import PollCreateBox from "../CreateBox/PollCreateBox";
import PostCreateBox from "../CreateBox/PostCreateBox";
import { HiOutlineDocumentText, HiOutlineChartBar } from "react-icons/hi2";
import useAuthStore from "../../../store/store";
import { useEffect } from "react";
import useFeedStore from "../../../store/feedStore";
import useEmployeeStore from "../../../store/useEmployeeStore";

const getRandomTagline = () => {
  const motivationalThoughts = [
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only way to do great work is to love what you do.",
  "Dream big, work hard, stay focused, and surround yourself with good people.",
  "Push yourself, because no one else is going to do it for you.",
  "Difficult roads often lead to beautiful destinations.",
  "Great things never come from comfort zones.",
  "Don't limit your challenges. Challenge your limits.",
  "Your only limit is your mind.",
  "Don't be afraid to give up the good to go for the great.",
  "Stay positive, work hard, make it happen.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Discipline is doing what needs to be done, even if you don't want to do it.",
  "Your future is created by what you do today, not tomorrow.",
  "You don't have to be great to start, but you have to start to be great.",
  "Doubt kills more dreams than failure ever will."
  ];
 
  return motivationalThoughts[Math.floor(Math.random() * motivationalThoughts.length)]
}

const CreateCard = ({ refreshStatus }) => {

  const { selectedEmployee, loadingSelectedEmployee, error, loadEmployeeById } = useEmployeeStore();

  const [openPostModal, setOpenPostModal] = useState(false);
  const [openPollModal, setOpenPollModal] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  
  const authStore = useAuthStore();
  const userAvatar = authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";

  const userId = authStore._id;

  useEffect(() => {
      loadEmployeeById(userId)
  }, [userId, loadEmployeeById])
  
  const permissions = selectedEmployee?.engagement_permission?.permissions || [];
  
  const canCreatePost = permissions.includes("createPost") 

  const canCreatePoll = permissions.includes("createPoll") 

  const thoughts = getRandomTagline();

  const refreshFeed = useFeedStore((s) => s.refreshFeed);

  return (
    <div className="w-full  pr-2 ">
      <div className="relative mb-3">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl blur-lg"></div>
        <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 rounded-xl p-3 shadow-xl">
          <div className="flex items-center gap-3">
           
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm opacity-50"></div>
              <img
                src={userAvatar}
                alt="User"
                className="relative h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-lg"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-green-400 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
            </div>

     
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                { (canCreatePost || canCreatePoll) ? "What's on your mind?" : thoughts}
              </h3>
            </div>

       
            <div className="flex gap-2 flex-shrink-0">
              {canCreatePost && 
              <button
                onClick={() => setOpenPostModal(true)}
                onMouseEnter={() => setHoveredButton("post")}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <HiOutlineDocumentText
                    className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredButton === "post" ? "rotate-12 scale-110" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">Post</span>
                </div>
              </button>
              }
              {canCreatePoll && 
              <button
                onClick={() => setOpenPollModal(true)}
                onMouseEnter={() => setHoveredButton("poll")}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <HiOutlineChartBar
                    className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredButton === "poll" ? "rotate-12 scale-110" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">Poll</span>
                </div>
              </button>
             }
            </div>
          </div>
        </div>
      </div>


      {openPostModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20">
          <PostCreateBox
            isOpen={openPostModal}
            onSuccess={() => {
              setOpenPostModal(false);
              // setCurRefresh(true);
              // useFeedStore.getState().refreshFeed();
              refreshFeed(); // update the global feed
              refreshStatus(true); // notify parent
            }}
            onClose={() => setOpenPostModal(false)}
          />
        </div>
      )}

  
      {openPollModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20">
          <PollCreateBox
            isOpen={openPollModal}
            onSuccess={() => {
              setOpenPollModal(false);
              setCurRefresh(true);
            }}
            onClose={() => setOpenPollModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CreateCard;
