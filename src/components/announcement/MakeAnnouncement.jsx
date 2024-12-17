// // src/components/MakeAnnouncement.js
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   CircularProgress,
//   Card,
//   CardContent,
//   CardActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions as MuiDialogActions,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import useAnnouncementStore from '../../store/announcementStore';
// import useDepartmentStore from '../../store/departmentStore';
// import { toast } from 'react-toastify';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// // Styled Components using Material-UI and Tailwind
// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.primary,
// }));

// const MakeAnnouncement = () => {
//   const navigate = useNavigate();
//   const {
//     announcements,
//     loading: announcementsLoading,
//     error: announcementsError,
//     fetchAnnouncements,
//     addAnnouncement,
//     deleteAnnouncement,
//     updateAnnouncement,
//     currentPage,
//     announcementsPerPage,
//     setCurrentPage,
//   } = useAnnouncementStore();

//   const {
//     departments,
//     loading: departmentsLoading,
//     error: departmentsError,
//     fetchDepartments,
//   } = useDepartmentStore();

//   // Form State for Adding Announcement
//   const [formData, setFormData] = useState({
//     announcementDate: '',
//     announcementSubject: '',
//     announcementPostImg: null,
//     announcementDescription: '',
//     publishForAll: true,
//     selectedDepartments: [],
//   });

//   // State for Confirmation Dialog
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(null);
//   const [actionType, setActionType] = useState(null); // 'add', 'update', 'delete'

//   // State for Edit Announcement Modal
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

//   // Fetch departments and announcements on mount
//   useEffect(() => {
//     fetchDepartments();
//     fetchAnnouncements();
//   }, [fetchDepartments, fetchAnnouncements]);

//   // Handle input changes for Add Announcement Form
//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === 'file') {
//       setFormData({ ...formData, [name]: files[0] });
//     } else if (type === 'checkbox') {
//       if (name === 'publishForAll') {
//         setFormData({
//           ...formData,
//           publishForAll: checked,
//           selectedDepartments: checked ? [] : formData.selectedDepartments,
//         });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle department checkbox selection for Add Announcement
//   const handleDepartmentSelection = (deptId) => {
//     setFormData((prevData) => {
//       const isSelected = prevData.selectedDepartments.includes(deptId);
//       const updatedDepartments = isSelected
//         ? prevData.selectedDepartments.filter((id) => id !== deptId)
//         : [...prevData.selectedDepartments, deptId];

//       return {
//         ...prevData,
//         selectedDepartments: updatedDepartments,
//         publishForAll: false, // Uncheck "Publish for All" if specific departments are selected
//       };
//     });
//   };

//   // Handle form submission for Adding Announcement
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.announcementDate) {
//       toast.error('Announcement date is required');
//       return;
//     }
//     if (!formData.announcementSubject.trim()) {
//       toast.error('Announcement subject is required');
//       return;
//     }
//     if (!formData.announcementDescription.trim()) {
//       toast.error('Announcement description is required');
//       return;
//     }
//     if (!formData.publishForAll && formData.selectedDepartments.length === 0) {
//       toast.error('Please select at least one department');
//       return;
//     }

//     // Set the action to add announcement and open confirmation dialog
//     setConfirmAction(() => async () => {
//       // Prepare form data
//       const announcementDetails = new FormData();
//       announcementDetails.append('announcementDate', formData.announcementDate);
//       announcementDetails.append('announcementSubject', formData.announcementSubject);
//       if (formData.announcementPostImg) {
//         announcementDetails.append('announcementPostImg', formData.announcementPostImg);
//       }
//       announcementDetails.append('announcementDescription', formData.announcementDescription);
//       announcementDetails.append('publish_for_all', formData.publishForAll);
//       formData.selectedDepartments.forEach((deptId) => {
//         announcementDetails.append('department[]', deptId);
//       });

//       // Add announcement
//       await addAnnouncement(announcementDetails, localStorage.getItem('accessToken'));

//       // Reset form
//       setFormData({
//         announcementDate: '',
//         announcementSubject: '',
//         announcementPostImg: null,
//         announcementDescription: '',
//         publishForAll: true,
//         selectedDepartments: [],
//       });

//       setOpenConfirmDialog(false);
//     });
//     setActionType('add');
//     setOpenConfirmDialog(true);
//   };

//   // Handle Delete Announcement
//   const handleDelete = async (id) => {
//     setConfirmAction(() => async () => {
//       await deleteAnnouncement(id);
//       setOpenConfirmDialog(false);
//     });
//     setActionType('delete');
//     setOpenConfirmDialog(true);
//   };

//   // Handle Open Edit Modal
//   const handleOpenEditModal = (announcement) => {
//     setCurrentAnnouncement({
//       ...announcement,
//       publishForAll: announcement.publish_for_all,
//       selectedDepartments: announcement.publish_for_all
//         ? []
//         : announcement.department.map((dept) => dept._id),
//       announcementPostImgUrl: announcement.announcementPostImg, // Adjust based on actual data structure
//     });
//     setOpenEditModal(true);
//   };

//   // Handle Close Edit Modal
//   const handleCloseEditModal = () => {
//     setOpenEditModal(false);
//     setCurrentAnnouncement(null);
//   };

//   // Handle Update Form Submission
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!currentAnnouncement.announcementDate) {
//       toast.error('Announcement date is required');
//       return;
//     }
//     if (!currentAnnouncement.announcementSubject.trim()) {
//       toast.error('Announcement subject is required');
//       return;
//     }
//     if (!currentAnnouncement.announcementDescription.trim()) {
//       toast.error('Announcement description is required');
//       return;
//     }
//     if (!currentAnnouncement.publishForAll && currentAnnouncement.selectedDepartments.length === 0) {
//       toast.error('Please select at least one department');
//       return;
//     }

//     // Set the action to update announcement and open confirmation dialog
//     setConfirmAction(() => async () => {
//       // Prepare form data
//       const announcementDetails = new FormData();
//       announcementDetails.append('announcementDate', currentAnnouncement.announcementDate);
//       announcementDetails.append('announcementSubject', currentAnnouncement.announcementSubject);
//       if (currentAnnouncement.announcementPostImg) {
//         announcementDetails.append('announcementPostImg', currentAnnouncement.announcementPostImg);
//       }
//       announcementDetails.append('announcementDescription', currentAnnouncement.announcementDescription);
//       announcementDetails.append('publish_for_all', currentAnnouncement.publishForAll);
//       currentAnnouncement.selectedDepartments.forEach((deptId) => {
//         announcementDetails.append('department[]', deptId);
//       });

//       // Update announcement
//       await updateAnnouncement(currentAnnouncement._id, announcementDetails);

//       // Close modal
//       handleCloseEditModal();

//       setOpenConfirmDialog(false);
//     });
//     setActionType('update');
//     setOpenConfirmDialog(true);
//   };

//   // Pagination Logic
//   const indexOfLastAnnouncement = currentPage * announcementsPerPage;
//   const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
//   const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);
//   const totalPages = Math.ceil(announcements.length / announcementsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Handle department selection in edit modal
//   const handleEditModalDepartmentSelection = (deptId) => {
//     setCurrentAnnouncement((prev) => {
//       const isSelected = prev.selectedDepartments.includes(deptId);
//       const updatedDepartments = isSelected
//         ? prev.selectedDepartments.filter((id) => id !== deptId)
//         : [...prev.selectedDepartments, deptId];

//       return {
//         ...prev,
//         selectedDepartments: updatedDepartments,
//         publishForAll: false, // Uncheck "Publish for All" if specific departments are selected
//       };
//     });
//   };

//   // Handle input changes within the Edit Announcement Modal
//   const handleModalChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === 'file') {
//       setCurrentAnnouncement((prev) => ({ ...prev, [name]: files[0] }));
//     } else if (type === 'checkbox') {
//       if (name === 'publishForAll') {
//         setCurrentAnnouncement((prev) => ({
//           ...prev,
//           publishForAll: checked,
//           selectedDepartments: checked ? [] : prev.selectedDepartments,
//         }));
//       }
//     } else {
//       setCurrentAnnouncement((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   return (
//     <Box className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
//       <Typography variant="h4" className="text-center text-gray-800 dark:text-gray-200 mb-6">
//         Make An Announcement
//       </Typography>

//       {/* Announcement Form */}
//       <StyledCard
//         component={motion.div}
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <CardContent>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Announcement Date */}
//               <TextField
//                 label="Announcement Date"
//                 type="date"
//                 name="announcementDate"
//                 value={formData.announcementDate}
//                 onChange={handleChange}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 required
//                 fullWidth
//                 className="dark:text-gray-200"
//               />

