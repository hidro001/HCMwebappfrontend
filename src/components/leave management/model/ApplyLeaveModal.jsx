// import React, { useEffect, useState } from "react";
// import BaseModal from "../../common/BaseModal";
// import { useForm } from "react-hook-form";
// import useLeaveStore from "../../../store/leaveStore.js";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import toast from "react-hot-toast";

// export default function ApplyLeaveModal({ show, onClose }) {
//   const { applyLeave, userProfile, leaveTypes } = useLeaveStore();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       leave_Type: "",
//       leave_From: "",
//       leave_To: "",
//       no_Of_Days: 0,
//       reason_For_Leave: "",
//       half_Day_Session: "",
//       leave_HalfDay: false,
//     },
//   });

//   const leave_From = watch("leave_From");
//   const leave_To = watch("leave_To");
//   const leave_HalfDay = watch("leave_HalfDay");

//   useEffect(() => {
//     if (leave_HalfDay && leave_To) {
//       setValue("leave_From", leave_To);
//     }
//   }, [leave_HalfDay, leave_To, setValue]);

//   useEffect(() => {
//     if (leave_From) {
//       const fromDate = new Date(leave_From);
//       const toDate = leave_To ? new Date(leave_To) : fromDate;
//       let diff =
//         Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24)) + 1;
//       if (diff < 1) diff = 1;
//       if (leave_HalfDay) {
//         // If half-day and single day, use 0.5; else subtract 0.5 from multi-day leaves
//         setValue("no_Of_Days", diff === 1 ? 0.5 : diff - 0.5);
//       } else {
//         setValue("no_Of_Days", diff);
//       }
//     } else {
//       setValue("no_Of_Days", 0);
//     }
//   }, [leave_From, leave_To, leave_HalfDay, setValue]);

//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [formData, setFormData] = useState(null);

//   const onSubmit = (data) => {
//     // Additional validations
//     if (data.leave_HalfDay && data.no_Of_Days > 0.5) {
//       toast.error("For half-day leaves, the number of days cannot exceed 0.5.");
//       return;
//     }
//     if (new Date(data.leave_From) > new Date(data.leave_To)) {
//       toast.error("From date cannot be after To date");
//       return;
//     }
//     if (data.leave_HalfDay && !data.half_Day_Session) {
//       toast.error("Please select a session for half-day leave.");
//       return;
//     }
//     setFormData(data);
//     setConfirmOpen(true);
//   };

//   const handleConfirm = async () => {
//     setConfirmOpen(false);
//     try {
//       await applyLeave(formData);
//       reset();
//       onClose();
//     } catch (error) {
//       // Error is already handled in the store
//     }
//   };

//   const handleCancel = () => {
//     setConfirmOpen(false);
//   };

//   return (
//     <>
//       <BaseModal isOpen={show} onClose={onClose}>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/2 relative">
//           <h3 className="text-xl font-bold mb-4">Apply for Leave</h3>
//           <div className="mb-4">
//             <strong>Paid Leave: </strong>{" "}
//             {userProfile ? userProfile.no_of_Paid_Leave : 0}
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Leave Type */}
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-1">
//                 Leave Type
//               </label>
//               <select
//                 {...register("leave_Type", { required: true })}
//                 className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//               >
//                 <option value="">Select Leave Type</option>
//                 {leaveTypes &&
//                   leaveTypes.map((type, index) => (
//                     <option key={index} value={type}>
//                       {type}
//                     </option>
//                   ))}
//               </select>
//               {errors.leave_Type && (
//                 <span className="text-red-500 text-sm">
//                   This field is required
//                 </span>
//               )}
//             </div>

//             {/* Half Day Toggle */}
//             <div className="mb-4 flex items-center gap-2">
//               <label className="text-sm font-semibold">Half Day</label>
//               <input type="checkbox" {...register("leave_HalfDay")} />
//             </div>

