
// import React, { useState, useEffect } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { motion } from "framer-motion";
// import axiosInstance from "../../service/axiosInstance";
// import useAuthStore from "../../store/store";
// import { toast } from "react-toastify";
// import PropTypes from "prop-types";

// const PollCard = ({ poll, refreshFeed }) => {
//   const user = useAuthStore((state) => state);
//   const userId = user._id || user.employeeId; // Corrected line
//   const permissions = user.permissions || [];

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [hasVoted, setHasVoted] = useState(
//     poll.votes.some((vote) => vote.user === userId)
//   );
//   const [isVoting, setIsVoting] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Determine the option the user has voted for
//   const userVote = poll.votes.find((vote) => vote.user === userId);
//   const userSelectedOptionId = userVote ? userVote.option : null;

//   useEffect(() => {
//     console.log("Poll Data:", poll);
//     console.log("User ID:", userId);
//     console.log("Has Voted:", hasVoted);
//     console.log("User Selected Option:", userSelectedOptionId);
//   }, [poll, userId, hasVoted, userSelectedOptionId]);

//   const handleVote = async () => {
//     if (selectedOption === null) {
//       toast.error("Please select an option to vote.");
//       return;
//     }

//     setIsVoting(true);
//     try {
//       await axiosInstance.post(`/polls/${poll._id}/vote`, {
//         optionId: selectedOption,
//       });
//       toast.success("Your vote has been recorded!");
//       setHasVoted(true);
//       // Refresh the feed to show updated votes
//       refreshFeed();
//     } catch (error) {
//       console.error("Error voting on poll:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to vote. Please try again."
//       );
//     } finally {
//       setIsVoting(false);
//     }
//   };

//   const handleDeletePoll = async () => {
//     if (!window.confirm("Are you sure you want to delete this poll?")) return;
//     setIsDeleting(true);
//     try {
//       await axiosInstance.delete(`/polls/${poll._id}`);
//       toast.success("Poll deleted successfully!");
//       // Refresh the feed to remove the deleted poll
//       refreshFeed();
//     } catch (error) {
//       console.error("Error deleting poll:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to delete poll. Please try again."
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // Calculate total votes
//   const totalVotes = poll.options.reduce(
//     (acc, option) => acc + option.votes,
//     0
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 p-6 transition-colors duration-300"
//     >
//       {/* Poll Header */}
//       <div className="flex items-center space-x-4">
//         <img
//           src={poll.creator.user_Avatar || "https://via.placeholder.com/150"}
//           alt="Avatar"
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//             {poll.creator.first_Name} {poll.creator.last_Name} ({poll.creator.employee_Id})
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             {new Date(poll.createdAt).toLocaleString()}
//           </p>
//         </div>
//         {(permissions.includes("deleteAnyPoll") ||
//           userId === poll.creator._id ||
//           userId === poll.creator.employeeId) && (
//           <button
//             onClick={handleDeletePoll}
//             disabled={isDeleting}
//             className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300"
//             title="Delete Poll"
//           >
//             <DeleteIcon />
//           </button>
//         )}
//       </div>

//       {/* Poll Question */}
//       <div className="mt-4">
//         <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
//           {poll.question}
//         </p>
//       </div>

//       {/* Poll Options */}
//       <div className="mt-4">
//         {poll.options.map((option) => {
//           const percentage =
//             totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
//           const isUserChoice = userSelectedOptionId === option._id;

//           return (
//             <div key={option._id} className="mb-4">
//               <label className="inline-flex items-center w-full">
//                 <input
//                   type="radio"
//                   name={`poll-${poll._id}`}
//                   value={option._id}
//                   className="form-radio h-5 w-5 text-blue-600"
//                   checked={selectedOption === option._id}
//                   onChange={() => setSelectedOption(option._id)}
//                   disabled={hasVoted || !poll.isActive}
//                 />
//                 <span className="ml-2 flex-1 text-gray-700 dark:text-gray-300">
//                   {option.text}
//                 </span>
//               </label>
//               {hasVoted && (
//                 <div className="mt-2">
//                   <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                     <div
//                       className={`bg-blue-600 h-2 rounded-full ${
//                         isUserChoice ? "border-2 border-yellow-500" : ""
//                       }`}
//                       style={{
//                         width: `${percentage}%`,
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {option.votes} vote{option.votes !== 1 ? "s" : ""} (
//                     {percentage}%)
//                   </p>
//                   {isUserChoice && (
//                     <p className="text-sm text-green-600 dark:text-green-400">
//                       You voted for this option
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Poll Actions */}
//       {poll.isActive && !hasVoted && (
//         <div className="mt-4">
//           <button
//             onClick={handleVote}
//             disabled={isVoting || selectedOption === null}
//             className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ${
//               isVoting || selectedOption === null
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""
//             }`}
//           >
//             {isVoting ? "Voting..." : "Vote"}
//           </button>
//         </div>
//       )}

//       {!poll.isActive && (
//         <p className="mt-4 text-red-500">This poll has ended.</p>
//       )}
//     </motion.div>
//   );
// };

// PollCard.propTypes = {
//   poll: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     question: PropTypes.string.isRequired,
//     options: PropTypes.arrayOf(
//       PropTypes.shape({
//         text: PropTypes.string.isRequired,
//         votes: PropTypes.number.isRequired,
//         _id: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     creator: PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       first_Name: PropTypes.string.isRequired,
//       last_Name: PropTypes.string.isRequired,
//       employee_Id: PropTypes.string.isRequired,
//       user_Avatar: PropTypes.string,
//     }).isRequired,
//     isActive: PropTypes.bool.isRequired,
//     duration: PropTypes.number.isRequired,
//     endTime: PropTypes.string.isRequired,
//     votes: PropTypes.arrayOf(
//       PropTypes.shape({
//         user: PropTypes.string.isRequired,
//         option: PropTypes.string.isRequired,
//         _id: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     createdAt: PropTypes.string.isRequired,
//     updatedAt: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//   }).isRequired,
//   refreshFeed: PropTypes.func.isRequired,
// };

// export default PollCard;

// src/components/PollCard.js
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import axiosInstance from "../../service/axiosInstance";
import useAuthStore from "../../store/store";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Button, CircularProgress, IconButton } from "@mui/material";