//               {/* Announcement Subject */}
//               <TextField
//                 label="Subject or Title"
//                 type="text"
//                 name="announcementSubject"
//                 value={formData.announcementSubject}
//                 onChange={handleChange}
//                 required
//                 fullWidth
//                 className="dark:text-gray-200"
//               />

//               {/* Announcement Image */}
//               <Box>
//                 <Typography variant="body1" className="mb-1 text-gray-800 dark:text-gray-200">
//                   Post Image
//                 </Typography>
//                 <Button variant="contained" component="label" fullWidth>
//                   Upload Image
//                   <input
//                     type="file"
//                     name="announcementPostImg"
//                     hidden
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                 </Button>
//                 {formData.announcementPostImg && (
//                   <Typography variant="body2" className="mt-1 text-gray-600 dark:text-gray-400">
//                     {formData.announcementPostImg.name}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>

//             {/* Announcement Description */}
//             <Box className="mt-4">
//               <TextField
//                 label="Announcement Description"
//                 name="announcementDescription"
//                 value={formData.announcementDescription}
//                 onChange={handleChange}
//                 required
//                 multiline
//                 rows={4}
//                 fullWidth
//                 className="dark:text-gray-200"
//               />
//             </Box>

//             {/* Posting Options */}
//             <Box className="mt-4">
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={formData.publishForAll}
//                     onChange={handleChange}
//                     name="publishForAll"
//                     color="primary"
//                   />
//                 }
//                 label="Publish for all departments"
//               />
//             </Box>

//             {/* Specific Departments Selection */}
//             {!formData.publishForAll && (
//               <Box className="mt-2">
//                 <Typography variant="body1" className="mb-1 text-gray-800 dark:text-gray-200">
//                   Select Departments
//                 </Typography>
//                 <Box className="flex flex-wrap gap-2">
//                   {departments.map((dept) => (
//                     <FormControlLabel
//                       key={dept._id}
//                       control={
//                         <Checkbox
//                           checked={formData.selectedDepartments.includes(dept._id)}
//                           onChange={() => handleDepartmentSelection(dept._id)}
//                           name="selectedDepartments"
//                           color="primary"
//                         />
//                       }
//                       label={dept.department}
//                     />
//                   ))}
//                 </Box>
//               </Box>
//             )}

//             {/* Submit Button */}
//             <Box className="mt-6 flex justify-center">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 disabled={announcementsLoading}
//                 startIcon={announcementsLoading ? <CircularProgress size={20} /> : null}
//               >
//                 {announcementsLoading ? 'Publishing...' : 'Publish'}
//               </Button>
//             </Box>
//           </form>
//         </CardContent>
//       </StyledCard>

//       {/* Previous Announcements */}
//       <Box className="mt-10">
//         <Typography variant="h5" className="text-gray-800 dark:text-gray-200 mb-4">
//           Previous Announcements
//         </Typography>

//         {announcementsLoading ? (
//           <Box className="flex justify-center items-center">
//             <CircularProgress />
//           </Box>
//         ) : announcementsError ? (
//           <Typography color="error" className="text-center">
//             {announcementsError}
//           </Typography>
//         ) : announcements.length === 0 ? (
//           <Typography className="text-center text-gray-600 dark:text-gray-300">
//             No announcements found.
//           </Typography>
//         ) : (
//           <Box className="space-y-4">
//             {currentAnnouncements.map((announcement) => (
//               <StyledCard
//                 key={announcement._id}
//                 component={motion.div}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <CardContent>
//                   <Box className="flex flex-col md:flex-row">
//                     {/* Announcement Image */}
//                     {announcement.announcementPostImg && (
//                       <Box className="md:w-1/3">
//                         <img
//                           src={announcement.announcementPostImg}
//                           alt={announcement.announcementSubject}
//                           className="w-full h-auto rounded-md object-cover"
//                         />
//                       </Box>
//                     )}

