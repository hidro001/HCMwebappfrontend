// src/components/Feed/Feed.js
import  { useEffect } from "react";
import PostCard from "./PostCard";
import PollCard from "./PollCard";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import PostCreateBox from "./PostCreateBox";
import PollCreateBox from "./PollCreateBox";

import useFeedStore from "../../store/feedStore";
import useSocketStore from "../../store/socketStore";

import InfiniteScroll from "react-infinite-scroll-component";

const Feed = () => {
  const { feed, isLoading, error, hasMore, fetchFeed, page, refreshFeed } =
    useFeedStore();

  const { connect, socket } = useSocketStore();

  const [openPostModal, setOpenPostModal] = React.useState(false);
  const [openPollModal, setOpenPollModal] = React.useState(false);

  useEffect(() => {
    fetchFeed(1);
    connect();
  }, [fetchFeed, connect]);

  // Fetch more data when the user scrolls to the bottom
  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      fetchFeed(page + 1);
    }
  };

  // Refresh Feed Function
  const handleRefresh = () => {
    refreshFeed();
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 overflow-hidden ">
      {/* Header with Create Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Feed
        </h1>
        <div className="flex space-x-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPostModal(true)}
            className="min-w-[120px]"
          >
            Create Post
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenPollModal(true)}
            className="min-w-[120px]"
          >
            Create Poll
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Infinite Scroll Component */}
      <InfiniteScroll
        dataLength={feed.length} // Important for performance
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex flex-col space-y-4 my-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={300}
                className="rounded-2xl"
              />
            ))}
          </div>
        }
        endMessage={
          feed.length > 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No more items to display.
            </p>
          )
        }
        scrollableTarget="scrollableDiv" // Specify the scrollable div's ID
        // Optional: Adjust the scroll threshold if needed
        // scrollThreshold={0.9}
      >
        {/* Feed Items */}
        {feed.length === 0 && !isLoading && !error ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No items to display.
          </p>
        ) : (
          <Grid container spacing={0.1}>
            {feed.map((item) =>
              item.type === "post" ? (
                <Grid item xs={12} key={item._id}>
                  <PostCard post={item} />
                </Grid>
              ) : item.type === "poll" ? (
                <Grid item xs={12} key={item._id}>
                  <PollCard poll={item} />
                </Grid>
              ) : null
            )}
          </Grid>
        )}
      </InfiniteScroll>

      {/* Post Creation Modal */}
      <Dialog
        open={openPostModal}
        onClose={() => setOpenPostModal(false)}
        fullWidth
        maxWidth="sm"
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