const PollCard = ({ poll, refreshFeed }) => {
  const user = useAuthStore((state) => state);
  const userId = user._id || user.employeeId; // Corrected line
  const permissions = user.permissions || [];

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(
    poll.votes.some((vote) => vote.user === userId)
  );
  const [isVoting, setIsVoting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Determine the option the user has voted for
  const userVote = poll.votes.find((vote) => vote.user === userId);
  const userSelectedOptionId = userVote ? userVote.option : null;

  // useEffect(() => {
  //   console.log("Poll Data:", poll);
  //   console.log("User ID:", userId);
  //   console.log("Has Voted:", hasVoted);
  //   console.log("User Selected Option:", userSelectedOptionId);
  // }, [poll, userId, hasVoted, userSelectedOptionId]);

  const handleVote = async () => {
    if (selectedOption === null) {
      toast.error("Please select an option to vote.");
      return;
    }

    setIsVoting(true);
    try {
      await axiosInstance.post(`/polls/${poll._id}/vote`, {
        optionId: selectedOption,
      });
      toast.success("Your vote has been recorded!");
      setHasVoted(true);
      // Refresh the feed to show updated votes
      refreshFeed();
    } catch (error) {
      console.error("Error voting on poll:", error);
      toast.error(
        error.response?.data?.message || "Failed to vote. Please try again."
      );
    } finally {
      setIsVoting(false);
    }
  };

  const handleDeletePoll = async () => {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/polls/${poll._id}`);
      toast.success("Poll deleted successfully!");
      // Refresh the feed to remove the deleted poll
      refreshFeed();
    } catch (error) {
      console.error("Error deleting poll:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete poll. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Calculate total votes
  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 p-6 transition-colors duration-300"
    >
      {/* Poll Header */}
      <div className="flex items-center space-x-4">
        <img
          src={poll.creator.user_Avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {poll.creator.first_Name} {poll.creator.last_Name} ({poll.creator.employee_Id})
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(poll.createdAt).toLocaleString()}
          </p>
        </div>
        {(permissions.includes("deleteAnyPoll") ||
          userId === poll.creator._id ||
          userId === poll.creator.employeeId) && (
          <IconButton
            onClick={handleDeletePoll}
            disabled={isDeleting}
            className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300"
            title="Delete Poll"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>

      {/* Poll Question */}
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-bold">
          {poll.question}
        </p>
      </div>

      {/* Poll Options */}
      <div className="mt-4">
        {poll.options.map((option) => {
          const percentage =
            totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
          const isUserChoice = userSelectedOptionId === option._id;

          return (
            <div key={option._id} className="mb-4">
              <label className="inline-flex items-center w-full">
                <input
                  type="radio"
                  name={`poll-${poll._id}`}
                  value={option._id}
                  className="form-radio h-5 w-5 text-blue-600"
                  checked={selectedOption === option._id}
                  onChange={() => setSelectedOption(option._id)}
                  disabled={hasVoted || !poll.isActive}
                />
                <span className="ml-2 flex-1 text-gray-700 dark:text-gray-300">
                  {option.text}
                </span>
              </label>
              {hasVoted && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`bg-blue-600 h-2 rounded-full ${
                        isUserChoice ? "border-2 border-yellow-500" : ""
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {option.votes} vote{option.votes !== 1 ? "s" : ""} (
                    {percentage}%)
                  </p>
                  {isUserChoice && (
                    <p className="text-sm text-green-600 dark:text-green-400">
                      You voted for this option
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Poll Actions */}
      {poll.isActive && !hasVoted && (
        <div className="mt-4">
          <Button
            onClick={handleVote}
            disabled={isVoting || selectedOption === null}
            variant="contained"
            color="primary"
            fullWidth
            startIcon={isVoting && <CircularProgress size={20} />}
          >
            {isVoting ? "Voting..." : "Vote"}
          </Button>
        </div>
      )}

      {!poll.isActive && (
        <p className="mt-4 text-red-500">This poll has ended.</p>
      )}
    </motion.div>
  );
};

PollCard.propTypes = {
  poll: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        votes: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      first_Name: PropTypes.string.isRequired,
      last_Name: PropTypes.string.isRequired,
      employee_Id: PropTypes.string.isRequired,
      user_Avatar: PropTypes.string,
    }).isRequired,
    isActive: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    endTime: PropTypes.string.isRequired,
    votes: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        option: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  refreshFeed: PropTypes.func.isRequired,
};

export default PollCard;
