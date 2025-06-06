

import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import axiosInstance from "../../../service/axiosInstance";
import useAuthStore from "../../../store/store"; // Corrected import path
import useFeedStore from "../../../store/feedStore";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Button, CircularProgress, IconButton, Grid } from "@mui/material";
import { useEffect, useState } from "react";

const PollCard = ({ poll }) => {
  const user = useAuthStore((state) => state);
  const userId = user._id; 
  const userEmployeeId = user.employeeId; 
  const permissions = user.permissionRole || [];

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [isVoting, setIsVoting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

 
  React.useEffect(() => {
    console.log("Current userId:", userId);
    console.log("Current userEmployeeId:", userEmployeeId);
    console.log("Poll votes:", poll.votes);
  }, [userId, userEmployeeId, poll.votes]);

  
  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date();
      const endTime = new Date(poll.endTime);
      const timeDiff = endTime - now;

      if (timeDiff <= 0) {
        setTimeRemaining("Voting has ended");
        return;
      }

      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [poll.endTime]);

  
  const userVote = React.useMemo(() => {
    return poll.votes.find((vote) => {
      if (vote.user && typeof vote.user === "object") {
        // Compare using _id and employee_Id
        return (
          (vote.user._id && vote.user._id === userId) ||
          (vote.user.employee_Id && vote.user.employee_Id === userEmployeeId)
        );
      }
      // If vote.user is a string, compare directly
      return vote.user === userId || vote.user === userEmployeeId;
    });
  }, [poll.votes, userId, userEmployeeId]);

  const userSelectedOptionId = userVote ? userVote.option : null;
  const hasVoted = Boolean(userVote);

  /**
   * Handle voting on a poll option.
   */
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
      // Update the feed store; Socket.io will handle real-time updates across clients
      const { data: updatedPoll } = await axiosInstance.get(`/polls/${poll._id}`);
      useFeedStore.getState().updatePoll(updatedPoll);

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
      useFeedStore.getState().deletePoll(poll._id);
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
  const totalVotes = React.useMemo(
    () => poll.options.reduce((acc, option) => acc + option.votes, 0),
    [poll.options]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" w-full mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-2 p-4 transition-colors duration-300"
    >
      {/* Poll Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
        <img
          src={poll.creator?.user_Avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="mt-2 sm:mt-0">
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {poll.creator?.first_Name || "Unknown"}{" "}
            {poll.creator?.last_Name || "User"} (
            {poll.creator?.employee_Id || "N/A"})
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isNaN(new Date(poll.createdAt))
              ? "Date not available"
              : new Date(poll.createdAt).toLocaleString()}
          </p>
        </div>
        {(permissions.includes("deleteAnyPoll") ||
          userId === poll.creator?._id ||
          userEmployeeId === poll.creator?.employee_Id) && (
          <IconButton
            onClick={handleDeletePoll}
            disabled={isDeleting}
            className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-300 mt-2 sm:mt-0"
            title="Delete Poll"
          >
            {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
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
      <div className="mt-4 space-y-4">
        <Grid container spacing={2}>
          {poll.options.map((option) => {
            const percentage =
              totalVotes > 0
                ? ((option.votes / totalVotes) * 100).toFixed(1)
                : 0;
            const isUserChoice = userSelectedOptionId === option._id;

            return (
              <Grid item xs={12} key={option._id}>
                <div className="flex flex-col">
                  <label className="inline-flex items-center w-full ">
                    <input
                      type="radio"
                      name={`poll-${poll._id}`}
                      value={option._id}
                      className="form-radio h-5 w-5 text-blue-600"
                      checked={selectedOption === option._id || isUserChoice}
                      onChange={() => setSelectedOption(option._id)}
                      disabled={hasVoted || !poll.isActive}
                      aria-checked={
                        selectedOption === option._id || isUserChoice
                      }
                      aria-disabled={hasVoted || !poll.isActive}
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
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
              </Grid>
            );
          })}
        </Grid>
      </div>
      {/* Countdown Timer */}
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <strong >Time Remaining : </strong> <span className="text-red-400 font-semibold">{timeRemaining}</span> 
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

      {/* {!poll.isActive && (
        <p className="mt-4 text-red-500">This poll has ended.</p>
      )} */}
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
        user: PropTypes.oneOfType([
          PropTypes.shape({
            _id: PropTypes.string,
            employee_Id: PropTypes.string,
            // Add other user fields if necessary
          }),
          PropTypes.string, // if vote.user is string
        ]).isRequired,
        option: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // Ensure 'type' is included
  }).isRequired,
};

export default PollCard;