//                     {/* Announcement Details */}
//                     <Box className={`mt-4 ${announcement.announcementPostImg ? 'md:mt-0 md:ml-6 md:w-2/3' : ''}`}>
//                       <Typography variant="h6" className="text-gray-800 dark:text-gray-200">
//                         {announcement.announcementSubject}
//                       </Typography>
//                       <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mt-2">
//                         {announcement.announcementDescription}
//                       </Typography>
//                       <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mt-1 block">
//                         {new Date(announcement.announcementDate).toLocaleDateString()}
//                       </Typography>
//                       <Typography variant="caption" className="text-gray-500 dark:text-gray-400 mt-1 block">
//                         <strong>Department:</strong>{' '}
//                         {announcement.publish_for_all
//                           ? 'All Departments'
//                           : announcement.department.map((dept) => dept.department).join(', ')}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//                 <CardActions className="justify-end">
//                   <Button
//                     size="small"
//                     color="primary"
//                     startIcon={<FaEdit />}
//                     onClick={() => handleOpenEditModal(announcement)}
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     size="small"
//                     color="secondary"
//                     startIcon={<FaTrash />}
//                     onClick={() => handleDelete(announcement._id)}
//                   >
//                     Delete
//                   </Button>
//                 </CardActions>
//               </StyledCard>
//             ))}

//             {/* Pagination */}
//             {announcements.length > announcementsPerPage && (
//               <Box className="flex justify-center mt-4">
//                 <Box className="flex space-x-2">
//                   {Array.from({ length: totalPages }, (_, index) => (
//                     <Button
//                       key={index + 1}
//                       variant={currentPage === index + 1 ? 'contained' : 'outlined'}
//                       color="primary"
//                       onClick={() => handlePageChange(index + 1)}
//                     >
//                       {index + 1}
//                     </Button>
//                   ))}
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         )}
//       </Box>

//       {/* Confirmation Dialog */}
//       <Dialog
//         open={openConfirmDialog}
//         onClose={() => setOpenConfirmDialog(false)}
//         aria-labelledby="confirm-dialog-title"
//         aria-describedby="confirm-dialog-description"
//       >
//         <DialogTitle id="confirm-dialog-title">
//           {actionType === 'add'
//             ? 'Publish Announcement'
//             : actionType === 'update'
//             ? 'Update Announcement'
//             : 'Delete Announcement'}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="confirm-dialog-description">
//             {actionType === 'add'
//               ? 'Do you want to publish this announcement?'
//               : actionType === 'update'
//               ? 'Do you want to update this announcement?'
//               : 'Do you want to delete this announcement?'}
//           </DialogContentText>
//         </DialogContent>
//         <MuiDialogActions>
//           <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={confirmAction}
//             color="primary"
//             autoFocus
//           >
//             {actionType === 'add'
//               ? 'Publish'
//               : actionType === 'update'
//               ? 'Update'
//               : 'Delete'}
//           </Button>
//         </MuiDialogActions>
//       </Dialog>

//       {/* Edit Announcement Modal */}
//       <Dialog
//         open={openEditModal}
//         onClose={handleCloseEditModal}
//         fullWidth
//         maxWidth="md"
//         aria-labelledby="edit-announcement-dialog-title"
//       >
//         <DialogTitle id="edit-announcement-dialog-title">Edit Announcement</DialogTitle>
//         <DialogContent>
//           {currentAnnouncement && (
//             <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
//               <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Announcement Date */}
//                 <TextField
//                   label="Announcement Date"
//                   type="date"
//                   name="announcementDate"
//                   value={currentAnnouncement.announcementDate}
//                   onChange={handleModalChange}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   required
//                   fullWidth
//                 />

//                 {/* Announcement Subject */}
//                 <TextField
//                   label="Subject or Title"
//                   type="text"
//                   name="announcementSubject"
//                   value={currentAnnouncement.announcementSubject}
//                   onChange={handleModalChange}
//                   required
//                   fullWidth
//                 />

//                 {/* Announcement Image */}
//                 <Box>
//                   <Typography variant="body1" className="mb-1 text-gray-800 dark:text-gray-200">
//                     Post Image
//                   </Typography>
//                   <Button variant="contained" component="label" fullWidth>
//                     Upload Image
//                     <input
//                       type="file"
//                       name="announcementPostImg"
//                       hidden
//                       accept="image/*"
//                       onChange={handleModalChange}
//                     />
//                   </Button>
//                   {currentAnnouncement.announcementPostImg && (
//                     <Typography variant="body2" className="mt-1 text-gray-600 dark:text-gray-400">
//                       {currentAnnouncement.announcementPostImg.name}
//                     </Typography>
//                   )}
//                   {/* Display Existing Image */}
//                   {currentAnnouncement.announcementPostImgUrl && (
//                     <Box className="mt-2">
//                       <img
//                         src={currentAnnouncement.announcementPostImgUrl}
//                         alt="Current Post Image"
//                         className="w-full h-auto rounded-md object-cover"
//                       />
//                     </Box>
//                   )}
//                 </Box>
//               </Box>

//               {/* Announcement Description */}
//               <Box className="mt-4">
//                 <TextField
//                   label="Announcement Description"
//                   name="announcementDescription"
//                   value={currentAnnouncement.announcementDescription}
//                   onChange={handleModalChange}
//                   required
//                   multiline
//                   rows={4}
//                   fullWidth
//                 />
//               </Box>

//               {/* Posting Options */}
//               <Box className="mt-4">
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={currentAnnouncement.publishForAll}
//                       onChange={handleModalChange}
//                       name="publishForAll"
//                       color="primary"
//                     />
//                   }
//                   label="Publish for all departments"
//                 />
//               </Box>

//               {/* Specific Departments Selection */}
//               {!currentAnnouncement.publishForAll && (
//                 <Box className="mt-2">
//                   <Typography variant="body1" className="mb-1 text-gray-800 dark:text-gray-200">
//                     Select Departments
//                   </Typography>
//                   <Box className="flex flex-wrap gap-2">
//                     {departments.map((dept) => (
//                       <FormControlLabel
//                         key={dept._id}
//                         control={
//                           <Checkbox
//                             checked={currentAnnouncement.selectedDepartments.includes(dept._id)}
//                             onChange={() => handleEditModalDepartmentSelection(dept._id)}
//                             name="selectedDepartments"
//                             color="primary"
//                           />
//                         }
//                         label={dept.department}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               )}

