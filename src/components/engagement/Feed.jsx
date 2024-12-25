
// // src/components/Feed.js
// import React, { useState, useEffect } from "react";
// import PostCard from "./PostCard";
// import PollCard from "./PollCard";
// import axiosInstance from "../../service/axiosInstance";
// import { toast } from "react-toastify";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import PostCreateBox from "./PostCreateBox";
// import PollCreateBox from "./PollCreateBox";
// import { Skeleton } from "@mui/material";

// const Feed = () => {
//   const [feed, setFeed] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);

//   // Modal state
//   const [openPostModal, setOpenPostModal] = useState(false);
//   const [openPollModal, setOpenPollModal] = useState(false);

//   // Fetch feed data
//   const fetchFeed = async (currentPage) => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get("/feed", {
//         params: { page: currentPage, limit: 20 },
//       });
 

//       // Check if response.data.feed exists and is an array
//       if (Array.isArray(response.data.feed)) {
//         setFeed((prevFeed) => [...prevFeed, ...response.data.feed]);
//       } else {
//         console.warn("Feed data is not an array:", response.data.feed);
//       }

//       setPage(response.data.page);
//       setPages(response.data.pages);
//       setHasMore(currentPage < response.data.pages);
//     } catch (error) {
//       console.error("Error fetching feed:", error);
//       setError("Failed to load feed. Please try again.");
//       toast.error("Failed to load feed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeed(1);
//   }, []);

//   // Infinite scroll
//   useEffect(() => {
//     if (!hasMore) return;

//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.offsetHeight
//       ) {
//         if (!isLoading) {
//           fetchFeed(page + 1);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasMore, isLoading, page]);

//   // Refresh Feed Function
//   const refreshFeed = () => {
//     setFeed([]);
//     setPage(1);
//     setPages(1);
//     setHasMore(true);
//     fetchFeed(1);
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-6">
//       {/* Header with Create Buttons */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Feed
//         </h1>
//         <div className="flex space-x-4">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenPostModal(true)}
//           >
//             Create Post
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => setOpenPollModal(true)}
//           >
//             Create Poll
//           </Button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {/* Feed Items */}
//       {feed.length === 0 && !isLoading && !error ? (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No items to display.
//         </p>
//       ) : (
//         feed.map((item) =>
//           item.type === "post" ? (
//             <PostCard key={item._id} post={item} />
//           ) : item.type === "poll" ? (
//             <PollCard key={item._id} poll={item} refreshFeed={refreshFeed} />
//           ) : null
//         )
//       )}

//       {/* Loading Indicators */}
//       {isLoading && (
//         <div className="flex flex-col space-y-4 my-4">
//           {[...Array(3)].map((_, index) => (
//             <Skeleton
//               key={index}
//               variant="rectangular"
//               height={200}
//               className="rounded-xl"
//             />
//           ))}
//         </div>
//       )}

//       {/* No More Data */}
//       {!hasMore && feed.length > 0 && (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No more items to display.
//         </p>
//       )}

//       {/* Post Creation Modal */}
//       <Dialog
//         open={openPostModal}
//         onClose={() => setOpenPostModal(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Create a New Post</DialogTitle>
//         <DialogContent>
//           <PostCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPostModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPostModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Poll Creation Modal */}
//       <Dialog
//         open={openPollModal}
//         onClose={() => setOpenPollModal(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Create a New Poll</DialogTitle>
//         <DialogContent>
//           <PollCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPollModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPollModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Feed;


// // src/components/Feed.js
// import React, { useState, useEffect } from "react";
// import PostCard from "./PostCard";
// import PollCard from "./PollCard";
// import axiosInstance from "../../service/axiosInstance";
// import { toast } from "react-toastify";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import PostCreateBox from "./PostCreateBox";
// import PollCreateBox from "./PollCreateBox";
// import { Skeleton } from "@mui/material";

// // Import Socket Context
// import { useSocket } from '../../contexts/SocketContext'; // Adjust the path

// const Feed = () => {
//   const socket = useSocket();

//   const [feed, setFeed] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [error, setError] = useState(null);

//   // Modal state
//   const [openPostModal, setOpenPostModal] = useState(false);
//   const [openPollModal, setOpenPollModal] = useState(false);

