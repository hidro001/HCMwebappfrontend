import { useState, useEffect, useRef } from "react";
import PostCard from "./Card/PostCard";
import PollCard from "./Card/PollCard";
import useAuthStore from "../../store/store";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from "react-window";
import useFeedStore from "../../store/feedStore";
import useSocketStore from "../../store/socketStore";
import PostCreateBox from "./CreateBox/PostCreateBox";
import { FaPoll } from "react-icons/fa";
import { BsFileText } from "react-icons/bs";
import PollCreateBox from "./CreateBox/PollCreateBox";

const Feed = ({ curCategory, curDepartment, curSort }) => {
  const { feed, isLoading, error, hasMore, fetchFeed, page } = useFeedStore();
  const { connect } = useSocketStore();

  const [openPostModal, setOpenPostModal] = useState(false);
  const [openPollModal, setOpenPollModal] = useState(false);

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
        <div ref={ref} className="px-2 py-2 w-full">
          {item.type === "post" ? (
            <PostCard post={item}  />
          ) : item.type === "poll" ? (
            <PollCard poll={item} />
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col h-full overflow-hidden pr-2">
      {/* Post & Poll Create Buttons */}
      <div className="flex justify-between border bg-white p-1 rounded-lg py-2 items-center mb-2">
        <img
          src={userAvatar}
          alt="User"
          className="h-9 w-9 mx-1 rounded-full object-cover border border-gray-300"
        />
        <button
          onClick={() => setOpenPostModal(true)}
          className="px-4 py-2 mx-1 w-full border border-gray-500 text-black flex items-center justify-center hover:bg-gray-300 rounded shadow"
        >
          <BsFileText size={28} />
          Create Post
        </button>
        <button
          onClick={() => setOpenPollModal(true)}
          className="px-4 py-2 w-full mx-1 border border-gray-400 text-gray-800 flex items-center bg-[#FFFDD0] justify-center hover:bg-gray-200 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700 rounded shadow"
        >
          <FaPoll size={28} /> Create Poll
        </button>
      </div>

      {/* Post Modal */}
      {openPostModal && (
        <PostCreateBox
          isOpen={openPostModal}
          onSuccess={() => {
            setOpenPostModal(false)
            useFeedStore.getState().refreshFeed();
          }}
          onClose={() => setOpenPostModal(false)}
        />
      )}

      {/* Poll Modal */}
      {openPollModal && (
        <PollCreateBox
          isOpen={openPollModal}
          onSuccess={() => {
            setOpenPollModal(false)
            useFeedStore.getState().refreshFeed();
          }}
          onClose={() => setOpenPollModal(false)}
        />
      )}

      {/* Error message */}
      {error && <div className="p-4 bg-red-100 text-red-700 mb-4">{error}</div>}

      {/* Feed */}
      <div className="h-full w-full border border-gray-300 dark:border-gray-600 rounded">
        {filteredSortedFeed.length === 0 && !isLoading ? (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            No items to display.
          </p>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <div
                className="sidebar-scrollbar"
                style={{ height, width, overflowY: "auto" }}
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
  );
};

export default Feed;
