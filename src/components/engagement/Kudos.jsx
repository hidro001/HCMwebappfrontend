// src/components/engagement/Kudos.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { giveKudos, fetchKudos } from '../../service/service';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/store';
import useKudosStore from '../../store/kudosStore';

const Kudos = ({ targetType, targetId }) => {
  const { userName, userAvatar, employeeId } = useAuthStore();
  const { kudos, fetchKudos: fetchKudosFromStore, addKudos } = useKudosStore();
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('😊');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchKudosFromStore(1, 10);
    // eslint-disable-next-line
  }, []);

  const handleGiveKudos = async () => {
    if (!recipientId || !message || !emoji) {
      toast.error('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      const kudosData = { recipientId, message, emoji };
      const newKudos = await giveKudos(kudosData);
      addKudos(newKudos);
      toast.success('Kudos given successfully.');
      setRecipientId('');
      setMessage('');
      setEmoji('😊');
    } catch (error) {
      console.error('Error giving kudos:', error);
      toast.error(error.response?.data?.message || 'Failed to give kudos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Give Kudos:
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Avatar src={userAvatar} alt={userName} />
        <TextField
          label="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Emoji"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setEmoji('😊')}>
                <EmojiEvents />
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleGiveKudos} disabled={loading}>
          {loading ? 'Sending...' : 'Give Kudos'}
        </Button>
      </Box>

      {/* Kudos List */}
      <Typography variant="subtitle1" gutterBottom>
        Recent Kudos:
      </Typography>
      <Grid container spacing={2}>
        {kudos.map((kudosItem) => (
          <Grid item xs={12} sm={6} md={4} key={kudosItem._id}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar src={kudosItem.sender.userAvatar} alt={kudosItem.sender.userName} />
              <Box ml={2}>
                <Typography variant="body1">
                  <strong>{kudosItem.sender.userName}</strong> gave you a kudos: {kudosItem.emoji}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {kudosItem.message}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Kudos;