//               {/* Submit Button */}
//               <Box className="mt-6 flex justify-end">
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={announcementsLoading}
//                   startIcon={announcementsLoading ? <CircularProgress size={20} /> : null}
//                 >
//                   {announcementsLoading ? 'Updating...' : 'Update'}
//                 </Button>
//               </Box>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default MakeAnnouncement;

// src/components/MakeAnnouncement.js

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   CircularProgress,
//   Card,
//   CardContent,
//   CardActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions as MuiDialogActions,
//   Chip,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   IconButton,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import useAnnouncementStore from '../../store/announcementStore';
// import useDepartmentStore from '../../store/departmentStore';
// import { toast } from 'react-toastify';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// // Styled Components using Material-UI
// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.primary,
//   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//   borderRadius: '16px',
//   transition: 'transform 0.3s, box-shadow 0.3s',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
//   },
// }));

// const AnimatedButton = motion(Button);

// const MakeAnnouncement = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const {
//     announcements,
//     loading: announcementsLoading,
//     error: announcementsError,
//     fetchAnnouncements,
//     addAnnouncement,
//     deleteAnnouncement,
//     updateAnnouncement,
//     currentPage,
//     announcementsPerPage,
//     setCurrentPage,
//   } = useAnnouncementStore();

//   const {
//     departments,
//     loading: departmentsLoading,
//     error: departmentsError,
//     fetchDepartments,
//   } = useDepartmentStore();

//   // State for Add Announcement Dialog
//   const [openAddModal, setOpenAddModal] = useState(false);

//   // Form State for Adding Announcement
//   const [formData, setFormData] = useState({
//     announcementDate: '',
//     announcementSubject: '',
//     announcementPostImg: null,
//     announcementDescription: '',
//     publishForAll: true,
//     selectedDepartments: [],
//   });

//   // State for Edit Announcement Modal
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

//   // State for Confirmation Dialog
//   const [confirmDialog, setConfirmDialog] = useState({
//     open: false,
//     title: '',
//     content: '',
//     onConfirm: null,
//   });

//   // State for Theme Toggle is removed as it's handled globally

//   // Fetch departments and announcements on mount
//   useEffect(() => {
//     fetchDepartments();
//     fetchAnnouncements();
//   }, [fetchDepartments, fetchAnnouncements]);

//   // Handle input changes for Add Announcement Form
//   const handleChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === 'file') {
//       setFormData({ ...formData, [name]: files[0] });
//     } else if (type === 'checkbox') {
//       if (name === 'publishForAll') {
//         setFormData({
//           ...formData,
//           publishForAll: checked,
//           selectedDepartments: checked ? [] : formData.selectedDepartments,
//         });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle department checkbox selection for Add Announcement
//   const handleDepartmentSelection = (deptId) => {
//     setFormData((prevData) => {
//       const isSelected = prevData.selectedDepartments.includes(deptId);
//       const updatedDepartments = isSelected
//         ? prevData.selectedDepartments.filter((id) => id !== deptId)
//         : [...prevData.selectedDepartments, deptId];

//       return {
//         ...prevData,
//         selectedDepartments: updatedDepartments,
//         publishForAll: false, // Uncheck "Publish for All" if specific departments are selected
//       };
//     });
//   };

