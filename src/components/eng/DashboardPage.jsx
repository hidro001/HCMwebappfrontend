// src/pages/DashboardPage.js
import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Notifications from '../Notification/NotificationsPage';
import CreatePostModal from './CreatePostModal';

const DashboardPage = () => {
  const [openPostModal, setOpenPostModal] = useState(false);

  return (
    <Box className="flex">
      <Sidebar />
      <Box className="flex-1 ml-60">
        <Navbar />
        <Feed />
        {/* <Notifications /> */}
        <Fab
          color="primary"
          aria-label="add"
          className="fixed bottom-10 right-10"
          onClick={() => setOpenPostModal(true)}
        >
          <AddIcon />
        </Fab>
        <CreatePostModal
          open={openPostModal}
          handleClose={() => setOpenPostModal(false)}
        />
      </Box>
    </Box>
  );
};

export default DashboardPage;
