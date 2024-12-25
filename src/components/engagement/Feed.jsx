
import React, { useEffect } from "react";
import PostCard from "./PostCard";
import PollCard from "./PollCard";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import PostCreateBox from "./PostCreateBox";
import PollCreateBox from "./PollCreateBox";

import useFeedStore from "../../store/feedStore";
import useSocketStore from "../../store/socketStore";

const Feed = () => {
  const {
    feed,
    isLoading,
    error,
    hasMore,
    fetchFeed,
    page,
    refreshFeed,
  } = useFeedStore();

  const { connect, socket } = useSocketStore();

  const [openPostModal, setOpenPostModal] = React.useState(false);
  const [openPollModal, setOpenPollModal] = React.useState(false);

  useEffect(() => {
    fetchFeed(1);
    connect();
  }, [fetchFeed, connect]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        if (!isLoading) {
          fetchFeed(page + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, page, fetchFeed]);

  // Refresh Feed Function
  const handleRefresh = () => {
    refreshFeed();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header with Create Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Feed
        </h1>
        <div className="flex space-x-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPostModal(true)}
          >
            Create Post
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenPollModal(true)}
          >
            Create Poll
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Feed Items */}
      {feed.length === 0 && !isLoading && !error ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No items to display.
        </p>
      ) : (
        feed.map((item) =>
          item.type === "post" ? (
            <PostCard key={item._id} post={item} />
          ) : item.type === "poll" ? (
            <PollCard key={item._id} poll={item} />
          ) : null
        )
      )}

      {/* Loading Indicators */}
      {isLoading && (
        <div className="flex flex-col space-y-4 my-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={200}
              className="rounded-xl"
            />
          ))}
        </div>
      )}

      {/* No More Data */}
      {!hasMore && feed.length > 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No more items to display.
        </p>
      )}

      {/* Post Creation Modal */}
      <Dialog
        open={openPostModal}
        onClose={() => setOpenPostModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create a New Post</DialogTitle>
        <DialogContent>
          <PostCreateBox
            onSuccess={() => {
              refreshFeed();
              setOpenPostModal(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPostModal(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Poll Creation Modal */}
      <Dialog
        open={openPollModal}
        onClose={() => setOpenPollModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create a New Poll</DialogTitle>
        <DialogContent>
          <PollCreateBox
            onSuccess={() => {
              refreshFeed();
              setOpenPollModal(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPollModal(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Feed;