//   // Handle form submission for Adding Announcement
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.announcementDate) {
//       toast.error('Announcement date is required');
//       return;
//     }
//     if (!formData.announcementSubject.trim()) {
//       toast.error('Announcement subject is required');
//       return;
//     }
//     if (!formData.announcementDescription.trim()) {
//       toast.error('Announcement description is required');
//       return;
//     }
//     if (!formData.publishForAll && formData.selectedDepartments.length === 0) {
//       toast.error('Please select at least one department');
//       return;
//     }

//     // Show confirmation dialog
//     setConfirmDialog({
//       open: true,
//       title: 'Publish Announcement',
//       content: 'Do you want to publish this announcement?',
//       onConfirm: async () => {
//         try {
//           // Prepare form data
//           const announcementDetails = new FormData();
//           announcementDetails.append('announcementDate', formData.announcementDate);
//           announcementDetails.append('announcementSubject', formData.announcementSubject);
//           if (formData.announcementPostImg) {
//             announcementDetails.append('announcementPostImg', formData.announcementPostImg);
//           }
//           announcementDetails.append('announcementDescription', formData.announcementDescription);
//           announcementDetails.append('publish_for_all', formData.publishForAll);
//           formData.selectedDepartments.forEach((deptId) => {
//             announcementDetails.append('department[]', deptId);
//           });

//           // Add announcement
//           await addAnnouncement(announcementDetails, localStorage.getItem('accessToken'));

//           // Reset form
//           setFormData({
//             announcementDate: '',
//             announcementSubject: '',
//             announcementPostImg: null,
//             announcementDescription: '',
//             publishForAll: true,
//             selectedDepartments: [],
//           });

//           setOpenAddModal(false);
//           toast.success('Announcement published successfully!');
//         } catch (error) {
//           toast.error('Failed to publish announcement.');
//         } finally {
//           setConfirmDialog({ ...confirmDialog, open: false });
//         }
//       },
//     });
//   };

//   // Handle Delete Announcement
//   const handleDelete = (id) => {
//     setConfirmDialog({
//       open: true,
//       title: 'Delete Announcement',
//       content: 'Are you sure you want to delete this announcement?',
//       onConfirm: async () => {
//         try {
//           await deleteAnnouncement(id);
//           toast.success('Announcement deleted successfully!');
//         } catch (error) {
//           toast.error('Failed to delete announcement.');
//         } finally {
//           setConfirmDialog({ ...confirmDialog, open: false });
//         }
//       },
//     });
//   };

//   // Handle Open Edit Modal
//   const handleOpenEditModal = (announcement) => {
//     setCurrentAnnouncement({
//       ...announcement,
//       publishForAll: announcement.publish_for_all,
//       selectedDepartments: announcement.publish_for_all
//         ? []
//         : announcement.department.map((dept) => dept._id),
//       announcementPostImgUrl: announcement.announcementPostImg, // Adjust based on actual data structure
//     });
//     setOpenEditModal(true);
//   };

//   // Handle Close Edit Modal
//   const handleCloseEditModal = () => {
//     setOpenEditModal(false);
//     setCurrentAnnouncement(null);
//   };

//   // Handle Update Form Submission
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!currentAnnouncement.announcementDate) {
//       toast.error('Announcement date is required');
//       return;
//     }
//     if (!currentAnnouncement.announcementSubject.trim()) {
//       toast.error('Announcement subject is required');
//       return;
//     }
//     if (!currentAnnouncement.announcementDescription.trim()) {
//       toast.error('Announcement description is required');
//       return;
//     }
//     if (!currentAnnouncement.publishForAll && currentAnnouncement.selectedDepartments.length === 0) {
//       toast.error('Please select at least one department');
//       return;
//     }

//     // Show confirmation dialog
//     setConfirmDialog({
//       open: true,
//       title: 'Update Announcement',
//       content: 'Do you want to update this announcement?',
//       onConfirm: async () => {
//         try {
//           // Prepare form data
//           const announcementDetails = new FormData();
//           announcementDetails.append('announcementDate', currentAnnouncement.announcementDate);
//           announcementDetails.append('announcementSubject', currentAnnouncement.announcementSubject);
//           if (currentAnnouncement.announcementPostImg) {
//             announcementDetails.append('announcementPostImg', currentAnnouncement.announcementPostImg);
//           }
//           announcementDetails.append('announcementDescription', currentAnnouncement.announcementDescription);
//           announcementDetails.append('publish_for_all', currentAnnouncement.publishForAll);
//           currentAnnouncement.selectedDepartments.forEach((deptId) => {
//             announcementDetails.append('department[]', deptId);
//           });

//           // Update announcement
//           await updateAnnouncement(currentAnnouncement._id, announcementDetails);

//           // Close modal
//           handleCloseEditModal();
//           toast.success('Announcement updated successfully!');
//         } catch (error) {
//           toast.error('Failed to update announcement.');
//         } finally {
//           setConfirmDialog({ ...confirmDialog, open: false });
//         }
//       },
//     });
//   };

//   // Pagination Logic
//   const indexOfLastAnnouncement = currentPage * announcementsPerPage;
//   const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
//   const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);
//   const totalPages = Math.ceil(announcements.length / announcementsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Handle department selection in edit modal
//   const handleEditModalDepartmentSelection = (deptId) => {
//     setCurrentAnnouncement((prev) => {
//       const isSelected = prev.selectedDepartments.includes(deptId);
//       const updatedDepartments = isSelected
//         ? prev.selectedDepartments.filter((id) => id !== deptId)
//         : [...prev.selectedDepartments, deptId];

//       return {
//         ...prev,
//         selectedDepartments: updatedDepartments,
//         publishForAll: false, // Uncheck "Publish for All" if specific departments are selected
//       };
//     });
//   };

//   // Handle input changes within the Edit Announcement Modal
//   const handleModalChange = (e) => {
//     const { name, value, files, type, checked } = e.target;

//     if (type === 'file') {
//       setCurrentAnnouncement((prev) => ({ ...prev, [name]: files[0] }));
//     } else if (type === 'checkbox') {
//       if (name === 'publishForAll') {
//         setCurrentAnnouncement((prev) => ({
//           ...prev,
//           publishForAll: checked,
//           selectedDepartments: checked ? [] : prev.selectedDepartments,
//         }));
//       }
//     } else {
//       setCurrentAnnouncement((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   return (
//     <Box
//       className="min-h-screen p-6"
//       sx={{
//         backgroundColor: 'background.default',
//         color: 'text.primary',
//         transition: 'background-color 0.3s, color 0.3s',
//       }}
//     >
//       {/* Header with Add Announcement Button */}
//       <Box className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <Typography variant="h4" className="mb-4 md:mb-0">
//           Announcements
//         </Typography>
//         <AnimatedButton
//           variant="contained"
//           color="secondary"
//           startIcon={<FaPlus />}
//           onClick={() => setOpenAddModal(true)}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           sx={{
//             backgroundColor: 'white',
//             color: 'indigo.600',
//             '&:hover': {
//               backgroundColor: 'indigo.100',
//             },
//           }}
//         >
//           Add Announcement
//         </AnimatedButton>
//       </Box>

//       {/* Previous Announcements */}
//       <Box>
//         {announcementsLoading ? (
//           <Box className="flex justify-center items-center h-64">
//             <CircularProgress />
//           </Box>
//         ) : announcementsError ? (
//           <Typography color="error" className="text-center">
//             {announcementsError}
//           </Typography>
//         ) : announcements.length === 0 ? (
//           <Typography className="text-center">
//             No announcements found.
//           </Typography>
//         ) : (
//           <Grid container spacing={3}>
//             {currentAnnouncements.map((announcement) => (
//               <Grid item xs={12} sm={6} md={4} key={announcement._id}>
//                 <StyledCard>
//                   <CardContent>
//                     <Box className="flex flex-col items-center">
//                       {/* Announcement Image */}
//                       {announcement.announcementPostImg && (
//                         <Box className="w-full h-40 overflow-hidden rounded-md">
//                           <img
//                             src={announcement.announcementPostImg}
//                             alt={announcement.announcementSubject}
//                             className="w-full h-full object-cover"
//                           />
//                         </Box>
//                       )}

//                       {/* Announcement Details */}
//                       <Box className="mt-4 w-full">
//                         <Typography variant="h6" className="text-indigo-600">
//                           {announcement.announcementSubject}
//                         </Typography>
//                         <Typography variant="body2" className="text-gray-600 mt-2">
//                           {announcement.announcementDescription}
//                         </Typography>
//                         <Box className="mt-2 flex items-center justify-between">
//                           <Typography variant="caption" className="text-gray-500">
//                             {new Date(announcement.announcementDate).toLocaleDateString()}
//                           </Typography>
//                           <Chip
//                             label={announcement.publish_for_all ? 'All Departments' : `${announcement.department.length} Dept`}
//                             color={announcement.publish_for_all ? 'primary' : 'secondary'}
//                             size="small"
//                           />
//                         </Box>
//                         <Typography variant="caption" className="text-gray-500 mt-1 block">
//                           <strong>Department:</strong>{' '}
//                           {announcement.publish_for_all
//                             ? 'All Departments'
//                             : announcement.department.map((dept) => dept.department).join(', ')}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                   <CardActions className="justify-end">
//                     <AnimatedButton
//                       size="small"
//                       color="primary"
//                       startIcon={<FaEdit />}
//                       onClick={() => handleOpenEditModal(announcement)}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       sx={{
//                         color: 'indigo.600',
//                         '&:hover': {
//                           backgroundColor: 'indigo.100',
//                         },
//                       }}
//                     >
//                       Edit
//                     </AnimatedButton>
//                     <AnimatedButton
//                       size="small"
//                       color="secondary"
//                       startIcon={<FaTrash />}
//                       onClick={() => handleDelete(announcement._id)}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       sx={{
//                         color: 'red.600',
//                         '&:hover': {
//                           backgroundColor: 'red.100',
//                         },
//                       }}
//                     >
//                       Delete
//                     </AnimatedButton>
//                   </CardActions>
//                 </StyledCard>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {/* Pagination */}
//         {announcements.length > announcementsPerPage && (
//           <Box className="flex justify-center mt-8">
//             <Box className="flex space-x-2">
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <AnimatedButton
//                   key={index + 1}
//                   variant={currentPage === index + 1 ? 'contained' : 'outlined'}
//                   color="secondary"
//                   onClick={() => handlePageChange(index + 1)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   sx={{
//                     backgroundColor: currentPage === index + 1 ? 'indigo.600' : 'transparent',
//                     color: currentPage === index + 1 ? 'white' : 'indigo.600',
//                     borderColor: 'indigo.600',
//                     '&:hover': {
//                       backgroundColor: currentPage === index + 1 ? 'indigo.700' : 'indigo.100',
//                     },
//                   }}
//                 >
//                   {index + 1}
//                 </AnimatedButton>
//               ))}
//             </Box>
//           </Box>
//         )}
//       </Box>

//       {/* Add Announcement Dialog */}
//       <Dialog
//         open={openAddModal}
//         onClose={() => setOpenAddModal(false)}
//         fullWidth
//         maxWidth="md"
//         aria-labelledby="add-announcement-dialog-title"
//         PaperComponent={motion.div}
//         PaperProps={{
//           initial: { opacity: 0, scale: 0.8 },
//           animate: { opacity: 1, scale: 1 },
//           transition: { duration: 0.3 },
//           sx: {
//             backgroundColor: 'background.paper',
//             borderRadius: '16px',
//           },
//         }}
//         BackdropProps={{
//           style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
//         }}
//       >
//         <DialogTitle id="add-announcement-dialog-title">Add Announcement</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <Grid container spacing={2}>
//               {/* Announcement Date */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField
//                   label="Announcement Date"
//                   type="date"
//                   name="announcementDate"
//                   value={formData.announcementDate}
//                   onChange={handleChange}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   required
//                   fullWidth
//                 />
//               </Grid>

//               {/* Announcement Subject */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField
//                   label="Subject or Title"
//                   type="text"
//                   name="announcementSubject"
//                   value={formData.announcementSubject}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                 />
//               </Grid>

//               {/* Announcement Image */}
//               <Grid item xs={12} sm={12} md={4}>
//                 <Typography variant="body1" gutterBottom>
//                   Post Image
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   component="label"
//                   fullWidth
//                   sx={{
//                     backgroundColor: 'indigo.600',
//                     '&:hover': {
//                       backgroundColor: 'indigo.700',
//                     },
//                   }}
//                 >
//                   Upload Image
//                   <input
//                     type="file"
//                     name="announcementPostImg"
//                     hidden
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                 </Button>
//                 {formData.announcementPostImg && (
//                   <Typography variant="body2" mt={1}>
//                     {formData.announcementPostImg.name}
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>

//             {/* Announcement Description */}
//             <Box mt={4}>
//               <TextField
//                 label="Announcement Description"
//                 name="announcementDescription"
//                 value={formData.announcementDescription}
//                 onChange={handleChange}
//                 required
//                 multiline
//                 rows={4}
//                 fullWidth
//               />
//             </Box>

//             {/* Posting Options */}
//             <Box mt={2}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={formData.publishForAll}
//                     onChange={handleChange}
//                     name="publishForAll"
//                     color="primary"
//                   />
//                 }
//                 label="Publish for all departments"
//               />
//             </Box>

//             {/* Specific Departments Selection */}
//             {!formData.publishForAll && (
//               <Box mt={2}>
//                 <Typography variant="body1" gutterBottom>
//                   Select Departments
//                 </Typography>
//                 <Grid container spacing={1}>
//                   {departments.map((dept) => (
//                     <Grid item xs={6} sm={4} md={3} key={dept._id}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={formData.selectedDepartments.includes(dept._id)}
//                             onChange={() => handleDepartmentSelection(dept._id)}
//                             name="selectedDepartments"
//                             color="primary"
//                           />
//                         }
//                         label={dept.department}
//                       />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>
//             )}

//             {/* Submit Button */}
//             <Box mt={4} display="flex" justifyContent="flex-end">
//               <AnimatedButton
//                 type="submit"
//                 variant="contained"
//                 color="secondary"
//                 disabled={announcementsLoading}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 sx={{
//                   backgroundColor: 'indigo.600',
//                   color: 'white',
//                   '&:hover': {
//                     backgroundColor: 'indigo.700',
//                   },
//                 }}
//               >
//                 {announcementsLoading ? <CircularProgress size={24} color="inherit" /> : 'Publish'}
//               </AnimatedButton>
//             </Box>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Announcement Dialog */}
//       <Dialog
//         open={openEditModal}
//         onClose={handleCloseEditModal}
//         fullWidth
//         maxWidth="md"
//         aria-labelledby="edit-announcement-dialog-title"
//         PaperComponent={motion.div}
//         PaperProps={{
//           initial: { opacity: 0, scale: 0.8 },
//           animate: { opacity: 1, scale: 1 },
//           transition: { duration: 0.3 },
//           sx: {
//             backgroundColor: 'background.paper',
//             borderRadius: '16px',
//           },
//         }}
//         BackdropProps={{
//           style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
//         }}
//       >
//         <DialogTitle id="edit-announcement-dialog-title">Edit Announcement</DialogTitle>
//         <DialogContent>
//           {currentAnnouncement && (
//             <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
//               <Grid container spacing={2}>
//                 {/* Announcement Date */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField
//                     label="Announcement Date"
//                     type="date"
//                     name="announcementDate"
//                     value={currentAnnouncement.announcementDate}
//                     onChange={handleModalChange}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     required
//                     fullWidth
//                   />
//                 </Grid>

//                 {/* Announcement Subject */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField
//                     label="Subject or Title"
//                     type="text"
//                     name="announcementSubject"
//                     value={currentAnnouncement.announcementSubject}
//                     onChange={handleModalChange}
//                     required
//                     fullWidth
//                   />
//                 </Grid>

//                 {/* Announcement Image */}
//                 <Grid item xs={12} sm={12} md={4}>
//                   <Typography variant="body1" gutterBottom>
//                     Post Image
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     component="label"
//                     fullWidth
//                     sx={{
//                       backgroundColor: 'indigo.600',
//                       '&:hover': {
//                         backgroundColor: 'indigo.700',
//                       },
//                     }}
//                   >
//                     Upload Image
//                     <input
//                       type="file"
//                       name="announcementPostImg"
//                       hidden
//                       accept="image/*"
//                       onChange={handleModalChange}
//                     />
//                   </Button>
//                   {currentAnnouncement.announcementPostImg && (
//                     <Typography variant="body2" mt={1}>
//                       {currentAnnouncement.announcementPostImg.name}
//                     </Typography>
//                   )}
//                   {/* Display Existing Image */}
//                   {currentAnnouncement.announcementPostImgUrl && (
//                     <Box mt={2}>
//                       <img
//                         src={currentAnnouncement.announcementPostImgUrl}
//                         alt="Current Post Image"
//                         className="w-full h-24 rounded-md object-cover"
//                       />
//                     </Box>
//                   )}
//                 </Grid>
//               </Grid>

//               {/* Announcement Description */}
//               <Box mt={4}>
//                 <TextField
//                   label="Announcement Description"
//                   name="announcementDescription"
//                   value={currentAnnouncement.announcementDescription}
//                   onChange={handleModalChange}
//                   required
//                   multiline
//                   rows={4}
//                   fullWidth
//                 />
//               </Box>

//               {/* Posting Options */}
//               <Box mt={2}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={currentAnnouncement.publishForAll}
//                       onChange={handleModalChange}
//                       name="publishForAll"
//                       color="primary"
//                     />
//                   }
//                   label="Publish for all departments"
//                 />
//               </Box>

//               {/* Specific Departments Selection */}
//               {!currentAnnouncement.publishForAll && (
//                 <Box mt={2}>
//                   <Typography variant="body1" gutterBottom>
//                     Select Departments
//                   </Typography>
//                   <Grid container spacing={1}>
//                     {departments.map((dept) => (
//                       <Grid item xs={6} sm={4} md={3} key={dept._id}>
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={currentAnnouncement.selectedDepartments.includes(dept._id)}
//                               onChange={() => handleEditModalDepartmentSelection(dept._id)}
//                               name="selectedDepartments"
//                               color="primary"
//                             />
//                           }
//                           label={dept.department}
//                         />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 </Box>
//               )}

//               {/* Submit Button */}
//               <Box mt={4} display="flex" justifyContent="flex-end">
//                 <AnimatedButton
//                   type="submit"
//                   variant="contained"
//                   color="secondary"
//                   disabled={announcementsLoading}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   sx={{
//                     backgroundColor: 'indigo.600',
//                     color: 'white',
//                     '&:hover': {
//                       backgroundColor: 'indigo.700',
//                     },
//                   }}
//                 >
//                   {announcementsLoading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
//                 </AnimatedButton>
//               </Box>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Confirmation Dialog */}
//       <Dialog
//         open={confirmDialog.open}
//         onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
//         aria-labelledby="confirm-dialog-title"
//         aria-describedby="confirm-dialog-description"
//         PaperComponent={motion.div}
//         PaperProps={{
//           initial: { opacity: 0, scale: 0.8 },
//           animate: { opacity: 1, scale: 1 },
//           transition: { duration: 0.3 },
//           sx: {
//             backgroundColor: 'background.paper',
//             borderRadius: '16px',
//           },
//         }}
//         BackdropProps={{
//           style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
//         }}
//       >
//         <DialogTitle id="confirm-dialog-title">{confirmDialog.title}</DialogTitle>
//         <DialogContent>
//           <Typography id="confirm-dialog-description">
//             {confirmDialog.content}
//           </Typography>
//         </DialogContent>
//         <MuiDialogActions>
//           <Button
//             onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
//             sx={{
//               backgroundColor: 'grey.300',
//               color: 'grey.800',
//               '&:hover': {
//                 backgroundColor: 'grey.400',
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={confirmDialog.onConfirm}
//             sx={{
//               backgroundColor: 'indigo.600',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: 'indigo.700',
//               },
//             }}
//           >
//             Confirm
//           </Button>
//         </MuiDialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MakeAnnouncement;

// src/components/MakeAnnouncement.js

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAnnouncementStore from "../../store/announcementStore";
import useDepartmentStore from "../../store/departmentStore";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

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

const MakeAnnouncement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [pageSize, setPageSize] = useState(8); // Default page size

  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
    fetchAnnouncements,
    addAnnouncement,
    deleteAnnouncement,
    updateAnnouncement,
    currentPage,
    announcementsPerPage,
    setCurrentPage,
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
        publishForAll: false, // Uncheck "Publish for All" if specific departments are selected
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
          // Prepare form data
          const announcementDetails = new FormData();
          announcementDetails.append(
            "announcementDate",
            formData.announcementDate
          );
          announcementDetails.append(
            "announcementSubject",
            formData.announcementSubject
          );
          if (formData.announcementPostImg) {
            announcementDetails.append(
              "announcementPostImg",
              formData.announcementPostImg
            );
          }
          announcementDetails.append(
            "announcementDescription",
            formData.announcementDescription
          );
          announcementDetails.append("publish_for_all", formData.publishForAll);
          formData.selectedDepartments.forEach((deptId) => {
            announcementDetails.append("department[]", deptId);
          });

          // Add announcement
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
      announcementPostImgUrl: announcement.announcementPostImg, // Adjust based on actual data structure
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

  // Pagination Logic
//   const indexOfLastAnnouncement = currentPage * announcementsPerPage;
//   const indexOfFirstAnnouncement =
//     indexOfLastAnnouncement - announcementsPerPage;
//   const currentAnnouncements = announcements.slice(
//     indexOfFirstAnnouncement,
//     indexOfLastAnnouncement
//   );
const indexOfLastAnnouncement = currentPage * pageSize;
const indexOfFirstAnnouncement = indexOfLastAnnouncement - pageSize;
const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const totalPages = Math.ceil(announcements.length / announcementsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        publishForAll: false, // Uncheck "Publish for All" if specific departments are selected
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

  return (
    <Box
      className="min-h-screen p-6 "
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {/* Header with Add Announcement Button */}
      <Box className="flex flex-col md:flex-row justify-between items-center mb-6">
        <Typography variant="h4" className="mb-4 md:mb-0">
          Announcements
        </Typography>
        <AnimatedButton
          variant="contained"
          color="secondary"
          startIcon={<FaPlus />}
          onClick={() => setOpenAddModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            backgroundColor: "white",
            color: "indigo.600",
            "&:hover": {
              backgroundColor: "indigo.100",
            },
          }}
        >
          Add Announcement
        </AnimatedButton>
      </Box>
      <Box className="flex justify-end mb-4">
  <TextField
    select
    label="Page Size"
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    SelectProps={{
      native: true,
    }}
    variant="outlined"
    size="small"
  >
    {[8, 12, 16, 20].map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ))}
  </TextField>
