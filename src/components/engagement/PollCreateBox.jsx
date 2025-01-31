
import  { useState } from "react";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-toastify";
import { Button, CircularProgress, TextField, IconButton, Grid, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PollCreateBox = ({ onSuccess }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // Start with 2 empty options
  const [duration, setDuration] = useState(24); // Default duration in hours
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, idx) => idx !== index);
      setOptions(newOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || options.some((opt) => !opt.trim()) || !duration) {
      toast.error("Please fill in all fields.");
      return;
    }

    const payload = {
      question,
      options: options.filter((opt) => opt.trim() !== ""), // Remove empty options
      duration: parseInt(duration),
    };

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post("/polls", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Poll created successfully!");
      setQuestion("");
      setOptions(["", ""]);
      setDuration(24);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating poll:", error);
      toast.error(
        error.response?.data?.message || "Failed to create poll. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Question */}
      <TextField
        label="Question"
        variant="outlined"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      {/* Options */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Options
        </label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <TextField
              label={`Option ${index + 1}`}
              variant="outlined"
              fullWidth
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
            {options.length > 2 && (
              <IconButton
                onClick={() => removeOption(index)}
                className="ml-2"
                color="error"
                aria-label="remove option"
              >
                <RemoveIcon />
              </IconButton>
            )}
          </div>
        ))}
        {options.length < 5 && (
          <Button
            type="button"
            onClick={addOption}
            variant="text"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Option
          </Button>
        )}
      </div>

      {/* Duration */}
      <TextField
        label="Duration"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">hours</InputAdornment>,
          inputProps: { min: 1, step: 1 },
        }}
        variant="outlined"
        fullWidth
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        fullWidth
        startIcon={isSubmitting && <CircularProgress size={20} />}
      >
        {isSubmitting ? "Creating..." : "Create Poll"}
      </Button>
    </form>
  );
};

export default PollCreateBox;


