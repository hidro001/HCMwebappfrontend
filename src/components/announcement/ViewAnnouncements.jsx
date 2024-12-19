// // src/components/ViewAnnouncements.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Card,
//   CardContent,
//   Chip,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Dialog ,
//   DialogTitle ,
//   DialogContent 
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { motion } from "framer-motion";
// import InfiniteScroll from "react-infinite-scroll-component";
// import useAnnouncementStore from "../../store/announcementStore";
// import useDepartmentStore from "../../store/departmentStore";
// import { FaTimes } from "react-icons/fa";

// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.primary,
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   borderRadius: "16px",
//   transition: "transform 0.3s, box-shadow 0.3s",
//   cursor: "pointer",
//   "&:hover": {
//     transform: "translateY(-8px)",
//     boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
//   },
// }));

// const ViewAnnouncements = () => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const {
//     announcements,
//     loading: announcementsLoading,
//     error: announcementsError,
//     fetchAnnouncements,
//   } = useAnnouncementStore();

//   const {
//     departments,
//     loading: departmentsLoading,
//     error: departmentsError,
//     fetchDepartments,
//   } = useDepartmentStore();

//   // State for Detailed Announcement Dialog
//   const [openDetailDialog, setOpenDetailDialog] = useState(false);
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

//   // State for Infinite Scroll
//   const [visibleCount, setVisibleCount] = useState(18); // Initial number of announcements to display

//   // State for Filters
//   const [filterDepartment, setFilterDepartment] = useState("All");
//   const [sortOrder, setSortOrder] = useState("Newest");

//   // Fetch departments and announcements on mount
//   useEffect(() => {
//     fetchDepartments();
//     fetchAnnouncements();
//   }, [fetchDepartments, fetchAnnouncements]);

//   // Handle Filter Changes
//   const handleFilterDepartmentChange = (e) => {
//     setFilterDepartment(e.target.value);
//   };

//   const handleSortOrderChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   // Apply Filters and Sorting using useMemo for performance optimization
//   const filteredAnnouncements = useMemo(() => {
//     return announcements
//       .filter((announcement) => {
//         if (filterDepartment === "All") return true;

//         // Include only announcements specifically for the selected department
//         return (
//           !announcement.publish_for_all &&
//           announcement.department &&
//           announcement.department.some((dept) => dept._id === filterDepartment)
//         );
//       })
//       .sort((a, b) => {
//         if (sortOrder === "Newest") {
//           return new Date(b.announcementDate) - new Date(a.announcementDate);
//         } else if (sortOrder === "Oldest") {
//           return new Date(a.announcementDate) - new Date(b.announcementDate);
//         }
//         return 0;
//       });
//   }, [announcements, filterDepartment, sortOrder]);

//   // Debugging: Log filter criteria and results
//   useEffect(() => {
//     // console.log("Filter Department ID:", filterDepartment);
//     // console.log("Filtered Announcements Count:", filteredAnnouncements.length);
//     // console.log("Filtered Announcements:", filteredAnnouncements);
//   }, [filteredAnnouncements, filterDepartment]);

//   // Function to load more announcements
//   const fetchMoreData = () => {
//     if (visibleCount >= filteredAnnouncements.length) {
//       return;
//     }
//     // Simulate a delay for loading
//     setTimeout(() => {
//       setVisibleCount((prevCount) => prevCount + 18);
//     }, 500);
//   };

//   // Reset visibleCount when filters change
//   useEffect(() => {
//     setVisibleCount(18);
//   }, [filteredAnnouncements, filterDepartment, sortOrder]);

//   // Handle Card Click to Open Detailed Dialog
//   const handleCardClick = (announcement) => {
//     setSelectedAnnouncement(announcement);
//     setOpenDetailDialog(true);
//   };

//   return (
//     <Box
//       className="min-h-screen p-6"
//       sx={{
//         backgroundColor: "background.default",
//         color: "text.primary",
//         transition: "background-color 0.3s, color 0.3s",
//       }}
//     >
//       {/* Header */}
//       <Box className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <Typography variant="h4" className="mb-4 md:mb-0">
//           Announcements
//         </Typography>
//       </Box>

