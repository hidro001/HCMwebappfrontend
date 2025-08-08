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
  onRefresh =false
}) => {
  const { feed, isLoading, error, hasMore, fetchFeed, page, refreshFeed } =
    useFeedStore();
  const { connect } = useSocketStore();

  useEffect(() => {
    fetchFeed(1);
    connect();
  }, [fetchFeed, connect]);

  useEffect(() => {
    if(onRefresh){
              useFeedStore.getState().refreshFeed();

    }
  }, [onRefresh])

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      fetchFeed(page + 1);
    }
  };

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

  console.log('Current category filter:', curCategory);
  console.log('Current department filter:', curDepartment);
  console.log('Total feed items:', feed.length);
  console.log('Filtered feed items:', filteredSortedFeed.length);
  console.log('Sample feed item categories:', feed.slice(0, 3).map(item => ({ id: item._id, category: item.categories })));

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
            <div className="w-full space-y-4 px-1 pt-2 pb-6">
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

      {isLoading && (
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}

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
