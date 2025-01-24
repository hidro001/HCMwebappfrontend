import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions,
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Skeleton,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import useAnnouncementStore from "../../store/announcementStore";
import { toast } from "react-toastify";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";


const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: "16px",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
  },
}));

const ViewAnnouncements = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Pull announcements from store
  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
    fetchAnnouncements,
  } = useAnnouncementStore();

  // We no longer fetch or store departments since we removed filtering by dept.
  // ───────────────────────────────────────────────────────────────────────────

  // Detailed Announcement Dialog
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Infinite Scroll
  const [visibleCount, setVisibleCount] = useState(18); // Initial # to display

  // Filters (now only search + sort)
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch announcements on mount
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Search
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSortOrder("Newest");
    setSearchQuery("");
  };

  // Sort
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Card Click => Show detail dialog
  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDetailDialog(true);
  };

  // Filter + Sort Logic (now ignoring departments)
  const filteredAnnouncements = useMemo(() => {
    return announcements
      // Filter by search
      .filter((announcement) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          announcement.announcementSubject.toLowerCase().includes(q) ||
          announcement.announcementDescription.toLowerCase().includes(q)
        );
      })
      // Sort by date
      .sort((a, b) => {
        if (sortOrder === "Newest") {
          return new Date(b.announcementDate) - new Date(a.announcementDate);
        } else {
          return new Date(a.announcementDate) - new Date(b.announcementDate);
        }
      });
  }, [announcements, searchQuery, sortOrder]);

  // Infinite Scroll
  const fetchMoreData = () => {
    if (visibleCount >= filteredAnnouncements.length) return;
    setTimeout(() => {
      setVisibleCount((prev) => prev + 18);
    }, 500);
  };

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(18);
  }, [filteredAnnouncements, sortOrder, searchQuery]);

  return (
    <Box
      className="min-h-screen p-6"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {/* Header */}
      <Box className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Typography variant="h4" className="mb-4 md:mb-0">
          View Announcements
        </Typography>
      </Box>

      {/* Search, Sort, and Clear Filters (no department filter) */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 4,
          borderRadius: "16px",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-around"
        >
          {/* Search Bar */}
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" alignItems="center">
              <FaSearch style={{ marginRight: 8, color: "grey" }} />
              <TextField
                label="Search Announcements"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                fullWidth
              />
            </Box>
          </Grid>

          {/* Sort by Date */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-order-label">Sort by Date</InputLabel>
              <Select
                labelId="sort-order-label"
                id="sort-order"
                value={sortOrder}
                label="Sort by Date"
                onChange={handleSortOrderChange}
              >
                <MenuItem value="Newest">Newest First</MenuItem>
                <MenuItem value="Oldest">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Clear Filters Button */}
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<FaFilter />}
              onClick={handleClearFilters}
              fullWidth
              sx={{ height: "100%" }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Announcements List with Infinite Scroll */}
      <Box>
        {announcementsLoading ? (
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Skeleton variant="rectangular" height={100} />
                <Box mt={2}>
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : announcementsError ? (
          <Typography color="error" align="center">
            {announcementsError}
          </Typography>
        ) : filteredAnnouncements.length === 0 ? (
          <Typography align="center">
            No announcements found for the selected criteria.
          </Typography>
        ) : (
          <InfiniteScroll
            dataLength={visibleCount}
            next={fetchMoreData}
            hasMore={visibleCount < filteredAnnouncements.length}
            loader={
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            }
            style={{ overflow: "visible" }}
          >
            {/* Single row "card" layout */}
            {filteredAnnouncements.slice(0, visibleCount).map((announcement) => (
              <StyledCard
                key={announcement._id}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCardClick(announcement)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  mb: 2, // spacing between cards
                }}
              >
                {/* Left: Announcement Image */}
                <Box
                  sx={{
                    width: 100,
                    height: 80,
                    overflow: "hidden",
                    borderRadius: 1,
                    flexShrink: 0,
                    mr: 10,
                  }}
                >
                  {announcement.announcementPostImg ? (
                    <img
                      src={announcement.announcementPostImg}
                      alt={announcement.announcementSubject}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      loading="lazy"
                    />
                  ) : (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                  )}
                </Box>

                {/* Middle: Subject, Date, Department(s) */}
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  {/* Date */}
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    {announcement.announcementDate
                      ? new Date(announcement.announcementDate).toLocaleString()
                      : ""}
                  </Typography>

                  {/* Subject / Title */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "green" }}
                    noWrap
                  >
                    {announcement.announcementSubject}
                  </Typography>

                  {/* Departments (just for display) */}
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, overflow: "hidden", textOverflow: "ellipsis" }}
                    noWrap
                  >
                    Department:{" "}
                    {announcement.publish_for_all
                      ? "All"
                      : announcement.department
                          .map((dept) => dept.department)
                          .join(", ")}
                  </Typography>
                </Box>
              </StyledCard>
            ))}
          </InfiniteScroll>
        )}
      </Box>

      {/* Detailed Announcement Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby="detail-announcement-dialog-title"
        PaperComponent={motion.div}
        PaperProps={{
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3 },
          sx: {
            backgroundColor: "background.paper",
            borderRadius: "16px",
          },
        }}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <DialogTitle id="detail-announcement-dialog-title">
          Announcement Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedAnnouncement ? (
            <Box>
              {/* Close Button */}
              <IconButton
                onClick={() => setOpenDetailDialog(false)}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: 16,
                  color: "grey.500",
                }}
                aria-label="Close announcement details"
              >
                <FaTimes />
              </IconButton>

              {/* Announcement Image */}
              {selectedAnnouncement.announcementPostImg ? (
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={selectedAnnouncement.announcementPostImg}
                    alt={selectedAnnouncement.announcementSubject}
                    style={{ width: "100%", height: "100%", objectFit: "contain " }}
                    loading="lazy"
                  />
                </Box>
              ) : (
                <Skeleton variant="rectangular" height={300} width="100%" />
              )}

              {/* Announcement Details */}
              <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                  {selectedAnnouncement.announcementSubject || <Skeleton />}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedAnnouncement.announcementDescription || <Skeleton />}
                </Typography>
                <Box
                  mt={2}
                  display="flex"
                  flexDirection={isSmallScreen ? "column" : "row"}
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    Date:{" "}
                    {selectedAnnouncement.announcementDate
                      ? new Date(
                          selectedAnnouncement.announcementDate
                        ).toLocaleDateString()
                      : <Skeleton width="50%" />}
                  </Typography>
                  <Chip
                    label={
                      selectedAnnouncement.publish_for_all
                        ? "All Departments"
                        : `${selectedAnnouncement.department.length} Dept`
                    }
                    color={selectedAnnouncement.publish_for_all ? "primary" : "secondary"}
                    size="small"
                  />
                </Box>
                <Typography variant="subtitle2" color="textSecondary" mt={1}>
                  <strong>Departments:</strong>{" "}
                  {selectedAnnouncement.publish_for_all
                    ? "All Departments"
                    : selectedAnnouncement.department
                        .map((dept) => dept.department)
                        .join(", ")}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ViewAnnouncements;