//   // Fetch feed data
//   const fetchFeed = async (currentPage) => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get("/feed", {
//         params: { page: currentPage, limit: 20 },
//       });

//       // Check if response.data.feed exists and is an array
//       if (Array.isArray(response.data.feed)) {
//         setFeed((prevFeed) => [...prevFeed, ...response.data.feed]);
//       } else {
//         console.warn("Feed data is not an array:", response.data.feed);
//       }

//       setPage(response.data.page);
//       setPages(response.data.pages);
//       setHasMore(currentPage < response.data.pages);
//     } catch (error) {
//       console.error("Error fetching feed:", error);
//       setError("Failed to load feed. Please try again.");
//       toast.error("Failed to load feed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeed(1);
//   }, []);

//   // Infinite scroll
//   useEffect(() => {
//     if (!hasMore) return;

//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.offsetHeight
//       ) {
//         if (!isLoading) {
//           fetchFeed(page + 1);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasMore, isLoading, page]);

//   // Refresh Feed Function
//   const refreshFeed = () => {
//     setFeed([]);
//     setPage(1);
//     setPages(1);
//     setHasMore(true);
//     fetchFeed(1);
//   };

//   // --- Socket.io Event Listeners ---
//   useEffect(() => {
//     if (!socket) return;

//     // Post Events
//     socket.on('newPost', (post) => {
//       setFeed((prevFeed) => [post, ...prevFeed]);
//       toast.info('A new post has been added.');
//     });

//     socket.on('updatePost', (updatedPost) => {
//       setFeed((prevFeed) =>
//         prevFeed.map((post) => (post._id === updatedPost._id ? updatedPost : post))
//       );
//       toast.info('A post has been updated.');
//     });

//     socket.on('deletePost', ({ postId }) => {
//       setFeed((prevFeed) => prevFeed.filter((post) => post._id !== postId));
//       toast.info('A post has been deleted.');
//     });

//     // Poll Events
//     socket.on('newPoll', (poll) => {
//       setFeed((prevFeed) => [poll, ...prevFeed]);
//       toast.info('A new poll has been added.');
//     });

//     socket.on('updatePoll', (updatedPoll) => {
//       setFeed((prevFeed) =>
//         prevFeed.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll))
//       );
//       toast.info('A poll has been updated.');
//     });

//     socket.on('deletePoll', ({ pollId }) => {
//       setFeed((prevFeed) => prevFeed.filter((poll) => poll._id !== pollId));
//       toast.info('A poll has been deleted.');
//     });

//     // Comments Events
//     socket.on('newComment', (comment) => {
//       setFeed((prevFeed) =>
//         prevFeed.map((post) => {
//           if (post._id === comment.postId) {
//             return {
//               ...post,
//               comments: [...post.comments, comment],
//             };
//           }
//           return post;
//         })
//       );
//       toast.info('A new comment has been added.');
//     });

//     socket.on('updateComment', (updatedComment) => {
//       setFeed((prevFeed) =>
//         prevFeed.map((post) => {
//           if (post._id === updatedComment.postId) {
//             return {
//               ...post,
//               comments: post.comments.map((comment) =>
//                 comment._id === updatedComment._id ? updatedComment : comment
//               ),
//             };
//           }
//           return post;
//         })
//       );
//       toast.info('A comment has been updated.');
//     });

//     socket.on('deleteComment', ({ postId, commentId }) => {
//       setFeed((prevFeed) =>
//         prevFeed.map((post) => {
//           if (post._id === postId) {
//             return {
//               ...post,
//               comments: post.comments.filter((comment) => comment._id !== commentId),
//             };
//           }
//           return post;
//         })
//       );
//       toast.info('A comment has been deleted.');
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off('newPost');
//       socket.off('updatePost');
//       socket.off('deletePost');
//       socket.off('newPoll');
//       socket.off('updatePoll');
//       socket.off('deletePoll');
//       socket.off('newComment');
//       socket.off('updateComment');
//       socket.off('deleteComment');
//     };
//   }, [socket]);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-6">
//       {/* Header with Create Buttons */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Feed
//         </h1>
//         <div className="flex space-x-4">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenPostModal(true)}
//           >
//             Create Post
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => setOpenPollModal(true)}
//           >
//             Create Poll
//           </Button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {/* Feed Items */}
//       {feed.length === 0 && !isLoading && !error ? (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No items to display.
//         </p>
//       ) : (
//         feed.map((item) =>
//           item.type === "post" ? (
//             <PostCard key={item._id} post={item} />
//           ) : item.type === "poll" ? (
//             <PollCard key={item._id} poll={item} refreshFeed={refreshFeed} />
//           ) : null
//         )
//       )}

