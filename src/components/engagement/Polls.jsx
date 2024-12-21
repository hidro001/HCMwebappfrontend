// // src/components/engagement/Poll.js
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
//   LinearProgress,
// } from '@mui/material';
// import { submitPollResponse } from '../../service/service';
// import { toast } from 'react-toastify';
// import useAuthStore from '../../store/store';

// const Poll = ({ poll }) => {
//   const { userName, userAvatar, employeeId } = useAuthStore();
//   const [selectedOption, setSelectedOption] = useState('');
//   const [loading, setLoading] = useState(false);

//   const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

//   const handleVote = async () => {
//     if (!selectedOption) {
//       toast.error('Please select an option.');
//       return;
//     }
//     setLoading(true);
//     try {
//       await submitPollResponse(poll._id, selectedOption);
//       toast.success('Vote submitted successfully.');
//       // Optionally, update the poll locally or rely on real-time updates
//     } catch (error) {
//       console.error('Error submitting vote:', error);
//       toast.error(error.response?.data?.message || 'Failed to submit vote.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="subtitle1">{poll.question}</Typography>
//       <RadioGroup
//         value={selectedOption}
//         onChange={(e) => setSelectedOption(e.target.value)}
//       >
//         {poll.options.map((opt, index) => (
//           <FormControlLabel
//             key={index}
//             value={opt.option}
//             control={<Radio />}
//             label={`${opt.option} (${opt.votes} votes)`}
//           />
//         ))}
//       </RadioGroup>
//       <Button variant="contained" color="primary" onClick={handleVote} disabled={loading}>
//         {loading ? 'Voting...' : 'Vote'}
//       </Button>
//       <Box mt={2}>
//         {poll.options.map((opt, index) => (
//           <Box key={index} mb={1}>
//             <Typography variant="body2">{opt.option}</Typography>
//             <LinearProgress
//               variant="determinate"
//               value={totalVotes ? (opt.votes / totalVotes) * 100 : 0}
//             />
//             <Typography variant="caption">{opt.votes} votes</Typography>
//           </Box>
//         ))}
//         <Typography variant="caption" color="text.secondary">
//           Total Votes: {totalVotes}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Poll;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
} from '@mui/material';
import { submitPollResponse } from '../../service/service';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/store';

const Poll = ({ poll }) => {
  const { userName, userAvatar, employeeId } = useAuthStore();
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);

  // Safely access poll options or use an empty array as a fallback
  const pollOptions = poll?.options || [];
  const totalVotes = pollOptions.reduce((acc, opt) => acc + opt.votes, 0);

  const handleVote = async () => {
    if (!selectedOption) {
      toast.error('Please select an option.');
      return;
    }
    setLoading(true);
    try {
      await submitPollResponse(poll._id, selectedOption);
      toast.success('Vote submitted successfully.');
      // Optionally, update the poll locally or rely on real-time updates
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast.error(error.response?.data?.message || 'Failed to submit vote.');
    } finally {
      setLoading(false);
    }
  };

  // Return early if poll is undefined
  if (!poll) {
    return (
      <Typography variant="subtitle1" color="text.secondary">
        Poll data is not available.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle1">{poll.question}</Typography>
      <RadioGroup
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {pollOptions.map((opt, index) => (
          <FormControlLabel
            key={index}
            value={opt.option}
            control={<Radio />}
            label={`${opt.option} (${opt.votes} votes)`}
          />
        ))}
      </RadioGroup>
      <Button variant="contained" color="primary" onClick={handleVote} disabled={loading}>
        {loading ? 'Voting...' : 'Vote'}
      </Button>
      <Box mt={2}>
        {pollOptions.map((opt, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body2">{opt.option}</Typography>
            <LinearProgress
              variant="determinate"
              value={totalVotes ? (opt.votes / totalVotes) * 100 : 0}
            />
            <Typography variant="caption">{opt.votes} votes</Typography>
          </Box>
        ))}
        <Typography variant="caption" color="text.secondary">
          Total Votes: {totalVotes}
        </Typography>
      </Box>
    </Box>
  );
};

export default Poll;