//       {/* Filter and Sort Section */}
//       <Box className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
//         {/* Filter by Department */}
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel id="filter-department-label">Filter by Department</InputLabel>
//           <Select
//             labelId="filter-department-label"
//             id="filter-department"
//             value={filterDepartment}
//             label="Filter by Department"
//             onChange={handleFilterDepartmentChange}
//           >
//             <MenuItem value="All">All Departments</MenuItem>
//             {departments.map((dept) => (
//               <MenuItem key={dept._id} value={dept._id}>
//                 {dept.department}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Sort by Date */}
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel id="sort-order-label">Sort by Date</InputLabel>
//           <Select
//             labelId="sort-order-label"
//             id="sort-order"
//             value={sortOrder}
//             label="Sort by Date"
//             onChange={handleSortOrderChange}
//           >
//             <MenuItem value="Newest">Newest First</MenuItem>
//             <MenuItem value="Oldest">Oldest First</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Announcements Section with Infinite Scroll */}
//       <Box>
//         {announcementsLoading ? (
//           <Box className="flex justify-center items-center h-64">
//             <CircularProgress />
//           </Box>
//         ) : announcementsError ? (
//           <Typography color="error" className="text-center">
//             {announcementsError}
//           </Typography>
//         ) : filteredAnnouncements.length === 0 ? (
//           <Typography className="text-center">
//             No announcements found for the selected department.
//           </Typography>
//         ) : (
//           <InfiniteScroll
//             dataLength={visibleCount} // This is important field to render the next data
//             next={fetchMoreData}
//             hasMore={visibleCount < filteredAnnouncements.length}
//             loader={
//               <Box className="flex justify-center items-center my-4">
//                 <CircularProgress />
//               </Box>
//             }
//             // endMessage={
//             //   <Typography className="text-center my-4">
//             //     <b>Yay! You have seen all announcements.</b>
//             //   </Typography>
//             // }
//           >
//             <Grid container spacing={3}>
//               {filteredAnnouncements.slice(0, visibleCount).map((announcement) => (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={4}
//                   lg={3}
//                   xl={2}
//                   key={announcement._id}
//                 >
//                   <StyledCard
//                     onClick={() => handleCardClick(announcement)}
//                     component={motion.div}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <CardContent>
//                       <Box className="flex flex-col items-center">
//                         {/* Announcement Image */}
//                         {announcement.announcementPostImg && (
//                           <Box className="w-full h-40 overflow-hidden rounded-md">
//                             <img
//                               src={announcement.announcementPostImg}
//                               alt={announcement.announcementSubject}
//                               className="w-full h-full object-cover"
//                             />
//                           </Box>
//                         )}

//                         {/* Announcement Details */}
//                         <Box className="mt-4 w-full">
//                           <Typography variant="h6" className="text-indigo-600">
//                             {announcement.announcementSubject}
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             className="text-gray-600 mt-2"
//                             sx={{
//                               display: "-webkit-box",
//                               WebkitLineClamp: 3,
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                             }}
//                           >
//                             {announcement.announcementDescription}
//                           </Typography>
//                           <Box className="mt-2 flex items-center justify-between">
//                             <Typography variant="caption" className="text-gray-500">
//                               {new Date(announcement.announcementDate).toLocaleDateString()}
//                             </Typography>
//                             <Chip
//                               label={
//                                 announcement.publish_for_all
//                                   ? "All Departments"
//                                   : `${announcement.department.length} Dept`
//                               }
//                               color={
//                                 announcement.publish_for_all ? "primary" : "secondary"
//                               }
//                               size="small"
//                             />
//                           </Box>
//                           <Typography
//                             variant="caption"
//                             className="text-gray-500 mt-1 block"
//                           >
//                             <strong>Department:</strong>{" "}
//                             {announcement.publish_for_all
//                               ? "All Departments"
//                               : announcement.department
//                                   .map((dept) => dept.department)
//                                   .join(", ")}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </StyledCard>
//                 </Grid>
//               ))}
//             </Grid>
//           </InfiniteScroll>
//         )}
//       </Box>