//       {/* Loading Indicators */}
//       {isLoading && (
//         <div className="flex flex-col space-y-4 my-4">
//           {[...Array(3)].map((_, index) => (
//             <Skeleton
//               key={index}
//               variant="rectangular"
//               height={200}
//               className="rounded-xl"
//             />
//           ))}
//         </div>
//       )}

//       {/* No More Data */}
//       {!hasMore && feed.length > 0 && (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No more items to display.
//         </p>
//       )}

//       {/* Post Creation Modal */}
//       <Dialog
//         open={openPostModal}
//         onClose={() => setOpenPostModal(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Create a New Post</DialogTitle>
//         <DialogContent>
//           <PostCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPostModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPostModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Poll Creation Modal */}
//       <Dialog
//         open={openPollModal}
//         onClose={() => setOpenPollModal(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Create a New Poll</DialogTitle>
//         <DialogContent>
//           <PollCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPollModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPollModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// // export default Feed;
// // src/components/Feed.js
// import React, { useEffect } from "react";
// import PostCard from "./PostCard";
// import PollCard from "./PollCard";
// import { toast } from "react-toastify";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import { Skeleton } from "@mui/material";
// import PostCreateBox from "./PostCreateBox";
// import PollCreateBox from "./PollCreateBox";

// import useFeedStore from "../../store/feedStore";
// import useSocketStore from "../../store/socketStore";

// const Feed = () => {
//   const {
//     feed,
//     isLoading,
//     error,
//     hasMore,
//     fetchFeed,
//     page,
//     refreshFeed,
//   } = useFeedStore();

//   const { connect, socket } = useSocketStore();

//   const [openPostModal, setOpenPostModal] = React.useState(false);
//   const [openPollModal, setOpenPollModal] = React.useState(false);

//   useEffect(() => {
//     fetchFeed(1);
//     connect();
//   }, [fetchFeed, connect]);

//   // Infinite scroll
//   useEffect(() => {
//     if (!hasMore) return;

//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.offsetHeight
//       ) {
//         if (!isLoading) {
//           fetchFeed(page + 1);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasMore, isLoading, page, fetchFeed]);

//   // Refresh Feed Function
//   const handleRefresh = () => {
//     refreshFeed();
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-6">
//       {/* Header with Create Buttons */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Feed
//         </h1>
//         <div className="flex space-x-4">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenPostModal(true)}
//           >
//             Create Post
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => setOpenPollModal(true)}
//           >
//             Create Poll
//           </Button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {/* Feed Items */}
//       {feed.length === 0 && !isLoading && !error ? (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No items to display.
//         </p>
//       ) : (
//         feed.map((item) =>
//           item.type === "post" ? (
//             <PostCard key={item._id} post={item} />
//           ) : item.type === "poll" ? (
//             <PollCard key={item._id} poll={item} />
//           ) : null
//         )
//       )}

//       {/* Loading Indicators */}
//       {isLoading && (
//         <div className="flex flex-col space-y-4 my-4">
//           {[...Array(3)].map((_, index) => (
//             <Skeleton
//               key={index}
//               variant="rectangular"
//               height={200}
//               className="rounded-xl"
//             />
//           ))}
//         </div>
//       )}

//       {/* No More Data */}
//       {!hasMore && feed.length > 0 && (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No more items to display.
//         </p>
//       )}

//       {/* Post Creation Modal */}
//       <Dialog
//         open={openPostModal}
//         onClose={() => setOpenPostModal(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Create a New Post</DialogTitle>
//         <DialogContent>
//           <PostCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPostModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPostModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Poll Creation Modal */}
//       <Dialog
//         open={openPollModal}
//         onClose={() => setOpenPollModal(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Create a New Poll</DialogTitle>
//         <DialogContent>
//           <PollCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPollModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPollModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Feed;

// // src/components/Feed.js
// import React, { useEffect } from "react";
// import PostCard from "./PostCard";
// import PollCard from "./PollCard";
// import { toast } from "react-toastify";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import { Skeleton } from "@mui/material";
// import PostCreateBox from "./PostCreateBox";
// import PollCreateBox from "./PollCreateBox";

