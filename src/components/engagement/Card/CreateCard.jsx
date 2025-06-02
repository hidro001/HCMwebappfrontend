import React, {useState} from 'react'
import PollCreateBox from "../CreateBox/PollCreateBox";
import PostCreateBox from "../CreateBox/PostCreateBox";
import { 
  HiOutlineDocumentText, 
  HiOutlineChartBar,
} from "react-icons/hi2";
import useAuthStore from "../../../store/store";

const CreateCard = () => {

     const [openPostModal, setOpenPostModal] = useState(false);
      const [openPollModal, setOpenPollModal] = useState(false);
      
  const [hoveredButton, setHoveredButton] = useState(null);
 const authStore = useAuthStore();
  const userAvatar = authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";

  return (
    <div className="w-full  pr-2 ">
      
      {/* Compact Header - Everything in One Row */}
      <div className="relative mb-3">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl blur-lg"></div>
        <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 rounded-xl p-3 shadow-xl">
          
          <div className="flex items-center gap-3">
            {/* Compact Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm opacity-50"></div>
              <img
                src={userAvatar}
                alt="User"
                className="relative h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-lg"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-green-400 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
            </div>

            {/* Compact Text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                What's on your mind?
              </h3>
            </div>

            {/* Compact Action Buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setOpenPostModal(true)}
                onMouseEnter={() => setHoveredButton('post')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <HiOutlineDocumentText className={`w-4 h-4 transition-transform duration-300 ${hoveredButton === 'post' ? 'rotate-12 scale-110' : ''}`} />
                  <span className="hidden sm:inline">Post</span>
                </div>
              </button>

              <button
                onClick={() => setOpenPollModal(true)}
                onMouseEnter={() => setHoveredButton('poll')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <HiOutlineChartBar className={`w-4 h-4 transition-transform duration-300 ${hoveredButton === 'poll' ? 'rotate-12 scale-110' : ''}`} />
                  <span className="hidden sm:inline">Poll</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      {openPostModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20">
          <PostCreateBox
            isOpen={openPostModal}
            onSuccess={() => {
              setOpenPostModal(false)
              useFeedStore.getState().refreshFeed();
            }}
            onClose={() => setOpenPostModal(false)}
          />
        </div>
      )}

      {/* Poll Modal */}
      {openPollModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20">
          <PollCreateBox
            isOpen={openPollModal}
            onSuccess={() => {
              setOpenPollModal(false)
              useFeedStore.getState().refreshFeed();
            }}
            onClose={() => setOpenPollModal(false)}
          />
        </div>
      )}
</div>
  )
}

export default CreateCard