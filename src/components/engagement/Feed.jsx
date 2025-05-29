// import { useState, useEffect, useRef } from "react";
// import PostCard from "./Card/PostCard";
// import PollCard from "./Card/PollCard";
// import useAuthStore from "../../store/store";
// import AutoSizer from "react-virtualized-auto-sizer";
// import { VariableSizeList as List } from "react-window";
// import useFeedStore from "../../store/feedStore";
// import useSocketStore from "../../store/socketStore";
// import PostCreateBox from "./CreateBox/PostCreateBox";
// import { FaPoll } from "react-icons/fa";
// import { BsFileText } from "react-icons/bs";
// import PollCreateBox from "./CreateBox/PollCreateBox";

// const Feed = ({ curCategory, curDepartment, curSort }) => {
//   const { feed, isLoading, error, hasMore, fetchFeed, page } = useFeedStore();
//   const { connect } = useSocketStore();

//   const [openPostModal, setOpenPostModal] = useState(false);
//   const [openPollModal, setOpenPollModal] = useState(false);

//   const listRef = useRef();
//   const sizeMap = useRef({});

//   const authStore = useAuthStore();
//   const userAvatar = authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";

//   useEffect(() => {
//     fetchFeed(1);
//     connect();
//   }, [fetchFeed, connect]);

//   const fetchMoreData = () => {
//     if (hasMore && !isLoading) {
//       fetchFeed(page + 1);
//     }
//   };

//   const getItemSize = (index) => sizeMap.current[index] || 400;

//   const setSize = (index, size) => {
//     if (sizeMap.current[index] !== size) {
//       sizeMap.current = { ...sizeMap.current, [index]: size };
//       listRef.current?.resetAfterIndex(index);
//     }
//   };


//   useEffect(() => {
//     document.body.style.overflow = openPostModal ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [openPostModal]);

//   const filteredSortedFeed = feed
//   .filter((item) => {
//     const matchesCategory =
//       curCategory === "All Announcement" || item.categories === curCategory;

//     const matchesDepartment =
//       curDepartment === "all" || item.department.includes(curDepartment);

//     return matchesCategory && matchesDepartment;
//   })
//   .sort((a, b) => {
//     const dateA = new Date(a.scheduleDate || a.createdAt);
//     const dateB = new Date(b.scheduleDate || b.createdAt);
//     return curSort === "newest" ? dateB - dateA : dateA - dateB;
//   });


//   const Row = ({ index, style }) => {
//     const item = filteredSortedFeed[index];
//     const ref = useRef();

//     useEffect(() => {
//       if (ref.current) {
//         setSize(index, ref.current.getBoundingClientRect().height);
//       }
//     }, [ref.current, filteredSortedFeed]);

//     return (
//       <div style={{ ...style, width: "100%" }}>
//         <div ref={ref} className="px-2 py-2 w-full">
//           {item.type === "post" ? (
//             <PostCard post={item}  />
//           ) : item.type === "poll" ? (
//             <PollCard poll={item} />
//           ) : null}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full flex flex-col h-full overflow-hidden pr-2">
//       {/* Post & Poll Create Buttons */}
//       <div className="flex justify-between border bg-white p-1 rounded-lg py-2 items-center mb-2">
//         <img
//           src={userAvatar}
//           alt="User"
//           className="h-9 w-9 mx-1 rounded-full object-cover border border-gray-300"
//         />
//         <button
//           onClick={() => setOpenPostModal(true)}
//           className="px-4 py-2 mx-1 w-full border border-gray-500 text-black flex items-center justify-center hover:bg-gray-300 rounded shadow"
//         >
//           <BsFileText size={28} />
//           Create Post
//         </button>
//         <button
//           onClick={() => setOpenPollModal(true)}
//           className="px-4 py-2 w-full mx-1 border border-gray-400 text-gray-800 flex items-center bg-[#FFFDD0] justify-center hover:bg-gray-200 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700 rounded shadow"
//         >
//           <FaPoll size={28} /> Create Poll
//         </button>
//       </div>

//       {/* Post Modal */}
//       {openPostModal && (
//         <PostCreateBox
//           isOpen={openPostModal}
//           onSuccess={() => {
//             setOpenPostModal(false)
//             useFeedStore.getState().refreshFeed();
//           }}
//           onClose={() => setOpenPostModal(false)}
//         />
//       )}

//       {/* Poll Modal */}
//       {openPollModal && (
//         <PollCreateBox
//           isOpen={openPollModal}
//           onSuccess={() => {
//             setOpenPollModal(false)
//             useFeedStore.getState().refreshFeed();
//           }}
//           onClose={() => setOpenPollModal(false)}
//         />
//       )}

//       {/* Error message */}
//       {error && <div className="p-4 bg-red-100 text-red-700 mb-4">{error}</div>}