// import useFeedStore from "../../store/feedStore";
// import useSocketStore from "../../store/socketStore";

// const Feed = () => {
//   const {
//     feed,
//     isLoading,
//     error,
//     hasMore,
//     fetchFeed,
//     page,
//     refreshFeed,
//   } = useFeedStore();

//   const { connect, socket } = useSocketStore();

//   const [openPostModal, setOpenPostModal] = React.useState(false);
//   const [openPollModal, setOpenPollModal] = React.useState(false);

//   useEffect(() => {
//     fetchFeed(1);
//     connect();
//   }, [fetchFeed, connect]);

//   // Infinite scroll
//   useEffect(() => {
//     if (!hasMore) return;

//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.offsetHeight
//       ) {
//         if (!isLoading) {
//           fetchFeed(page + 1);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [hasMore, isLoading, page, fetchFeed]);

//   // Refresh Feed Function
//   const handleRefresh = () => {
//     refreshFeed();
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-6">
//       {/* Header with Create Buttons */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Feed
//         </h1>
//         <div className="flex space-x-4">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenPostModal(true)}
//           >
//             Create Post
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => setOpenPollModal(true)}
//           >
//             Create Poll
//           </Button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {/* Feed Items */}
//       {feed.length === 0 && !isLoading && !error ? (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No items to display.
//         </p>
//       ) : (
//         feed.map((item) =>
//           item.type === "post" ? (
//             <PostCard key={item._id} post={item} />
//           ) : item.type === "poll" ? (
//             <PollCard key={item._id} poll={item} />
//           ) : null
//         )
//       )}

//       {/* Loading Indicators */}
//       {isLoading && (
//         <div className="flex flex-col space-y-4 my-4">
//           {[...Array(3)].map((_, index) => (
//             <Skeleton
//               key={index}
//               variant="rectangular"
//               height={200}
//               className="rounded-xl"
//             />
//           ))}
//         </div>
//       )}

//       {/* No More Data */}
//       {!hasMore && feed.length > 0 && (
//         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
//           No more items to display.
//         </p>
//       )}

//       {/* Post Creation Modal */}
//       <Dialog
//         open={openPostModal}
//         onClose={() => setOpenPostModal(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Create a New Post</DialogTitle>
//         <DialogContent>
//           <PostCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPostModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPostModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Poll Creation Modal */}
//       <Dialog
//         open={openPollModal}
//         onClose={() => setOpenPollModal(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Create a New Poll</DialogTitle>
//         <DialogContent>
//           <PollCreateBox
//             onSuccess={() => {
//               refreshFeed();
//               setOpenPollModal(false);
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenPollModal(false)} color="secondary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Feed;

// // src/store/feedStore.js
// import { create } from "zustand";
// import axiosInstance from "../../service/axiosInstance";
// import { toast } from "react-toastify";

// const useFeedStore = create((set, get) => ({
//   feed: [],
//   page: 1,
//   pages: 1,
//   isLoading: false,
//   hasMore: true,
//   error: null,

//   fetchFeed: async (currentPage = 1) => {
//     try {
//       set({ isLoading: true, error: null });
//       const response = await axiosInstance.get("/feed", {
//         params: { page: currentPage, limit: 20 },
//       });