//             {/* If NOT half-day */}
//             {!leave_HalfDay && (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-semibold mb-1">
//                       From Date
//                     </label>
//                     <input
//                       type="date"
//                       {...register("leave_From", { required: true })}
//                       className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                       min={new Date().toISOString().split("T")[0]}
//                     />
//                     {errors.leave_From && (
//                       <span className="text-red-500 text-sm">Required</span>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold mb-1">
//                       To Date
//                     </label>
//                     <input
//                       type="date"
//                       {...register("leave_To", { required: true })}
//                       className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                       min={leave_From || new Date().toISOString().split("T")[0]}
//                     />
//                     {errors.leave_To && (
//                       <span className="text-red-500 text-sm">Required</span>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold mb-1">
//                       Number of Days
//                     </label>
//                     <input
//                       type="number"
//                       {...register("no_Of_Days")}
//                       className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                       disabled
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-sm font-semibold mb-1">
//                     Reason for Leave
//                   </label>
//                   <textarea
//                     {...register("reason_For_Leave", { required: true })}
//                     className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                     rows="4"
//                   ></textarea>
//                   {errors.reason_For_Leave && (
//                     <span className="text-red-500 text-sm">Required</span>
//                   )}
//                 </div>
//               </>
//             )}

//             {/* If half-day */}
//             {leave_HalfDay && (
//               <div className="grid grid-cols-1 gap-4 mb-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold mb-1">
//                       Half-Day Session
//                     </label>
//                     <select
//                       {...register("half_Day_Session", { required: leave_HalfDay })}
//                       className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                     >
//                       <option value="">Select Session</option>
//                       <option value="morning">Morning</option>
//                       <option value="afternoon">Afternoon</option>
//                     </select>
//                     {errors.half_Day_Session && (
//                       <span className="text-red-500 text-sm">Required</span>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold mb-1">
//                       To Date
//                     </label>
//                     <input
//                       type="date"
//                       {...register("leave_To", { required: leave_HalfDay })}
//                       className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                       min={new Date().toISOString().split("T")[0]}
//                     />
//                     {errors.leave_To && (
//                       <span className="text-red-500 text-sm">Required</span>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">
//                     Reason for Leave
//                   </label>
//                   <textarea
//                     {...register("reason_For_Leave", { required: true })}
//                     className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//                     rows="4"
//                   ></textarea>
//                   {errors.reason_For_Leave && (
//                     <span className="text-red-500 text-sm">Required</span>
//                   )}
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border rounded text-orange-500 hover:bg-orange-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
//               >
//                 Apply Leave
//               </button>
//             </div>
//           </form>
//         </div>
//       </BaseModal>
//       <ConfirmationDialog
//         open={confirmOpen}
//         title="Confirm Leave Application"
//         message={
//           <>
//             <p>
//               <strong>Leave Type:</strong> {formData?.leave_Type}
//             </p>
//             <p>
//               <strong>Half-Day:</strong>{" "}
//               {formData?.leave_HalfDay ? "Yes" : "No"}
//             </p>
//             {formData?.leave_HalfDay && (
//               <p>
//                 <strong>Session:</strong> {formData?.half_Day_Session}
//               </p>
//             )}
//             <p>
//               <strong>From:</strong> {formData?.leave_From}
//             </p>
//             <p>
//               <strong>To:</strong> {formData?.leave_To}
//             </p>
//             <p>
//               <strong>Number of Days:</strong> {formData?.no_Of_Days}
//             </p>
//             <p>
//               <strong>Reason:</strong> {formData?.reason_For_Leave}
//             </p>
//           </>
//         }
//         onConfirm={handleConfirm}
//         onCancel={handleCancel}
//         confirmText="Yes, Apply"
//         cancelText="Cancel"
//       />
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaFileUpload, 
  FaPaperPlane, 
  FaTimes, 
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaFileAlt,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import BaseModal from '../../common/BaseModal';