</Box>

      {/* Previous Announcements */}
      <Box>
        {announcementsLoading ? (
          <Box className="flex justify-center items-center h-64  border border-red-600">
            <CircularProgress />
          </Box>
        ) : announcementsError ? (
          <Typography color="error" className="text-center">
            {announcementsError}
          </Typography>
        ) : announcements.length === 0 ? (
          <Typography className="text-center">
            No announcements found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {currentAnnouncements.map((announcement) => (
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
                  onClick={(e) => {
                    // Prevent card click when clicking on action buttons
                    if (e.target.closest("button")) return;
                    handleCardClick(announcement);
                  }}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <Box className="flex flex-col items-center">
                      {/* Announcement Image */}
                      {announcement.announcementPostImg && (
                        <Box className="w-full h-40 overflow-hidden rounded-md">
                          <img
                            src={announcement.announcementPostImg}
                            alt={announcement.announcementSubject}
                            className="w-full h-full object-cover"
                          />
                        </Box>
                      )}

                      {/* Announcement Details */}
                      <Box className="mt-4 w-full">
                        <Typography variant="h6" className="text-indigo-600">
                          {announcement.announcementSubject}
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
                          {announcement.announcementDescription}
                        </Typography>
                        <Box className="mt-2 flex items-center justify-between">
                          <Typography
                            variant="caption"
                            className="text-gray-500"
                          >
                            {new Date(
                              announcement.announcementDate
                            ).toLocaleDateString()}
                          </Typography>
                          <Chip
                            label={
                              announcement.publish_for_all
                                ? "All Departments"
                                : `${announcement.department.length} Dept`
                            }
                            color={
                              announcement.publish_for_all
                                ? "primary"
                                : "secondary"
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
                      onClick={() => handleOpenEditModal(announcement)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      sx={{
                        color: "indigo.600",
                        "&:hover": {
                          backgroundColor: "indigo.100",
                        },
                      }}
                    >
                      Edit
                    </AnimatedButton>
                    <AnimatedButton
                      size="small"
                      color="secondary"
                      startIcon={<FaTrash />}
                      onClick={() => handleDelete(announcement._id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      sx={{
                        color: "red.600",
                        "&:hover": {
                          backgroundColor: "red.100",
                        },
                      }}
                    >
                      Delete
                    </AnimatedButton>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {announcements.length > announcementsPerPage && (
          <Box className="flex justify-center mt-8">
            <Box className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <AnimatedButton
                  key={index + 1}
                  variant={currentPage === index + 1 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => handlePageChange(index + 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    backgroundColor:
                      currentPage === index + 1 ? "indigo.600" : "transparent",
                    color: currentPage === index + 1 ? "white" : "indigo.600",
                    borderColor: "indigo.600",
                    "&:hover": {
                      backgroundColor:
                        currentPage === index + 1 ? "indigo.700" : "indigo.100",
                    },
                  }}
                >
                  {index + 1}
                </AnimatedButton>
              ))}
            </Box>
          </Box>
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
                            checked={formData.selectedDepartments.includes(
                              dept._id
                            )}
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
                        alt="Current Post Image"
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
          {selectedAnnouncement && (
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
              >
                <FaTimes />
              </IconButton>

              {/* Announcement Image */}
              {selectedAnnouncement.announcementPostImg && (
                <Box className="w-full h-64 overflow-hidden rounded-md">
                  <img
                    src={selectedAnnouncement.announcementPostImg}
                    alt={selectedAnnouncement.announcementSubject}
                    className="w-full h-full object-cover"
                  />
                </Box>
              )}

              {/* Announcement Details */}
              <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                  {selectedAnnouncement.announcementSubject}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedAnnouncement.announcementDescription}
                </Typography>
                <Box
                  mt={2}
                  display="flex"
                  flexDirection={isSmallScreen ? "column" : "row"}
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    Date:{" "}
                    {new Date(
                      selectedAnnouncement.announcementDate
                    ).toLocaleDateString()}
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
          )}
        </DialogContent>
        <MuiDialogActions>
          <Button
            onClick={() => setOpenDetailDialog(false)}
            sx={{
              backgroundColor: "indigo.600",
              color: "white",
              "&:hover": {
                backgroundColor: "indigo.700",
              },
            }}
          >
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
    </Box>
  );
};

export default MakeAnnouncement;
