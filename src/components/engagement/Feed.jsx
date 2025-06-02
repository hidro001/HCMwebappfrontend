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

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./Card/PostCard";
import PollCard from "./Card/PollCard";
import useFeedStore from "../../store/feedStore";
import useSocketStore from "../../store/socketStore";
import { RiRobot2Line, RiTimeLine } from "react-icons/ri";

const Feed = ({
  curCategory = "All Announcement",
  curDepartment = "all",
  curSort = "newest",
}) => {
  const { feed, isLoading, error, hasMore, fetchFeed, page, refreshFeed } =
    useFeedStore();
  const { connect } = useSocketStore();

  useEffect(() => {
    fetchFeed(1);
    connect();
  }, [fetchFeed, connect]);

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      fetchFeed(page + 1);
    }
  };

  // ✅ Filtering & Sorting logic
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

  return (
    <div className="max-w-3xl h-full py-6">
      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div
        id="scrollableDiv"
        className="h-[75vh] overflow-auto custom-scrollbar p-1 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900"
      >
        <InfiniteScroll
          dataLength={filteredSortedFeed.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="space-y-4 my-4 px-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-60 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          }
          endMessage={
            filteredSortedFeed.length > 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                No more items to display.
              </p>
            )
          }
          scrollableTarget="scrollableDiv"
        >
          {filteredSortedFeed.length === 0 && !isLoading && !error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="bg-gradient-to-tr from-blue-200 to-purple-300 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-full shadow-lg">
                <RiRobot2Line className="w-14 h-14 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                No content yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Be the first to share something amazing with your team!
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                <RiTimeLine className="w-4 h-4" />
                <span>Waiting for posts...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 px-1 pt-2 pb-6">
              {filteredSortedFeed.map((item) =>
                item.type === "post" ? (
                  <PostCard key={item._id} post={item} />
                ) : item.type === "poll" ? (
                  <PollCard key={item._id} poll={item} />
                ) : null
              )}
            </div>
          )}
        </InfiniteScroll>
      </div>

      {/* Loading indicator (optional) */}
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}

      {/* Scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default Feed;
