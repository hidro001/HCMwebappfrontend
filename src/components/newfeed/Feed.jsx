

// // src/components/Feed.js
// import React, { useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import PostCard from "./PostCard";
// import PostCreateBox from "./PostCreateBox";
// import { motion } from "framer-motion";



// // Helper function to generate dummy comments
// const generateComments = () => {
//   const commentUsers = [
//     "Samuel Bishop",
//     "Dennis Barrett",
//     "Judy Nguyen",
//     "Lori Ferguson",
//     "Frances Guerrero",
//     "Alex Turner",
//     "Maria Sanchez",
//     "John Doe",
//     "Jane Smith",
//     "Emily Clark",
//   ];
  
//   const commentTexts = [
//     "Amazing achievement!",
//     "Well done!",
//     "Sounds exciting!",
//     "Beautiful view!",
//     "Great capture!",
//     "Congratulations!",
//     "Keep it up!",
//     "Inspiring!",
//     "Awesome!",
//     "Love this!",
//   ];
  
//   const numberOfComments = Math.floor(Math.random() * 5); // Up to 4 comments
  
//   const comments = [];
//   for (let i = 0; i < numberOfComments; i++) {
//     const user = commentUsers[Math.floor(Math.random() * commentUsers.length)];
//     const text = commentTexts[Math.floor(Math.random() * commentTexts.length)];
//     comments.push({ user, text });
//   }
  
//   return comments;
// };

// // Helper function to generate dummy posts
// const generateDummyPosts = (startId, count) => {
//   const users = [
//     "Frances Guerrero",
//     "Lori Ferguson",
//     "Judy Nguyen",
//     "Samuel Bishop",
//     "Dennis Barrett",
//     "Alex Turner",
//     "Maria Sanchez",
//     "John Doe",
//     "Jane Smith",
//     "Emily Clark",
//     "Michael Brown",
//     "Sarah Johnson",
//     "David Lee",
//     "Laura Wilson",
//     "Robert Davis",
//     "Linda Martinez",
//     "James Taylor",
//     "Barbara Anderson",
//     "William Thomas",
//     "Elizabeth Jackson",
//     "Charles White",
//     "Jennifer Harris",
//     "Thomas Martin",
//     "Patricia Thompson",
//     "Christopher Garcia",
//   ];
  
//   const texts = [
//     "Excited to start my new project!",
//     "Just completed a marathon.",
//     "Loving the new React features.",
//     "Had a great day exploring the city.",
//     "Sharing my latest blog post.",
//     "Celebrating my friend's achievement!",
//     "Check out this cool photo I took.",
//     "Feeling grateful today.",
//     "Join me in this exciting journey.",
//     "Learning new things every day.",
//     "Had an amazing weekend with family.",
//     "Just launched my portfolio website.",
//     "Inspired by the latest tech trends.",
//     "Participating in a hackathon.",
//     "Enjoying some quality time reading.",
//     "Working on improving my skills.",
//     "Attended an insightful webinar.",
//     "Collaborating with some talented people.",
//     "Taking a break to recharge.",
//     "Exploring new opportunities.",
//     "Creating something innovative.",
//     "Proud of my team's efforts.",
//     "Embracing the future with open arms.",
//     "Sharing my thoughts on technology.",
//     "Looking forward to new challenges.",
//   ];
  
//   const images = [
//     "https://images.pexels.com/photos/6565069/pexels-photo-6565069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     "https://images.pexels.com/photos/8471859/pexels-photo-8471859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     "https://via.placeholder.com/550x350",
//     "https://via.placeholder.com/500x500",
//     "https://via.placeholder.com/700x400",
//   ];
  
//   const posts = [];
  
//   for (let i = 0; i < count; i++) {
//     const id = startId + i;
//     const user = users[i % users.length];
//     const text = texts[i % texts.length];
//     const image = i % 3 === 0 ? images[i % images.length] : null; // Every 3rd post has an image
//     const likes = Math.floor(Math.random() * 100);
//     const comments = generateComments();
//     const timeAgoOptions = [
//       "Just now",
//       "5 minutes ago",
//       "10 minutes ago",
//       "30 minutes ago",
//       "1 hour ago",
//       "2 hours ago",
//       "Yesterday",
//       "2 days ago",
//       "3 days ago",
//       "Last week",
//     ];
//     const time = timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)];
    
//     posts.push({
//       id,
//       avatar: `https://i.pravatar.cc/150?img=${id}`, // Unique avatar based on id
//       user,
//       time,
//       text,
//       image,
//       likes,
//       comments,
//     });
//   }
  
//   return posts;
// };

// const Feed = () => {

  
//   // Initialize with 25 dummy posts
//   const [posts, setPosts] = useState(generateDummyPosts(1, 25));

//   const fetchMorePosts = () => {
//     // Simulate fetching more posts (e.g., next 10 posts)
//     const newPosts = generateDummyPosts(posts.length + 1, 10);
//     setTimeout(() => setPosts((prev) => [...prev, ...newPosts]), 1500);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
//     >
  
//       <div className="flex justify-center">
//         <div className="w-full max-w-lg">
//           <PostCreateBox />
//           <InfiniteScroll
//             dataLength={posts.length}
//             next={fetchMorePosts}
//             hasMore={true}
//             loader={
//               <h4 className="text-center text-gray-500 dark:text-gray-400">Loading...</h4>
//             }
//           >
//             {posts.map((post) => (
//               <PostCard key={post.id} post={post} />
//             ))}
//           </InfiniteScroll>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Feed;

// src/components/Feed.js
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard";
import PostCreateBox from "./PostCreateBox";
import { motion } from "framer-motion";
import axiosInstance from "../../service/axiosInstance";
import useAuthStore from "../../store/store";
import io from "socket.io-client";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const user = useAuthStore((state) => state);
  const accessToken = user.accessToken;

  // Initialize Socket.IO
  const socket = io(import.meta.env.VITE_API_BASE_URL, {
    auth: {
      token: accessToken,
    },
    transports: ["websocket"],
  });

  useEffect(() => {
    fetchPosts();

    // Listen for real-time events
    socket.on("newPost", (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    socket.on("updatePost", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    });

    socket.on("deletePost", ({ postId }) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts", {
        params: { page, limit: 10 },
      });
      setPosts((prevPosts) => [...prevPosts, ...response.data.docs]);
      setHasMore(response.data.docs.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <PostCreateBox socket={socket} />
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={
              <h4 className="text-center text-gray-500 dark:text-gray-400">Loading...</h4>
            }
            endMessage={
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                You have seen all posts.
              </p>
            }
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} socket={socket} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </motion.div>
  );
};

export default Feed;