//       {/* Detailed Announcement Dialog */}
//       <Dialog
//         open={openDetailDialog}
//         onClose={() => setOpenDetailDialog(false)}
//         fullWidth
//         maxWidth="md"
//         aria-labelledby="detail-announcement-dialog-title"
//         PaperComponent={motion.div}
//         PaperProps={{
//           initial: { opacity: 0, scale: 0.8 },
//           animate: { opacity: 1, scale: 1 },
//           transition: { duration: 0.3 },
//           sx: {
//             backgroundColor: "background.paper",
//             borderRadius: "16px",
//           },
//         }}
//         BackdropProps={{
//           style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
//         }}
//       >
//         <DialogTitle id="detail-announcement-dialog-title">
//           Announcement Details
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedAnnouncement && (
//             <Box>
//               {/* Close Button */}
//               <IconButton
//                 onClick={() => setOpenDetailDialog(false)}
//                 sx={{
//                   position: "absolute",
//                   right: 16,
//                   top: 16,
//                   color: "grey.500",
//                 }}
//               >
//                 <FaTimes />
//               </IconButton>

//               {/* Announcement Image */}
//               {selectedAnnouncement.announcementPostImg && (
//                 <Box className="w-full h-64 overflow-hidden rounded-md">
//                   <img
//                     src={selectedAnnouncement.announcementPostImg}
//                     alt={selectedAnnouncement.announcementSubject}
//                     className="w-full h-full object-cover"
//                   />
//                 </Box>
//               )}

//               {/* Announcement Details */}
//               <Box mt={4}>
//                 <Typography variant="h5" gutterBottom>
//                   {selectedAnnouncement.announcementSubject}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   {selectedAnnouncement.announcementDescription}
//                 </Typography>
//                 <Box
//                   mt={2}
//                   display="flex"
//                   flexDirection={isSmallScreen ? "column" : "row"}
//                   justifyContent="space-between"
//                 >
//                   <Typography variant="subtitle2" color="textSecondary">
//                     Date:{" "}
//                     {new Date(
//                       selectedAnnouncement.announcementDate
//                     ).toLocaleDateString()}
//                   </Typography>
//                   <Chip
//                     label={
//                       selectedAnnouncement.publish_for_all
//                         ? "All Departments"
//                         : `${selectedAnnouncement.department.length} Dept`
//                     }
//                     color={
//                       selectedAnnouncement.publish_for_all
//                         ? "primary"
//                         : "secondary"
//                     }
//                     size="small"
//                   />
//                 </Box>
//                 <Typography variant="subtitle2" color="textSecondary" mt={1}>
//                   <strong>Departments:</strong>{" "}
//                   {selectedAnnouncement.publish_for_all
//                     ? "All Departments"
//                     : selectedAnnouncement.department
//                         .map((dept) => dept.department)
//                         .join(", ")}
//                 </Typography>
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default ViewAnnouncements;

// src/components/ViewAnnouncements.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
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
import InfiniteScroll from "react-infinite-scroll-component";
import useAnnouncementStore from "../../store/announcementStore";
import useDepartmentStore from "../../store/departmentStore";
import { toast } from "react-toastify";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

// Styled Components using Material-UI
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: "16px",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer", // Indicate that the card is clickable
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
  },
}));

const AnimatedButton = motion(Button);

