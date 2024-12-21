// src/components/engagement/Reactions.js
import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addReaction, removeReaction } from '../../service/service';
import useEngagementStore from '../../store/engagementStore';
import { toast } from 'react-toastify';

const Reactions = ({ targetType, targetId }) => {
  const userPermissions = useEngagementStore((state) => state.permissions);
  const [hasReacted, setHasReacted] = useState(false);
  const [reactionCount, setReactionCount] = useState(0);

  // Assume reactions are fetched via the post data or an API
  // For simplicity, we'll initialize with mock data
  useEffect(() => {
    // Fetch reactions count and user reaction status
    // This should be replaced with actual API calls or data from the post
    setReactionCount(5); // Example count
    setHasReacted(false); // Example status
  }, [targetType, targetId]);

  const handleReact = async () => {
    if (hasReacted) {
      try {
        await removeReaction({ targetType, targetId });
        setHasReacted(false);
        setReactionCount((prev) => prev - 1);
        toast.success('Reaction removed.');
      } catch (error) {
        console.error('Error removing reaction:', error);
        toast.error(error.response?.data?.message || 'Failed to remove reaction.');
      }
    } else {
      try {
        await addReaction({ targetType, targetId, type: 'like' });
        setHasReacted(true);
        setReactionCount((prev) => prev + 1);
        toast.success('Reacted successfully.');
      } catch (error) {
        console.error('Error adding reaction:', error);
        toast.error(error.response?.data?.message || 'Failed to react.');
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton aria-label="react" onClick={handleReact} color={hasReacted ? 'error' : 'default'}>
        {hasReacted ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
      <Typography variant="body2">{reactionCount} Reactions</Typography>
    </Box>
  );
};

export default Reactions;