//       {/* Feed */}
//       <div className="h-full w-full border border-gray-300 dark:border-gray-600 rounded">
//         {filteredSortedFeed.length === 0 && !isLoading ? (
//           <p className="text-center py-10 text-gray-500 dark:text-gray-400">
//             No items to display.
//           </p>
//         ) : (
//           <AutoSizer>
//             {({ height, width }) => (
//               <div
//                 className="sidebar-scrollbar"
//                 style={{ height, width, overflowY: "auto" }}
//               >
//                 <List
//                   ref={listRef}
//                   height={height}
//                   width={width}
//                   itemCount={filteredSortedFeed.length}
//                   itemSize={getItemSize}
//                   style={{ overflow: "visible" }}
//                   onItemsRendered={({ visibleStopIndex }) => {
//                     if (visibleStopIndex >= feed.length - 2) fetchMoreData();
//                   }}
//                 >
//                   {Row}
//                 </List>
//               </div>
//             )}
//           </AutoSizer>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Feed;



import { useState, useEffect, useRef } from "react";
import PostCard from "./Card/PostCard";
import PollCard from "./Card/PollCard";
import useAuthStore from "../../store/store";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from "react-window";
import useFeedStore from "../../store/feedStore";
import useSocketStore from "../../store/socketStore";
import PostCreateBox from "./CreateBox/PostCreateBox";
import { 
  HiOutlineDocumentText, 
  HiOutlineChartBar,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineExclamationTriangle 
} from "react-icons/hi2";
import { 
  RiRobot2Line, 
  RiUserSmileLine,
  RiTimeLine,
  RiErrorWarningLine 
} from "react-icons/ri";
import PollCreateBox from "./CreateBox/PollCreateBox";

const Feed = ({ curCategory, curDepartment, curSort }) => {
  const { feed, isLoading, error, hasMore, fetchFeed, page } = useFeedStore();
  const { connect } = useSocketStore();

  const [openPostModal, setOpenPostModal] = useState(false);
  const [openPollModal, setOpenPollModal] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const listRef = useRef();
  const sizeMap = useRef({});

  const authStore = useAuthStore();
  const userAvatar = authStore.userAvatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";

  useEffect(() => {
    fetchFeed(1);
    connect();
  }, [fetchFeed, connect]);

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      fetchFeed(page + 1);
    }
  };

  const getItemSize = (index) => sizeMap.current[index] || 400;

  const setSize = (index, size) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size };
      listRef.current?.resetAfterIndex(index);
    }
  };

  useEffect(() => {
    document.body.style.overflow = openPostModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openPostModal]);

  const filteredSortedFeed = feed
  .filter((item) => {
    const matchesCategory =
      curCategory === "All Announcement" || item.categories === curCategory;

    const matchesDepartment =
      curDepartment === "all" || item.department.includes(curDepartment);

    return matchesCategory && matchesDepartment;
  })
  .sort((a, b) => {
    const dateA = new Date(a.scheduleDate || a.createdAt);
    const dateB = new Date(b.scheduleDate || b.createdAt);
    return curSort === "newest" ? dateB - dateA : dateA - dateB;
  });

  const Row = ({ index, style }) => {
    const item = filteredSortedFeed[index];
    const ref = useRef();

    useEffect(() => {
      if (ref.current) {
        setSize(index, ref.current.getBoundingClientRect().height);
      }
    }, [ref.current, filteredSortedFeed]);

    return (
      <div style={{ ...style, width: "100%" }}>
        <div ref={ref} className="px-3 py-3 w-full">
          <div className="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
            {item.type === "post" ? (
              <PostCard post={item} />
            ) : item.type === "poll" ? (
              <PollCard poll={item} />
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col h-full overflow-hidden pr-2 ">
      
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

      {/* Error Message with Modern Design */}
      {error && (
        <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
              <RiErrorWarningLine className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-300">Error occurred</h4>
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/30 to-purple-50/20 dark:from-gray-800/60 dark:via-blue-900/20 dark:to-purple-900/10 rounded-2xl backdrop-blur-sm"></div>
        <div className="relative h-full border border-white/30 dark:border-gray-700/30 rounded-2xl overflow-hidden shadow-2xl">
          
          {filteredSortedFeed.length === 0 && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
                <div className="relative p-8 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm">
                  <RiRobot2Line className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No content yet</h3>
              <p className="text-gray-500 dark:text-gray-500 text-center max-w-sm">
                Be the first to share something amazing with your community
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                <RiTimeLine className="w-4 h-4" />
                <span>Waiting for new posts...</span>
              </div>
            </div>
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <div
                  className="custom-scrollbar"
                  style={{ 
                    height, 
                    width, 
                    overflowY: "auto",
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.02) 100%)"
                  }}
                >
                  <List
                    ref={listRef}
                    height={height}
                    width={width}
                    itemCount={filteredSortedFeed.length}
                    itemSize={getItemSize}
                    style={{ overflow: "visible" }}
                    onItemsRendered={({ visibleStopIndex }) => {
                      if (visibleStopIndex >= feed.length - 2) fetchMoreData();
                    }}
                  >
                    {Row}
                  </List>
                </div>
              )}
            </AutoSizer>
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20 dark:border-gray-700/30">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading more...</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default Feed;