const ViewAnnouncements = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
    fetchAnnouncements,
    deleteAnnouncement,
    updateAnnouncement, // Assuming you have update functionality
  } = useAnnouncementStore();

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments,
  } = useDepartmentStore();

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

  // Handle Card Click to Open Detailed Dialog
  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setOpenDetailDialog(true);
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
      announcementPostImgUrl: announcement.announcementPostImg, // Adjust based on actual data structure
    });
    setOpenEditModal(true);
  };

  // Handle Close Edit Modal
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentAnnouncement(null);
  };

  // Handle Input Changes within the Edit Announcement Modal
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
          // Prepare form data
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

          // Update announcement
          await updateAnnouncement(
            currentAnnouncement._id,
            announcementDetails
          );

          // Close modal
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

  // Apply Filters, Sorting, and Search using useMemo for performance optimization
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((announcement) => {
        if (filterDepartment === "All") return true;

        // Include only announcements specifically for the selected department
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

  // Debugging: Log filter criteria and results
  useEffect(() => {
    console.log("Filter Department ID:", filterDepartment);
    console.log("Search Query:", searchQuery);
    console.log("Filtered Announcements Count:", filteredAnnouncements.length);
    console.log("Filtered Announcements:", filteredAnnouncements);
  }, [filteredAnnouncements, filterDepartment, searchQuery]);

  // Function to load more announcements
  const fetchMoreData = () => {
    if (visibleCount >= filteredAnnouncements.length) {
      return;
    }
    // Simulate a delay for loading
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 18);
    }, 500);
  };

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(18);
  }, [filteredAnnouncements, filterDepartment, sortOrder, searchQuery]);

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
        {/* Optional: Add a button or link if needed */}
      </Box>

      {/* Search, Filter, Sort, and Clear Filters Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 4,
          borderRadius: "16px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
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
      <Box>
        {announcementsLoading ? (
          <Grid container spacing={3}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                <Skeleton variant="rectangular" height={200} />
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
            dataLength={visibleCount} // This is important field to render the next data
            next={fetchMoreData}
            hasMore={visibleCount < filteredAnnouncements.length}
            loader={
              <Box className="flex justify-center items-center my-4">
                <CircularProgress />
              </Box>
            }
            // endMessage={
            //   <Typography className="text-center my-4">
            //     <b>Yay! You have seen all announcements.</b>
            //   </Typography>
            // }
            style={{ overflow: "visible" }} // Prevents internal scroll
          >
            <Grid container spacing={3}>
              {filteredAnnouncements.slice(0, visibleCount).map((announcement) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  key={announcement._id}
                >
                  <StyledCard
                    onClick={() => handleCardClick(announcement)}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleCardClick(announcement);
                    }}
                    aria-label={`View details of announcement: ${announcement.announcementSubject}`}
                  >
                    <CardContent>
                      <Box className="flex flex-col items-center">
                        {/* Announcement Image */}
                        {announcement.announcementPostImg ? (
                          <Box className="w-full h-40 overflow-hidden rounded-md">
                            <img
                              src={announcement.announcementPostImg}
                              alt={announcement.announcementSubject}
                              className="w-full h-full object-cover"
                              loading="lazy" // Lazy loading for performance
                            />
                          </Box>
                        ) : (
                          <Skeleton variant="rectangular" height={160} width="100%" />
                        )}

                        {/* Announcement Details */}
                        <Box className="mt-4 w-full">
                          <Typography variant="h6" className="text-indigo-600">
                            {announcement.announcementSubject || <Skeleton />}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-600 mt-2"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {announcement.announcementDescription || <Skeleton />}
                          </Typography>
                          <Box className="mt-2 flex items-center justify-between">
                            <Typography variant="caption" className="text-gray-500">
                              {announcement.announcementDate
                                ? new Date(announcement.announcementDate).toLocaleDateString()
                                : <Skeleton width="50%" />}
                            </Typography>
                            <Chip
                              label={
                                announcement.publish_for_all
                                  ? "All Departments"
                                  : `${announcement.department.length} Dept`
                              }
                              color={
                                announcement.publish_for_all ? "primary" : "secondary"
                              }
                              size="small"
                            />
                          </Box>
                          <Typography
                            variant="caption"
                            className="text-gray-500 mt-1 block"
                          >
                            <strong>Department:</strong>{" "}
                            {announcement.publish_for_all
                              ? "All Departments"
                              : announcement.department
                                  .map((dept) => dept.department)
                                  .join(", ")}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions className="justify-end">
                      <AnimatedButton
                        size="small"
                        color="primary"
                        startIcon={<FaEdit />}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleOpenEditModal(announcement);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                          color: "indigo.600",
                          "&:hover": {
                            backgroundColor: "indigo.100",
                          },
                        }}
                        aria-label={`Edit announcement ${announcement.announcementSubject}`}
                      >
                        Edit
                      </AnimatedButton>
                      <AnimatedButton
                        size="small"
                        color="secondary"
                        startIcon={<FaTrash />}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleDelete(announcement._id);
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                          color: "red.600",
                          "&:hover": {
                            backgroundColor: "red.100",
                          },
                        }}
                        aria-label={`Delete announcement ${announcement.announcementSubject}`}
                      >
                        Delete
                      </AnimatedButton>
                    </CardActions>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        )}
      </Box>

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
                      min: new Date().toISOString().split("T")[0], // Restrict past dates
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
                  {/* Display Existing Image */}
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
              backgroundColor: "indigo.600",
              color: "white",
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
                    className="w-full h-full object-cover"
                    loading="lazy" // Lazy loading for performance
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
                    color={
                      selectedAnnouncement.publish_for_all
                        ? "primary"
                        : "secondary"
                    }
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

export default ViewAnnouncements;
