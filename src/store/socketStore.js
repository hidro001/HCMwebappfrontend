// // // src/store/socketStore.js
// // import { create } from "zustand";
// // import io from "socket.io-client";
// // import useFeedStore from "./feedStore";
// // import { toast } from "react-toastify";

// // const useSocketStore = create((set, get) => ({
// //   socket: null,

// //   connect: () => {
// //     if (get().socket) return; // Prevent multiple connections

// //     const socket = io(import.meta.env.REACT_APP_SOCKET_URL, {
// //       // Optional: Add query parameters or options if needed
// //       transports: ["websocket"],
// //     });

// //     socket.on("connect", () => {
// //       console.log("Connected to Socket.io server.");
// //     });

// //     // Handle real-time events
// //     socket.on("newPost", (post) => {
// //       useFeedStore.getState().addPost(post);
// //       toast.info("A new post has been added.");
// //     });

// //     socket.on("updatePost", (updatedPost) => {
// //       useFeedStore.getState().updatePost(updatedPost);
// //       toast.info("A post has been updated.");
// //     });

// //     socket.on("deletePost", ({ postId }) => {
// //       useFeedStore.getState().deletePost(postId);
// //       toast.info("A post has been deleted.");
// //     });

// //     socket.on("newPoll", (poll) => {
// //       useFeedStore.getState().addPoll(poll);
// //       toast.info("A new poll has been added.");
// //     });

// //     socket.on("updatePoll", (updatedPoll) => {
// //       useFeedStore.getState().updatePoll(updatedPoll);
// //       toast.info("A poll has been updated.");
// //     });

// //     socket.on("deletePoll", ({ pollId }) => {
// //       useFeedStore.getState().deletePoll(pollId);
// //       toast.info("A poll has been deleted.");
// //     });

// //     socket.on("newComment", (comment) => {
// //       useFeedStore.getState().addComment(comment.postId, comment);
// //       toast.info("A new comment has been added.");
// //     });

// //     socket.on("updateComment", (updatedComment) => {
// //       useFeedStore.getState().updateComment(updatedComment.postId, updatedComment);
// //       toast.info("A comment has been updated.");
// //     });

// //     socket.on("deleteComment", ({ postId, commentId }) => {
// //       useFeedStore.getState().deleteComment(postId, commentId);
// //       toast.info("A comment has been deleted.");
// //     });

// //     socket.on("disconnect", () => {
// //       console.log("Disconnected from Socket.io server.");
// //     });

// //     set({ socket });
// //   },

// //   disconnect: () => {
// //     if (get().socket) {
// //       get().socket.disconnect();
// //       set({ socket: null });
// //     }
// //   },
// // }));

// // export default useSocketStore;

// // src/store/socketStore.js
// import { create } from "zustand";
// import { io } from "socket.io-client";
// import useFeedStore from "./feedStore";
// import useAuthStore from "./store";
// import { toast } from "react-toastify";

// const useSocketStore = create((set, get) => ({
//   socket: null,

//   connect: () => {
//     if (get().socket) {
//       console.log("Socket already connected");
//       return;
//     }

//     const token = localStorage.getItem("accessToken"); // Ensure you have accessToken in authStore
//     if (!token) {
//       console.error("No access token found. Please log in.");
//       return;
//     }


