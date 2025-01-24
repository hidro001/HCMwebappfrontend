
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
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
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";



// 2) Import react-hot-toast
import { toast } from "react-hot-toast";

// 3) Optionally, you can import the default styles here or in your top-level App:
// import 'react-hot-toast/dist/react-hot-toast.css';

import useAnnouncementStore from "../../store/announcementStore";
import useDepartmentStore from "../../store/departmentStore";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

// If you want to show toasts, it's typical to place <Toaster /> somewhere in your App.
// For demonstration, you can place it in this file:

// Styled Components using Material-UI
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

const AnimatedButton = motion(Button);

const MakeAnnouncement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
    fetchAnnouncements,
    addAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
  } = useAnnouncementStore();

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments,
  } = useDepartmentStore();

  // State for Add Announcement Dialog
  const [openAddModal, setOpenAddModal] = useState(false);

  // Form State for Adding Announcement
  const [formData, setFormData] = useState({
    announcementDate: "",
    announcementSubject: "",
    announcementPostImg: null,
    announcementDescription: "",
    publishForAll: true,
    selectedDepartments: [],
  });

  // State for Edit Announcement Modal
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

  // State for Confirmation Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null,
  });

  // State for Detailed Announcement Dialog
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // State for Infinite Scroll
  const [visibleCount, setVisibleCount] = useState(18); // Initial number of announcements to display

  // State for Filters
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch departments and announcements on mount
  useEffect(() => {
    fetchDepartments();
    fetchAnnouncements();
  }, [fetchDepartments, fetchAnnouncements]);

  // Handle input changes for Add Announcement Form
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      if (name === "publishForAll") {
        setFormData({
          ...formData,
          publishForAll: checked,
          selectedDepartments: checked ? [] : formData.selectedDepartments,
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle department checkbox selection for Add Announcement
  const handleDepartmentSelection = (deptId) => {
    setFormData((prevData) => {
      const isSelected = prevData.selectedDepartments.includes(deptId);
      const updatedDepartments = isSelected
        ? prevData.selectedDepartments.filter((id) => id !== deptId)
        : [...prevData.selectedDepartments, deptId];

      return {
        ...prevData,
        selectedDepartments: updatedDepartments,
        publishForAll: false,
      };
    });
  };

  // Handle form submission for Adding Announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.announcementDate) {
      toast.error("Announcement date is required");
      return;
    }
    if (!formData.announcementSubject.trim()) {
      toast.error("Announcement subject is required");
      return;
    }
    if (!formData.announcementDescription.trim()) {
      toast.error("Announcement description is required");
      return;
    }
    if (!formData.publishForAll && formData.selectedDepartments.length === 0) {
      toast.error("Please select at least one department");
      return;
    }

    // Show confirmation dialog
    setConfirmDialog({
      open: true,
      title: "Publish Announcement",
      content: "Do you want to publish this announcement?",
      onConfirm: async () => {
        try {
          const announcementDetails = new FormData();
          announcementDetails.append("announcementDate", formData.announcementDate);
          announcementDetails.append("announcementSubject", formData.announcementSubject);
          if (formData.announcementPostImg) {
            announcementDetails.append("announcementPostImg", formData.announcementPostImg);
          }
          announcementDetails.append("announcementDescription", formData.announcementDescription);
          announcementDetails.append("publish_for_all", formData.publishForAll);
          formData.selectedDepartments.forEach((deptId) => {
            announcementDetails.append("department[]", deptId);
          });

          await addAnnouncement(
            announcementDetails,
            localStorage.getItem("accessToken")
          );

          // Reset form
          setFormData({
            announcementDate: "",
            announcementSubject: "",
            announcementPostImg: null,
            announcementDescription: "",
            publishForAll: true,
            selectedDepartments: [],
          });

          setOpenAddModal(false);
          toast.success("Announcement published successfully!");
        } catch (error) {
          toast.error("Failed to publish announcement.");
        } finally {
          setConfirmDialog({ ...confirmDialog, open: false });
        }
      },
    });
  };

  // Handle Delete Announcement
  const handleDelete = (id) => {
    setConfirmDialog({
      open: true,
      title: "Delete Announcement",
      content: "Are you sure you want to delete this announcement?",
      onConfirm: async () => {
        try {
          await deleteAnnouncement(id);
          toast.success("Announcement deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete announcement.");
        } finally {
          setConfirmDialog({ ...confirmDialog, open: false });
        }
      },
    });
  };

  // Handle Open Edit Modal
  const handleOpenEditModal = (announcement) => {
    setCurrentAnnouncement({
      ...announcement,
      publishForAll: announcement.publish_for_all,
      selectedDepartments: announcement.publish_for_all
        ? []
        : announcement.department.map((dept) => dept._id),
      announcementPostImgUrl: announcement.announcementPostImg,
    });
    setOpenEditModal(true);
  };

  // Handle Close Edit Modal
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentAnnouncement(null);
  };

  // Handle Update Form Submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!currentAnnouncement.announcementDate) {
      toast.error("Announcement date is required");
      return;
    }
    if (!currentAnnouncement.announcementSubject.trim()) {
      toast.error("Announcement subject is required");
      return;
    }
    if (!currentAnnouncement.announcementDescription.trim()) {
      toast.error("Announcement description is required");
      return;
    }
    if (
      !currentAnnouncement.publishForAll &&
      currentAnnouncement.selectedDepartments.length === 0
    ) {
      toast.error("Please select at least one department");
      return;
    }

    // Show confirmation dialog
    setConfirmDialog({
      open: true,
      title: "Update Announcement",
      content: "Do you want to update this announcement?",
      onConfirm: async () => {
        try {
          const announcementDetails = new FormData();
          announcementDetails.append(
            "announcementDate",
            currentAnnouncement.announcementDate
          );
          announcementDetails.append(
            "announcementSubject",
            currentAnnouncement.announcementSubject
          );
          if (currentAnnouncement.announcementPostImg) {
            announcementDetails.append(
              "announcementPostImg",
              currentAnnouncement.announcementPostImg
            );
          }
          announcementDetails.append(
            "announcementDescription",
            currentAnnouncement.announcementDescription
          );
          announcementDetails.append(
            "publish_for_all",
            currentAnnouncement.publishForAll
          );
          currentAnnouncement.selectedDepartments.forEach((deptId) => {
            announcementDetails.append("department[]", deptId);
          });

          await updateAnnouncement(
            currentAnnouncement._id,
            announcementDetails
          );

          handleCloseEditModal();
          toast.success("Announcement updated successfully!");
        } catch (error) {
          toast.error("Failed to update announcement.");
        } finally {
          setConfirmDialog({ ...confirmDialog, open: false });
        }
      },
    });
  };

  // Handle department selection in edit modal
  const handleEditModalDepartmentSelection = (deptId) => {
    setCurrentAnnouncement((prev) => {
      const isSelected = prev.selectedDepartments.includes(deptId);
      const updatedDepartments = isSelected
        ? prev.selectedDepartments.filter((id) => id !== deptId)
        : [...prev.selectedDepartments, deptId];

      return {
        ...prev,
        selectedDepartments: updatedDepartments,
        publishForAll: false,
      };
    });
  };

  // Handle input changes within the Edit Announcement Modal
  const handleModalChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "file") {
      setCurrentAnnouncement((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      if (name === "publishForAll") {
        setCurrentAnnouncement((prev) => ({
          ...prev,
          publishForAll: checked,
          selectedDepartments: checked ? [] : prev.selectedDepartments,
        }));
      }
    } else {
      setCurrentAnnouncement((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle Card Click to Open Detailed Dialog
  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDetailDialog(true);
  };

  // Handle Search Query Change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Clear Filters
  const handleClearFilters = () => {
    setFilterDepartment("All");
    setSortOrder("Newest");
    setSearchQuery("");
  };

  // Handle Filter Department Change
  const handleFilterDepartmentChange = (e) => {
    setFilterDepartment(e.target.value);
  };

  // Handle Sort Order Change
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Apply Filters, Sorting, and Search
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((announcement) => {
        if (filterDepartment === "All") return true;
        return (
          !announcement.publish_for_all &&
          announcement.department &&
          announcement.department.some((dept) => dept._id === filterDepartment)
        );
      })
      .filter((announcement) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          announcement.announcementSubject.toLowerCase().includes(query) ||
          announcement.announcementDescription.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "Newest") {
          return new Date(b.announcementDate) - new Date(a.announcementDate);
        } else if (sortOrder === "Oldest") {
          return new Date(a.announcementDate) - new Date(b.announcementDate);
        }
        return 0;
      });
  }, [announcements, filterDepartment, sortOrder, searchQuery]);

  // Debugging
  useEffect(() => {
    console.log("Filter Department ID:", filterDepartment);
    console.log("Search Query:", searchQuery);
    console.log("Filtered Announcements Count:", filteredAnnouncements.length);
    console.log("Filtered Announcements:", filteredAnnouncements);
  }, [filteredAnnouncements, filterDepartment, searchQuery]);

  // Load more data (Infinite Scroll)
  const fetchMoreData = () => {
    if (visibleCount >= filteredAnnouncements.length) return;
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 18);
    }, 500);
  };

  useEffect(() => {
    setVisibleCount(18);
  }, [filteredAnnouncements, filterDepartment, sortOrder, searchQuery]);

  return (
    <Box
      className="min-h-screen p-6 dark:bg-gray-900"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {/* Insert the Toaster somewhere in your app (can be top-level) */}

      {/* Header with Add Announcement Button */}
      <Box className="flex flex-col md:flex-row justify-between items-center mb-6 ">
        <Typography variant="h4" className="mb-4 md:mb-0">
          Manage Announcements
        </Typography>
        <AnimatedButton
          variant="contained"
          color="secondary"
          startIcon={<FaPlus />}
          onClick={() => setOpenAddModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            backgroundColor: "yellow.600",
            color: "indigo.600",
            "&:hover": {
              backgroundColor: "indigo.100",
            },
          }}
        >
          Add Announcement
        </AnimatedButton>
      </Box>

      {/* Search, Filter, Sort, and Clear Filters Section */}
      <Paper
      className=" dark:bg-gray-800"
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 4,
          borderRadius: "16px",
        }}
      >
        <Grid container spacing={2} alignItems="center" className="">
          {/* Search Bar */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center">
              <FaSearch style={{ marginRight: "8px", color: "grey" }} />
              <TextField
                label="Search Announcements"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                fullWidth
              />
            </Box>
          </Grid>

          {/* Filter by Department */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="filter-department-label">
                Filter by Department
              </InputLabel>
              <Select
                labelId="filter-department-label"
                id="filter-department"
                value={filterDepartment}
                label="Filter by Department"
                onChange={handleFilterDepartmentChange}
              >
                <MenuItem value="All">All Departments</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept._id} value={dept._id}>
                    {dept.department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              startIcon={<FaFilter />}
              onClick={handleClearFilters}
              fullWidth
              sx={{
                height: "100%",
              }}
              aria-label="Clear all filters"
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Announcements Section with Infinite Scroll */}
      <Box >
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
          <Typography color="error" className="text-center">
            {announcementsError}
          </Typography>
        ) : filteredAnnouncements.length === 0 ? (
          <Typography className="text-center">
            No announcements found for the selected criteria.
          </Typography>
        ) : (
          <InfiniteScroll
            dataLength={visibleCount}
            next={fetchMoreData}
            hasMore={visibleCount < filteredAnnouncements.length}
            loader={
              <Box className="flex justify-center items-center my-4">
                <CircularProgress />
              </Box>
            }
            style={{ overflow: "visible" }}
          >
            <Grid container spacing={2} className="">
              {filteredAnnouncements.slice(0, visibleCount).map((announcement) => (
                <Grid item xs={12} key={announcement._id}>
                  {/* Single row "card" layout */}
                  <StyledCard
                  className="dark:bg-gray-800"
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleCardClick(announcement)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      p: 2,
                    }}
                  >
                    {/* Left Side: Image */}
                    <Box
                      sx={{
                        width: 100,
                        height: 80,
                        overflow: "hidden",
                        borderRadius: 1,
                        flexShrink: 0,
                        mr: 4,
                      }}
                    >
                      {announcement.announcementPostImg ? (
                        <img
                          src={announcement.announcementPostImg}
                          alt={announcement.announcementSubject}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px ",
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height="100%"
                        />
                      )}
                    </Box>

                    {/* Middle: Text details */}
                    <Box sx={{ flexGrow: 1, minWidth: 0, p: 2 }}>
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

                      {/* Department */}
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

                    {/* Right Side: Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        // flexDirection: "column",
                        gap: 6,
                        ml: 2,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AnimatedButton
                        variant="contained"
                        startIcon={<FaEdit />}
                        onClick={() => handleOpenEditModal(announcement)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          backgroundColor: "#d4af37",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#b28a2d",
                          },
                        }}
                      >
                        Edit
                      </AnimatedButton>
                      <AnimatedButton
                        variant="contained"
                        startIcon={<FaTrash />}
                        onClick={() => handleDelete(announcement._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                          backgroundColor: "#b71c1c",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#8e1717",
                          },
                        }}
                      >
                        Delete
                      </AnimatedButton>
                    </Box>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        )}
      </Box>

      {/* Add Announcement Dialog */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby="add-announcement-dialog-title"
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
        <DialogTitle id="add-announcement-dialog-title">
          Add Announcement
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              {/* Announcement Date */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Announcement Date"
                  type="date"
                  name="announcementDate"
                  value={formData.announcementDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  fullWidth
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                />
              </Grid>

              {/* Announcement Subject */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Subject or Title"
                  type="text"
                  name="announcementSubject"
                  value={formData.announcementSubject}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>

              {/* Announcement Image */}
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="body1" gutterBottom>
                  Post Image
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{
                    backgroundColor: "indigo.600",
                    "&:hover": {
                      backgroundColor: "indigo.700",
                    },
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    name="announcementPostImg"
                    hidden
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Button>
                {formData.announcementPostImg && (
                  <Typography variant="body2" mt={1}>
                    {formData.announcementPostImg.name}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Announcement Description */}
            <Box mt={4}>
              <TextField
                label="Announcement Description"
                name="announcementDescription"
                value={formData.announcementDescription}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
              />
            </Box>

            {/* Posting Options */}
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.publishForAll}
                    onChange={handleChange}
                    name="publishForAll"
                    color="primary"
                  />
                }
                label="Publish for all departments"
              />
            </Box>

            {/* Specific Departments Selection */}
            {!formData.publishForAll && (
              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  Select Departments
                </Typography>
                <Grid container spacing={1}>
                  {departments.map((dept) => (
                    <Grid item xs={6} sm={4} md={3} key={dept._id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.selectedDepartments.includes(dept._id)}
                            onChange={() => handleDepartmentSelection(dept._id)}
                            name="selectedDepartments"
                            color="primary"
                          />
                        }
                        label={dept.department}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Submit Button */}
            <Box mt={4} display="flex" justifyContent="flex-end">
              <AnimatedButton
                type="submit"
                variant="contained"
                color="secondary"
                disabled={announcementsLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  backgroundColor: "indigo.600",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "indigo.700",
                  },
                }}
                aria-label="Publish Announcement"
              >
                {announcementsLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Publish"
                )}
              </AnimatedButton>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Dialog */}
      <Dialog
        open={openEditModal}
        onClose={handleCloseEditModal}
        fullWidth
        maxWidth="md"
        aria-labelledby="edit-announcement-dialog-title"
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
        <DialogTitle id="edit-announcement-dialog-title">
          Edit Announcement
        </DialogTitle>
        <DialogContent>
          {currentAnnouncement && (
            <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
              <Grid container spacing={2}>
                {/* Announcement Date */}
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Announcement Date"
                    type="date"
                    name="announcementDate"
                    value={currentAnnouncement.announcementDate}
                    onChange={handleModalChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    fullWidth
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
                  />
                </Grid>

                {/* Announcement Subject */}
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Subject or Title"
                    type="text"
                    name="announcementSubject"
                    value={currentAnnouncement.announcementSubject}
                    onChange={handleModalChange}
                    required
                    fullWidth
                  />
                </Grid>

                {/* Announcement Image */}
                <Grid item xs={12} sm={12} md={4}>
                  <Typography variant="body1" gutterBottom>
                    Post Image
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{
                      backgroundColor: "indigo.600",
                      "&:hover": {
                        backgroundColor: "indigo.700",
                      },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      name="announcementPostImg"
                      hidden
                      accept="image/*"
                      onChange={handleModalChange}
                    />
                  </Button>
                  {currentAnnouncement.announcementPostImg && (
                    <Typography variant="body2" mt={1}>
                      {currentAnnouncement.announcementPostImg.name}
                    </Typography>
                  )}
                  {currentAnnouncement.announcementPostImgUrl && (
                    <Box mt={2}>
                      <img
                        src={currentAnnouncement.announcementPostImgUrl}
                        alt={currentAnnouncement.announcementSubject}
                        className="w-full h-24 rounded-md object-cover"
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>

              {/* Announcement Description */}
              <Box mt={4}>
                <TextField
                  label="Announcement Description"
                  name="announcementDescription"
                  value={currentAnnouncement.announcementDescription}
                  onChange={handleModalChange}
                  required
                  multiline
                  rows={4}
                  fullWidth
                />
              </Box>

              {/* Posting Options */}
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentAnnouncement.publishForAll}
                      onChange={handleModalChange}
                      name="publishForAll"
                      color="primary"
                    />
                  }
                  label="Publish for all departments"
                />
              </Box>

              {/* Specific Departments Selection */}
              {!currentAnnouncement.publishForAll && (
                <Box mt={2}>
                  <Typography variant="body1" gutterBottom>
                    Select Departments
                  </Typography>
                  <Grid container spacing={1}>
                    {departments.map((dept) => (
                      <Grid item xs={6} sm={4} md={3} key={dept._id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={currentAnnouncement.selectedDepartments.includes(
                                dept._id
                              )}
                              onChange={() =>
                                handleEditModalDepartmentSelection(dept._id)
                              }
                              name="selectedDepartments"
                              color="primary"
                            />
                          }
                          label={dept.department}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Submit Button */}
              <Box mt={4} display="flex" justifyContent="flex-end">
                <AnimatedButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={announcementsLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    backgroundColor: "indigo.600",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "indigo.700",
                    },
                  }}
                  aria-label="Update Announcement"
                >
                  {announcementsLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Update"
                  )}
                </AnimatedButton>
              </Box>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
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
        <DialogTitle id="confirm-dialog-title">
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <Typography id="confirm-dialog-description">
            {confirmDialog.content}
          </Typography>
        </DialogContent>
        <MuiDialogActions>
          <Button
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            sx={{
              backgroundColor: "grey.300",
              color: "grey.800",
              "&:hover": {
                backgroundColor: "grey.400",
              },
            }}
            aria-label="Cancel action"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDialog.onConfirm}
            sx={{
              backgroundColor: "red",
              color: "yellow",
              "&:hover": {
                backgroundColor: "indigo.700",
              },
            }}
            aria-label="Confirm action"
          >
            Confirm
          </Button>
        </MuiDialogActions>
      </Dialog>

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
                <Box className="w-full h-64 overflow-hidden rounded-md">
                  <img
                    src={selectedAnnouncement.announcementPostImg}
                    alt={selectedAnnouncement.announcementSubject}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </Box>
              ) : (
                <Skeleton variant="rectangular" height={256} width="100%" />
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
                      ? new Date(selectedAnnouncement.announcementDate).toLocaleDateString()
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
            <Box className="flex justify-center items-center h-64">
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MakeAnnouncement;