//       if (Array.isArray(response.data.feed)) {
//         set((state) => ({
//           feed: currentPage === 1 ? response.data.feed : [...state.feed, ...response.data.feed],
//           page: response.data.page,
//           pages: response.data.pages,
//           hasMore: currentPage < response.data.pages,
//         }));
//       } else {
//         console.warn("Feed data is not an array:", response.data.feed);
//         set({ error: "Invalid feed data received." });
//       }
//     } catch (error) {
//       console.error("Error fetching feed:", error);
//       set({ error: "Failed to load feed. Please try again." });
//       toast.error("Failed to load feed. Please try again.");
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   refreshFeed: () => {
//     set({ feed: [], page: 1, pages: 1, hasMore: true });
//     get().fetchFeed(1);
//   },

//   // Post Methods
//   addPost: (post) =>
//     set((state) => ({
//       feed: [post, ...state.feed],
//     })),

//   updatePost: (updatedPost) =>
//     set((state) => ({
//       feed: state.feed.map((post) => (post._id === updatedPost._id ? { ...updatedPost } : post)),
//     })),

//   deletePost: (postId) =>
//     set((state) => ({
//       feed: state.feed.filter((post) => post._id !== postId),
//     })),

//   // Poll Methods
//   addPoll: (poll) =>
//     set((state) => ({
//       feed: [poll, ...state.feed],
//     })),

//   updatePoll: (updatedPoll) =>
//     set((state) => ({
//       feed: state.feed.map((poll) => (poll._id === updatedPoll._id ? { ...updatedPoll } : poll)),
//     })),

//   deletePoll: (pollId) =>
//     set((state) => ({
//       feed: state.feed.filter((poll) => poll._id !== pollId),
//     })),

//   // Comment Methods
//   addComment: (postId, comment) =>
//     set((state) => ({
//       feed: state.feed.map((post) =>
//         post._id === postId
//           ? { ...post, comments: [...post.comments, comment] }
//           : post
//       ),
//     })),

//   updateComment: (postId, updatedComment) =>
//     set((state) => ({
//       feed: state.feed.map((post) =>
//         post._id === postId
//           ? {
//               ...post,
//               comments: post.comments.map((comment) =>
//                 comment._id === updatedComment._id ? { ...updatedComment } : comment
//               ),
//             }
//           : post
//       ),
//     })),

//   deleteComment: (postId, commentId) =>
//     set((state) => ({
//       feed: state.feed.map((post) =>
//         post._id === postId
//           ? {
//               ...post,
//               comments: post.comments.filter((comment) => comment._id !== commentId),
//             }
//           : post
//       ),
//     })),

//   // **New Methods for Socket.io Events**

//   // For updating likes on a post
//   updatePostLikes: (postId, likes) =>
//     set((state) => ({
//       feed: state.feed.map((post) =>
//         post._id === postId
//           ? { ...post, likes: likes }
//           : post
//       ),
//     })),

//   // For adding a comment to a post
//   addCommentToPost: (postId, comment) =>
//     set((state) => ({
//       feed: state.feed.map((post) =>
//         post._id === postId
//           ? { ...post, comments: [...post.comments, comment] }
//           : post
//       ),
//     })),

//   // For updating a comment in a post
//   updateCommentInPost: (postId, updatedComment) =>
//     set((state) => ({
//       feed: state.feed.map((post) =>
//         post._id === postId
//           ? {
//               ...post,
//               comments: post.comments.map((comment) =>
//                 comment._id === updatedComment._id ? { ...updatedComment } : comment
//               ),
//             }
//           : post
//       ),
//     })),

//   // For deleting a comment from a post
//   deleteCommentFromPost: (postId, commentId) =>
//     set((state) => ({
//       feed: state.feed.map((post) =>
//         post._id === postId
//           ? {
//               ...post,
//               comments: post.comments.filter((comment) => comment._id !== commentId),
//             }
//           : post
//       ),
//     })),

//   // **New Method for Updating Poll Votes**
//   updatePollVotes: (pollId, userId, optionId) =>
//     set((state) => ({
//       feed: state.feed.map((poll) => {
//         if (poll._id === pollId) {
//           // Check if the user has already voted
//           const existingVoteIndex = poll.votes.findIndex(
//             (vote) => vote.user === userId
//           );

//           let updatedVotes = [...poll.votes];
//           if (existingVoteIndex !== -1) {
//             // User has already voted; update their vote
//             const existingVote = updatedVotes[existingVoteIndex];
//             // Decrement the previous option's vote count
//             const previousOption = poll.options.find(
//               (opt) => opt._id === existingVote.option
//             );
//             if (previousOption) {
//               previousOption.votes -= 1;
//             }
//             // Update the vote
//             updatedVotes[existingVoteIndex] = { ...existingVote, option: optionId };
//           } else {
//             // User is voting for the first time
//             updatedVotes.push({ user: userId, option: optionId });
//           }

//           // Increment the new option's vote count
//           const newOption = poll.options.find((opt) => opt._id === optionId);
//           if (newOption) {
//             newOption.votes += 1;
//           }

//           return { ...poll, votes: updatedVotes };
//         }
//         return poll;
//       }),
//     })),
// }));

// export default useFeedStore;

// src/components/Feed.js
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