//     const socket = io("http://localhost:6060", {
//       transports: ["websocket"],
//       auth: {
//         token: token,
//       },
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("connect", () => {
//       console.log("Connected to Socket.io server:", socket.id);
//     });

//     // Real-time event listeners
//     socket.on("newPost", (post) => {
//       useFeedStore.getState().addPost(post);
//       toast.info("A new post has been added.");
//     });

//     // Handle other events...

//     socket.on("disconnect", (reason) => {
//       console.log(`Disconnected from Socket.io server: ${reason}`);
//       set({ socket: null });
//       if (reason === "io server disconnect") {
//         // Attempt to reconnect
//         socket.connect();
//       }
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Connection error:", error);
//       if (error.message === "Authentication error") {
//         toast.error("Authentication failed. Please log in again.");
//         useAuthStore.getState().logout();
//       } else {
//         toast.error("Failed to connect to the server.");
//       }
//     });

//     set({ socket });
//   },

//   disconnect: () => {
//     if (get().socket) {
//       get().socket.disconnect();
//       set({ socket: null });
//     }
//   },
// }));

// export default useSocketStore;

// // src/store/socketStore.js
// import { create } from "zustand";
// import { io } from "socket.io-client";
// import useFeedStore from "./feedStore";
// import useAuthStore from "./store"; // Corrected import path
// import { toast } from "react-toastify";

// const useSocketStore = create((set, get) => ({
//   socket: null,

//   connect: () => {
//     if (get().socket) {
//       console.log("Socket already connected");
//       return;
//     }

//     const token = localStorage.getItem("accessToken"); // Ensure you have accessToken in authStore
//     if (!token) {
//       console.error("No access token found. Please log in.");
//       return;
//     }

//     const socket = io("http://localhost:6060", {
//       transports: ["websocket"],
//       auth: {
//         token: token,
//       },
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("connect", () => {
//       console.log("Connected to Socket.io server:", socket.id);
//     });

//     // Real-time event listeners

//     // Listening to new posts
//     socket.on("newPost", (post) => {
//       console.log("Received 'newPost' event:", post);
//       useFeedStore.getState().addPost(post);
//       toast.info("A new post has been added.");
//     });

//     // Listening to updates on posts (likes, edits)
//     socket.on("updatePost", (updatedPost) => {
//       console.log("Received 'updatePost' event:", updatedPost);
//       useFeedStore.getState().updatePost(updatedPost);
//       toast.info("A post has been updated.");
//     });

//     // Listening to deleted posts
//     socket.on("deletePost", ({ postId }) => {
//       console.log("Received 'deletePost' event for postId:", postId);
//       useFeedStore.getState().deletePost(postId);
//       toast.info("A post has been deleted.");
//     });

//     // Listening to new comments
//     socket.on("newComment", ({ postId, comment }) => {
//       console.log("Received 'newComment' event:", postId, comment);
//       useFeedStore.getState().addCommentToPost(postId, comment);
//       toast.info("A new comment has been added.");
//     });

//     // Listening to updated comments
//     socket.on("updateComment", (updatedComment) => {
//       console.log("Received 'updateComment' event:", updatedComment);
//       useFeedStore.getState().updateCommentInPost(updatedComment.post, updatedComment);
//       toast.info("A comment has been updated.");
//     });

//     // Listening to deleted comments
//     socket.on("deleteComment", ({ postId, commentId }) => {
//       console.log("Received 'deleteComment' event for postId:", postId, "commentId:", commentId);
//       useFeedStore.getState().deleteCommentFromPost(postId, commentId);
//       toast.info("A comment has been deleted.");
//     });

//     // Listening to new polls
//     socket.on("newPoll", (poll) => {
//       console.log("Received 'newPoll' event:", poll);
//       useFeedStore.getState().addPoll(poll);
//       toast.info("A new poll has been created.");
//     });

//     // Listening to updated polls
//     socket.on("updatePoll", (updatedPoll) => {
//       console.log("Received 'updatePoll' event:", updatedPoll);
//       useFeedStore.getState().updatePoll(updatedPoll);
//       toast.info("A poll has been updated.");
//     });

//     // Listening to deleted polls
//     socket.on("deletePoll", ({ pollId }) => {
//       console.log("Received 'deletePoll' event for pollId:", pollId);
//       useFeedStore.getState().deletePoll(pollId);
//       toast.info("A poll has been deleted.");
//     });

//     socket.on("disconnect", (reason) => {
//       console.log(`Disconnected from Socket.io server: ${reason}`);
//       set({ socket: null });
//       if (reason === "io server disconnect") {
//         // Attempt to reconnect
//         socket.connect();
//       }
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Connection error:", error);
//       if (error.message === "Authentication error") {
//         toast.error("Authentication failed. Please log in again.");
//         useAuthStore.getState().logout();
//       } else {
//         toast.error("Failed to connect to the server.");
//       }
//     });

//     set({ socket });
//   },

//   disconnect: () => {
//     if (get().socket) {
//       get().socket.disconnect();
//       set({ socket: null });
//     }
//   },
// }));

// export default useSocketStore;

// // src/store/socketStore.js
// import { create } from "zustand";
// import { io } from "socket.io-client";
// import useFeedStore from "./feedStore";
// import useAuthStore from "./store"; // Corrected import path
// import { toast } from "react-toastify";

// const useSocketStore = create((set, get) => ({
//   socket: null,

//   connect: () => {
//     if (get().socket) {
//       console.log("Socket already connected");
//       return;
//     }

//     const token = localStorage.getItem("accessToken"); // Ensure you have accessToken in authStore
//     if (!token) {
//       console.error("No access token found. Please log in.");
//       return;
//     }

//     const socket = io("http://localhost:6060", {
//       transports: ["websocket"],
//       auth: {
//         token: token,
//       },
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("connect", () => {
//       console.log("Connected to Socket.io server:", socket.id);
//     });

//     // Real-time event listeners

//     // Listening to new posts
//     socket.on("newPost", (post) => {
//       console.log("Received 'newPost' event:", post);
//       useFeedStore.getState().addPost(post);
//       toast.info("A new post has been added.");
//     });

//     // Listening to updates on posts (likes, edits)
//     socket.on("updatePost", (updatedPost) => {
//       console.log("Received 'updatePost' event:", updatedPost);
      
//       // Ensure 'type' field is present
//       if (!updatedPost.type) {
//         console.warn("Received 'updatePost' event without 'type' field:", updatedPost);
//         // Optionally, set a default type or handle the missing type
//         updatedPost.type = "post"; // Assuming it's a post
//       }

//       useFeedStore.getState().updatePost(updatedPost);
//       toast.info("A post has been updated.");
//     });

//     // Listening to deleted posts
//     socket.on("deletePost", ({ postId }) => {
//       console.log("Received 'deletePost' event for postId:", postId);
//       useFeedStore.getState().deletePost(postId);
//       toast.info("A post has been deleted.");
//     });

//     // Listening to new comments
//     socket.on("newComment", ({ postId, comment }) => {
//       console.log("Received 'newComment' event:", postId, comment);
      
//       if (!comment.commenter) {
//         console.warn("Received 'newComment' event without 'commenter' data:", comment);
//         // Assign default commenter information
//         comment.commenter = {
//           user_Avatar: "https://via.placeholder.com/150",
//           first_Name: "Unknown",
//           last_Name: "User",
//           employee_Id: "N/A",
//           _id: "unknown",
//         };
//       }

//       useFeedStore.getState().addCommentToPost(postId, comment);
//       toast.info("A new comment has been added.");
//     });

//     // Listening to updated comments
//     socket.on("updateComment", (updatedComment) => {
//       console.log("Received 'updateComment' event:", updatedComment);
      
//       if (!updatedComment.post) {
//         console.warn("Received 'updateComment' event without 'post' field:", updatedComment);
//         return;
//       }

//       if (!updatedComment.commenter) {
//         console.warn("Received 'updateComment' event without 'commenter' data:", updatedComment);
//         // Assign default commenter information
//         updatedComment.commenter = {
//           user_Avatar: "https://via.placeholder.com/150",
//           first_Name: "Unknown",
//           last_Name: "User",
//           employee_Id: "N/A",
//           _id: "unknown",
//         };
//       }

//       useFeedStore.getState().updateCommentInPost(updatedComment.post, updatedComment);
//       toast.info("A comment has been updated.");
//     });

//     // Listening to deleted comments
//     socket.on("deleteComment", ({ postId, commentId }) => {
//       console.log("Received 'deleteComment' event for postId:", postId, "commentId:", commentId);
//       useFeedStore.getState().deleteCommentFromPost(postId, commentId);
//       toast.info("A comment has been deleted.");
//     });

//     // Listening to new polls
//     socket.on("newPoll", (poll) => {
//       console.log("Received 'newPoll' event:", poll);
//       useFeedStore.getState().addPoll(poll);
//       toast.info("A new poll has been created.");
//     });

//     // Listening to updated polls
//     socket.on("updatePoll", (updatedPoll) => {
//       console.log("Received 'updatePoll' event:", updatedPoll);
//       useFeedStore.getState().updatePoll(updatedPoll);
//       toast.info("A poll has been updated.");
//     });

//     // Listening to deleted polls
//     socket.on("deletePoll", ({ pollId }) => {
//       console.log("Received 'deletePoll' event for pollId:", pollId);
//       useFeedStore.getState().deletePoll(pollId);
//       toast.info("A poll has been deleted.");
//     });

//     socket.on("disconnect", (reason) => {
//       console.log(`Disconnected from Socket.io server: ${reason}`);
//       set({ socket: null });
//       if (reason === "io server disconnect") {
//         // Attempt to reconnect
//         socket.connect();
//       }
//     });

//     socket.on("connect_error", (error) => {
//       console.error("Connection error:", error);
//       if (error.message === "Authentication error") {
//         toast.error("Authentication failed. Please log in again.");
//         useAuthStore.getState().logout();
//       } else {
//         toast.error("Failed to connect to the server.");
//       }
//     });

//     set({ socket });
//   },

//   disconnect: () => {
//     if (get().socket) {
//       get().socket.disconnect();
//       set({ socket: null });
//     }
//   },
// }));

// export default useSocketStore;


// src/store/socketStore.js
import { create } from "zustand";
import { io } from "socket.io-client";
import useFeedStore from "./feedStore";
import useAuthStore from "./store"; // Corrected import path
import { toast } from "react-toastify";

const useSocketStore = create((set, get) => ({
  socket: null,

  connect: () => {
    if (get().socket) {
      console.log("Socket already connected");
      return;
    }

    const token = localStorage.getItem("accessToken"); // Ensure you have accessToken in authStore
    if (!token) {
      console.error("No access token found. Please log in.");
      return;
    }

    const socket = io("http://localhost:6060", {
      transports: ["websocket"],
      auth: {
        token: token,
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server:", socket.id);
    });

    // Real-time event listeners

    // Listening to new posts
    socket.on("newPost", (post) => {
      console.log("Received 'newPost' event:", post);
      useFeedStore.getState().addPost(post);
      toast.info("A new post has been added.");
    });

    // Listening to updates on posts (likes, edits)
    socket.on("updatePost", (updatedPost) => {
      console.log("Received 'updatePost' event:", updatedPost);
      
      // Ensure 'type' field is present
      if (!updatedPost.type) {
        console.warn("Received 'updatePost' event without 'type' field:", updatedPost);
        // Optionally, set a default type or handle the missing type
        updatedPost.type = "post"; // Assuming it's a post
      }

      useFeedStore.getState().updatePost(updatedPost);
      toast.info("A post has been updated.");
    });

    // Listening to deleted posts
    socket.on("deletePost", ({ postId }) => {
      console.log("Received 'deletePost' event for postId:", postId);
      useFeedStore.getState().deletePost(postId);
      toast.info("A post has been deleted.");
    });

    // Listening to new comments
    socket.on("newComment", ({ postId, comment }) => {
      console.log("Received 'newComment' event:", postId, comment);
      
      if (!comment.commenter) {
        console.warn("Received 'newComment' event without 'commenter' data:", comment);
        // Assign default commenter information
        comment.commenter = {
          user_Avatar: "https://via.placeholder.com/150",
          first_Name: "Unknown",
          last_Name: "User",
          employee_Id: "N/A",
          _id: "unknown",
        };
      }

      useFeedStore.getState().addCommentToPost(postId, comment);
      toast.info("A new comment has been added.");
    });

    // Listening to updated comments
    socket.on("updateComment", (updatedComment) => {
      console.log("Received 'updateComment' event:", updatedComment);
      
      if (!updatedComment.post) {
        console.warn("Received 'updateComment' event without 'post' field:", updatedComment);
        return;
      }

      if (!updatedComment.commenter) {
        console.warn("Received 'updateComment' event without 'commenter' data:", updatedComment);
        // Assign default commenter information
        updatedComment.commenter = {
          user_Avatar: "https://via.placeholder.com/150",
          first_Name: "Unknown",
          last_Name: "User",
          employee_Id: "N/A",
          _id: "unknown",
        };
      }

      useFeedStore.getState().updateCommentInPost(updatedComment.post, updatedComment);
      toast.info("A comment has been updated.");
    });

    // Listening to deleted comments
    socket.on("deleteComment", ({ postId, commentId }) => {
      console.log("Received 'deleteComment' event for postId:", postId, "commentId:", commentId);
      useFeedStore.getState().deleteCommentFromPost(postId, commentId);
      toast.info("A comment has been deleted.");
    });

    // Listening to new polls
    socket.on("newPoll", (poll) => {
      console.log("Received 'newPoll' event:", poll);
      useFeedStore.getState().addPoll(poll);
      toast.info("A new poll has been created.");
    });

    // // Listening to updated polls
    // socket.on("updatePoll", (updatedPoll) => {
    //   console.log("Received 'updatePoll' event:", updatedPoll);
    //   useFeedStore.getState().updatePoll(updatedPoll);
    //   toast.info("A poll has been updated.");
    // });

    // // Listening to deleted polls
    // socket.on("deletePoll", ({ pollId }) => {
    //   console.log("Received 'deletePoll' event for pollId:", pollId);
    //   useFeedStore.getState().deletePoll(pollId);
    //   toast.info("A poll has been deleted.");
    // });

    // Listening to updated polls
socket.on("updatePoll", (updatedPoll) => {
  console.log("Received 'updatePoll' event:", updatedPoll);
  
  // Optionally verify the type
  if (updatedPoll.type !== "poll") {
    console.warn("Received 'updatePoll' event with unexpected type:", updatedPoll.type);
    return; // Handle other types or ignore
  }

  useFeedStore.getState().updatePoll(updatedPoll);
  toast.info("A poll has been updated.");
});

// Listening to deleted polls
socket.on("deletePoll", ({ pollId, type }) => {
  console.log("Received 'deletePoll' event for pollId:", pollId);

  // Optionally verify the type
  if (type !== "poll") {
    console.warn("Received 'deletePoll' event with unexpected type:", type);
    return; // Handle other types or ignore
  }

  useFeedStore.getState().deletePoll(pollId);
  toast.info("A poll has been deleted.");
});


    socket.on("disconnect", (reason) => {
      console.log(`Disconnected from Socket.io server: ${reason}`);
      set({ socket: null });
      if (reason === "io server disconnect") {
        // Attempt to reconnect
        socket.connect();
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      if (error.message === "Authentication error") {
        toast.error("Authentication failed. Please log in again.");
        useAuthStore.getState().logout();
      } else {
        toast.error("Failed to connect to the server.");
      }
    });

    set({ socket });
  },

  disconnect: () => {
    if (get().socket) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));

export default useSocketStore;