export default function ApplyLeaveModal({ show, onClose }) {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isLoadingLeaveTypes, setIsLoadingLeaveTypes] = useState(true);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    documents: null,
    emergencyContact: '',
    workHandover: ''
  });

  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [calculatedDays, setCalculatedDays] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStartDate, setSelectingStartDate] = useState(true);

  // Fetch leave types on component mount
  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    setIsLoadingLeaveTypes(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/leave-types');
      // const data = await response.json();
      
      // Mock data for demonstration - replace with actual API call
      const mockData = [
        {
          _id: '1',
          name: 'Annual Leave',
          description: 'Yearly vacation entitlement for rest and recreation',
          category: 'paid',
          maxDays: 21,
          isActive: true,
          documentsRequired: 'Not Required',
          advanceNotice: '7 days minimum',
          eligibility: 'All permanent employees after probation period',
          color: 'bg-green-500',
          policies: [
            'Must be taken within calendar year',
            'Cannot exceed 5 consecutive days without senior approval',
            'Minimum 2 days notice for single day leave'
          ]
        },
        {
          _id: '2',
          name: 'Sick Leave',
          description: 'Medical leave for health-related absences',
          category: 'paid',
          maxDays: 10,
          isActive: true,
          documentsRequired: 'Medical Certificate (for 3+ consecutive days)',
          advanceNotice: 'Immediate notification required',
          eligibility: 'All employees from day one',
          color: 'bg-red-500',
          policies: [
            'Medical certificate required for 3+ consecutive days',
            'Must notify supervisor within 2 hours of shift start',
            'Can be taken without advance notice in emergencies'
          ]
        },
        {
          _id: '3',
          name: 'Maternity Leave',
          description: 'Extended leave for new mothers',
          category: 'paid',
          maxDays: 90,
          isActive: true,
          documentsRequired: 'Medical Certificate and Pregnancy Confirmation',
          advanceNotice: '30 days before expected date',
          eligibility: 'Female employees with 6+ months tenure',
          color: 'bg-pink-500',
          policies: [
            'Medical certificate mandatory',
            '30 days advance notice required',
            'Can be extended with medical recommendation'
          ]
        },
        {
          _id: '4',
          name: 'Personal Leave',
          description: 'Unpaid leave for personal matters',
          category: 'unpaid',
          maxDays: 5,
          isActive: true,
          documentsRequired: 'Written justification letter',
          advanceNotice: '14 days minimum',
          eligibility: 'Employees with 1+ year tenure',
          color: 'bg-blue-500',
          policies: [
            '14 days advance notice required',
            'Subject to manager and HR approval',
            'Cannot be taken during peak business periods'
          ]
        },
        {
          _id: '5',
          name: 'Emergency Leave',
          description: 'Immediate leave for family emergencies',
          category: 'mixed',
          maxDays: 3,
          isActive: true,
          documentsRequired: 'Emergency documentation (hospital records, etc.)',
          advanceNotice: 'Immediate notification',
          eligibility: 'All employees',
          color: 'bg-orange-500',
          policies: [
            'Must provide documentation within 48 hours',
            'First day paid, subsequent days unpaid',
            'Can be converted to other leave types if available'
          ]
        }
      ];

      // Filter only active leave types
      const activeLeaveTypes = mockData.filter(lt => lt.isActive);
      setLeaveTypes(activeLeaveTypes);
    } catch (error) {
      console.error('Error fetching leave types:', error);
      setErrors({ api: 'Failed to load leave types. Please refresh the page.' });
    } finally {
      setIsLoadingLeaveTypes(false);
    }
  };

  // Calculate working days between two dates (excluding weekends)
  const calculateWorkingDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  };

  // Update calculated days when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const days = calculateWorkingDays(formData.startDate, formData.endDate);
      setCalculatedDays(days);
    } else {
      setCalculatedDays(0);
    }
  }, [formData.startDate, formData.endDate]);

  // Extract days from advance notice text
  const extractDaysFromAdvanceNotice = (advanceNotice) => {
    if (!advanceNotice) return 0;
    
    const lowerNotice = advanceNotice.toLowerCase();
    
    // Handle immediate cases
    if (lowerNotice.includes('immediate') || lowerNotice.includes('same day')) {
      return 0;
    }
    
    // Extract number followed by "day" or "days"
    const dayMatch = lowerNotice.match(/(\d+)\s*days?/);
    if (dayMatch) {
      return parseInt(dayMatch[1], 10);
    }
    
    // Extract number followed by "week" or "weeks"
    const weekMatch = lowerNotice.match(/(\d+)\s*weeks?/);
    if (weekMatch) {
      return parseInt(weekMatch[1], 10) * 7;
    }
    
    // Extract number followed by "month" or "months"
    const monthMatch = lowerNotice.match(/(\d+)\s*months?/);
    if (monthMatch) {
      return parseInt(monthMatch[1], 10) * 30;
    }
    
    return 0;
  };

  // Get minimum date based on advance notice
  const getMinDate = () => {
    const today = new Date();
    if (selectedLeaveType && selectedLeaveType.advanceNotice) {
      const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
      today.setDate(today.getDate() + advanceNoticeDays);
    }
    return today.toISOString().split('T')[0];
  };

  // Get advance notice information
  const getAdvanceNoticeInfo = () => {
    if (!selectedLeaveType) return null;
    
    const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + advanceNoticeDays);
    
    return {
      days: advanceNoticeDays,
      earliestDate: minDate.toLocaleDateString(),
      notice: selectedLeaveType.advanceNotice
    };
  };

  // Check if documents are required
  const documentsRequired = selectedLeaveType && selectedLeaveType.documentsRequired !== 'Not Required';

  // Handle leave type selection
  const handleLeaveTypeChange = (leaveTypeId) => {
    const leaveType = leaveTypes.find(lt => lt._id === leaveTypeId);
    setSelectedLeaveType(leaveType);
    setFormData(prev => ({
      ...prev,
      leaveType: leaveTypeId,
      startDate: '',
      endDate: '',
      documents: null
    }));
    setErrors({});
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field errors
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          documents: 'File size must be less than 5MB'
        }));
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          documents: 'Only PDF, JPG, and PNG files are allowed'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        documents: file
      }));
      
      if (errors.documents) {
        setErrors(prev => ({
          ...prev,
          documents: ''
        }));
      }
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      documents: null
    }));
    // Reset file input
    const fileInput = document.getElementById('documents');
    if (fileInput) fileInput.value = '';
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.leaveType) {
      newErrors.leaveType = 'Please select a leave type';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Please select start date';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Please select end date';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (end < start) {
        newErrors.endDate = 'End date cannot be before start date';
      }
      
      // Check advance notice requirement
      if (selectedLeaveType) {
        const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
        const minAllowedDate = new Date();
        minAllowedDate.setDate(minAllowedDate.getDate() + advanceNoticeDays);
        minAllowedDate.setHours(0, 0, 0, 0);
        
        if (start < minAllowedDate) {
          newErrors.startDate = `Start date must be at least ${advanceNoticeDays} days from today (${selectedLeaveType.advanceNotice})`;
        }
      }
      
      if (selectedLeaveType && calculatedDays > selectedLeaveType.maxDays) {
        newErrors.endDate = `Cannot exceed ${selectedLeaveType.maxDays} days for ${selectedLeaveType.name}`;
      }
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide a reason for leave';
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters';
    }

    if (selectedLeaveType && 
        selectedLeaveType.documentsRequired !== 'Not Required' && 
        !formData.documents) {
      newErrors.documents = 'Required document must be uploaded';
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('leaveType', formData.leaveType);
      submitData.append('startDate', formData.startDate);
      submitData.append('endDate', formData.endDate);
      submitData.append('reason', formData.reason);
      submitData.append('emergencyContact', formData.emergencyContact);
      submitData.append('workHandover', formData.workHandover);
      submitData.append('totalDays', calculatedDays);
      
      if (formData.documents) {
        submitData.append('documents', formData.documents);
      }

      // Replace with your actual API endpoint
      // const response = await fetch('/api/leave-applications', {
      //   method: 'POST',
      //   body: submitData
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: '',
          documents: null,
          emergencyContact: '',
          workHandover: ''
        });
        setSelectedLeaveType(null);
        setCalculatedDays(0);
        setShowSuccess(false);
        // Reset file input
        const fileInput = document.getElementById('documents');
        if (fileInput) fileInput.value = '';
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // // Get minimum date based on advance notice
  // const getMinDate = () => {
  //   const today = new Date();
  //   if (selectedLeaveType && selectedLeaveType.advanceNotice) {
  //     const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
  //     today.setDate(today.getDate() + advanceNoticeDays);
  //   }
  //   return today.toISOString().split('T')[0];
  // };

  // // Extract days from advance notice text
  // const extractDaysFromAdvanceNotice = (advanceNotice) => {
  //   if (!advanceNotice) return 0;
    
  //   const lowerNotice = advanceNotice.toLowerCase();
    
  //   // Handle immediate cases
  //   if (lowerNotice.includes('immediate') || lowerNotice.includes('same day')) {
  //     return 0;
  //   }
    
  //   // Extract number followed by "day" or "days"
  //   const dayMatch = lowerNotice.match(/(\d+)\s*days?/);
  //   if (dayMatch) {
  //     return parseInt(dayMatch[1], 10);
  //   }
    
  //   // Extract number followed by "week" or "weeks"
  //   const weekMatch = lowerNotice.match(/(\d+)\s*weeks?/);
  //   if (weekMatch) {
  //     return parseInt(weekMatch[1], 10) * 7;
  //   }
    
  //   // Extract number followed by "month" or "months"
  //   const monthMatch = lowerNotice.match(/(\d+)\s*months?/);
  //   if (monthMatch) {
  //     return parseInt(monthMatch[1], 10) * 30;
  //   }
    
  //   return 0;
  // };

  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'paid': return 'text-green-600 bg-green-100 border-green-200';
      case 'unpaid': return 'text-red-600 bg-red-100 border-red-200';
      case 'mixed': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Modern Calendar Component
  const ModernCalendar = () => {
    const today = new Date();
    const minSelectableDate = new Date(getMinDate());
    
    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    const isDateDisabled = (date) => {
      const dateObj = new Date(date);
      const dayOfWeek = dateObj.getDay();
      
      // Disable weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) return true;
      
      // Disable dates before minimum allowed date
      if (dateObj < minSelectableDate) return true;
      
      // If selecting end date, disable dates before start date
      if (!selectingStartDate && formData.startDate) {
        if (dateObj < new Date(formData.startDate)) return true;
      }
      
      return false;
    };

    const isDateSelected = (date) => {
      const dateStr = formatDate(date);
      return dateStr === formData.startDate || dateStr === formData.endDate;
    };

    const isDateInRange = (date) => {
      if (!formData.startDate || !formData.endDate) return false;
      const dateObj = new Date(date);
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      return dateObj > start && dateObj < end;
    };

    const handleDateClick = (date) => {
      const dateStr = formatDate(date);
      
      if (isDateDisabled(date)) return;

      if (selectingStartDate) {
        setFormData(prev => ({ ...prev, startDate: dateStr, endDate: '' }));
        setSelectingStartDate(false);
      } else {
        if (new Date(dateStr) < new Date(formData.startDate)) {
          // If clicked date is before start date, make it the new start date
          setFormData(prev => ({ ...prev, startDate: dateStr, endDate: '' }));
        } else {
          setFormData(prev => ({ ...prev, endDate: dateStr }));
          setShowCalendar(false);
        }
      }
    };

    const navigateMonth = (direction) => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(prev.getMonth() + direction);
        return newMonth;
      });
    };

    const renderCalendarDays = () => {
      const daysInMonth = getDaysInMonth(currentMonth);
      const firstDay = getFirstDayOfMonth(currentMonth);
      const days = [];

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10"></div>);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isDisabled = isDateDisabled(date);
        const isSelected = isDateSelected(date);
        const isInRange = isDateInRange(date);
        const isToday = formatDate(date) === formatDate(today);

        days.push(
          <button
            key={day}
            type="button"
            onClick={() => handleDateClick(date)}
            disabled={isDisabled}
            className={`
              h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 relative
              ${isDisabled 
                ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800' 
                : 'hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer'
              }
              ${isSelected 
                ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 dark:ring-blue-500' 
                : 'text-gray-700 dark:text-gray-300'
              }
              ${isInRange 
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                : ''
              }
              ${isToday && !isSelected 
                ? 'ring-2 ring-purple-400 dark:ring-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                : ''
              }
            `}
          >
            {day}
            {isToday && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
            )}
          </button>
        );
      }

      return days;
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 p-6 max-w-md mx-auto">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            type="button"
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Selection Indicator */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            {selectingStartDate ? 'Select start date' : 'Select end date'}
          </p>
          {formData.startDate && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Start: {new Date(formData.startDate).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {renderCalendarDays()}
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/20 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">In Range</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Disabled</span>
            </div>
          </div>
        </div>

        {/* Calendar Actions */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, startDate: '', endDate: '' }));
              setSelectingStartDate(true);
            }}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => setShowCalendar(false)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  return (
    <BaseModal isOpen={show} onClose={onClose}>
    <div className="h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Leave Application
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Submit your leave request with all required details
          </p>
        </div>

        {/* API Error */}
        {errors.api && (
          <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-center">
              <FaExclamationTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
              <p className="text-red-800 dark:text-red-300">{errors.api}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl backdrop-blur-sm animate-pulse">
            <div className="flex items-center">
              <FaCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <h3 className="text-green-800 dark:text-green-300 font-semibold text-lg">Application Submitted Successfully!</h3>
                <p className="text-green-600 dark:text-green-400">Your leave application has been sent for approval.</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoadingLeaveTypes ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12">
            <div className="flex items-center justify-center">
              <FaSpinner className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400 mr-4" />
              <span className="text-gray-600 dark:text-gray-300 text-lg">Loading leave types...</span>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            
            {/* Leave Type Selection */}
            <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                <FaUser className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                Select Leave Type
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaveTypes.map(leaveType => (
                  <div
                    key={leaveType._id}
                    onClick={() => handleLeaveTypeChange(leaveType._id)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.leaveType === leaveType._id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`w-4 h-4 rounded-full ${leaveType.color} mr-3`}></div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{leaveType.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{leaveType.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getCategoryColor(leaveType.category)}`}>
                        {leaveType.category}
                      </span>
                      <span className="text-lg font-bold text-gray-800 dark:text-gray-100">{leaveType.maxDays} days</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.leaveType && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-2 flex items-center">
                  <FaExclamationTriangle className="w-4 h-4 mr-2" />
                  {errors.leaveType}
                </p>
              )}
            </div>

            {/* Leave Details */}
            {selectedLeaveType && (
              <div className="p-8 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                  <FaInfoCircle className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                  Leave Type Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Requirements</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Advance Notice:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{selectedLeaveType.advanceNotice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Documents:</span>
                        <span className={`font-semibold ${documentsRequired ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                          {selectedLeaveType.documentsRequired}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Max Days:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{selectedLeaveType.maxDays}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Eligibility</h4>
                    <p className="text-gray-600 dark:text-gray-300">{selectedLeaveType.eligibility}</p>
                  </div>
                </div>

                {selectedLeaveType.policies && selectedLeaveType.policies.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                      <FaFileAlt className="w-4 h-4 mr-2" />
                      Policies & Guidelines
                    </h4>
                    <ul className="space-y-2">
                      {selectedLeaveType.policies.map((policy, index) => (
                        <li key={index} className="flex items-start text-blue-700 dark:text-blue-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-sm">{policy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Date Selection */}
            {selectedLeaveType && (
              <div className="p-8 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                  <FaCalendarAlt className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                  Select Dates
                </h2>

                {/* Advance Notice Warning */}
                {getAdvanceNoticeInfo() && getAdvanceNoticeInfo().days > 0 && (
                  <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center">
                      <FaExclamationTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3" />
                      <div>
                        <p className="text-orange-800 dark:text-orange-300 font-semibold">
                          Advance Notice Required: {getAdvanceNoticeInfo().notice}
                        </p>
                        <p className="text-orange-700 dark:text-orange-400 text-sm">
                          Earliest selectable date: {getAdvanceNoticeInfo().earliestDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Date Input Fields */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.startDate ? new Date(formData.startDate).toLocaleDateString() : ''}
                        placeholder="Select start date"
                        readOnly
                        onClick={() => {
                          setShowCalendar(true);
                          setSelectingStartDate(true);
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 cursor-pointer ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                    {errors.startDate && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                        <FaExclamationTriangle className="w-4 h-4 mr-1" />
                        {errors.startDate}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.endDate ? new Date(formData.endDate).toLocaleDateString() : ''}
                        placeholder="Select end date"
                        readOnly
                        onClick={() => {
                          if (formData.startDate) {
                            setShowCalendar(true);
                            setSelectingStartDate(false);
                          }
                        }}
                        disabled={!formData.startDate}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                          errors.endDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                    {errors.endDate && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                        <FaExclamationTriangle className="w-4 h-4 mr-1" />
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Calendar Modal */}
                {showCalendar && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCalendar(false)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 z-10"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                      <ModernCalendar />
                    </div>
                  </div>
                )}

                {calculatedDays > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700 dark:text-blue-300 font-semibold">Total Working Days:</span>
                      <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">{calculatedDays}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-blue-600 dark:text-blue-400 text-sm">Remaining Days:</span>
                      <span className={`font-bold text-sm ${calculatedDays <= selectedLeaveType.maxDays ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {selectedLeaveType.maxDays - calculatedDays}
                      </span>
                    </div>
                    {formData.startDate && formData.endDate && (
                      <div className="mt-3 text-sm text-blue-600 dark:text-blue-400">
                        <strong>Selected Period:</strong> {new Date(formData.startDate).toLocaleDateString()} - {new Date(formData.endDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Application Details */}
            {selectedLeaveType && (
              <div className="p-8 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                  <FaFileAlt className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
                  Application Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Reason for Leave *
                    </label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      rows={4}
                      placeholder="Please provide a detailed reason for your leave request..."
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 resize-none ${
                        errors.reason ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.reason && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                        <FaExclamationTriangle className="w-4 h-4 mr-1" />
                        {errors.reason}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Emergency Contact *
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Emergency contact person and phone number"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300 ${
                        errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.emergencyContact && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                        <FaExclamationTriangle className="w-4 h-4 mr-1" />
                        {errors.emergencyContact}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Work Handover Details
                    </label>
                    <textarea
                      value={formData.workHandover}
                      onChange={(e) => handleInputChange('workHandover', e.target.value)}
                      rows={3}
                      placeholder="Describe how your work will be handled during your absence..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Document Upload */}
            {selectedLeaveType && documentsRequired && (
              <div className="p-8 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                  <FaFileUpload className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" />
                  Required Documents *
                </h2>
                
                <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center">
                    <FaInfoCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3" />
                    <div>
                      <p className="text-orange-800 dark:text-orange-300 font-semibold">Required Document:</p>
                      <p className="text-orange-700 dark:text-orange-400 text-sm">{selectedLeaveType.documentsRequired}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {!formData.documents ? (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-300">
                      <FaFileUpload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Drag and drop your file here, or
                      </p>
                      <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-colors duration-300 inline-flex items-center">
                        <FaFileUpload className="w-4 h-4 mr-2" />
                        Choose File
                        <input
                          type="file"
                          id="documents"
                          onChange={handleFileUpload}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                        />
                      </label>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        Supported formats: PDF, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                          <div>
                            <p className="text-green-800 dark:text-green-300 font-semibold">
                              {formData.documents.name}
                            </p>
                            <p className="text-green-600 dark:text-green-400 text-sm">
                              {(formData.documents.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {errors.documents && (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center">
                      <FaExclamationTriangle className="w-4 h-4 mr-2" />
                      {errors.documents}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            {selectedLeaveType && (
              <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                {errors.submit && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center">
                      <FaExclamationTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                      <p className="text-red-800 dark:text-red-300">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        leaveType: '',
                        startDate: '',
                        endDate: '',
                        reason: '',
                        documents: null,
                        emergencyContact: '',
                        workHandover: ''
                      });
                      setSelectedLeaveType(null);
                      setCalculatedDays(0);
                      setErrors({});
                      const fileInput = document.getElementById('documents');
                      if (fileInput) fileInput.value = '';
                    }}
                    disabled={isSubmitting}
                    className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50"
                  >
                    Reset Form
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>

                {selectedLeaveType && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                      <FaClock className="w-4 h-4 mr-2" />
                      Application Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-600 dark:text-blue-400">Leave Type:</span>
                        <span className="ml-2 font-semibold text-blue-800 dark:text-blue-200">{selectedLeaveType.name}</span>
                      </div>
                      <div>
                        <span className="text-blue-600 dark:text-blue-400">Category:</span>
                        <span className="ml-2 font-semibold text-blue-800 dark:text-blue-200 capitalize">{selectedLeaveType.category}</span>
                      </div>
                      {formData.startDate && formData.endDate && (
                        <>
                          <div>
                            <span className="text-blue-600 dark:text-blue-400">Duration:</span>
                            <span className="ml-2 font-semibold text-blue-800 dark:text-blue-200">{calculatedDays} working days</span>
                          </div>
                          <div>
                            <span className="text-blue-600 dark:text-blue-400">Period:</span>
                            <span className="ml-2 font-semibold text-blue-800 dark:text-blue-200">
                              {new Date(formData.startDate).toLocaleDateString()} - {new Date(formData.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        )}

        {/* Help Section */}
        {/* {!isLoadingLeaveTypes && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-500 dark:via-purple-500 dark:to-blue-700 rounded-2xl p-8 text-white shadow-2xl border border-blue-300 dark:border-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaInfoCircle className="w-6 h-6 mr-3" />
                Need Help?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <p className="text-blue-100 dark:text-blue-200 text-sm leading-relaxed">
                    For assistance with your leave application, contact HR at hr@company.com or call +1 (555) 123-4567
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Processing Time</h4>
                  <p className="text-blue-100 dark:text-blue-200 text-sm leading-relaxed">
                    Leave applications are typically processed within 2-3 business days. You'll receive email notifications about status updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div></BaseModal>
  );
}