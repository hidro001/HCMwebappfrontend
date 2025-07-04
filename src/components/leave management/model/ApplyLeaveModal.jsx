import React, { useState, useEffect } from 'react';
import {  FaCalendarAlt,  FaUser,  FaFileUpload,  FaPaperPlane,  FaTimes,  FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaClock, FaFileAlt, FaSpinner, FaChevronLeft, FaChevronRight, FaMoon, FaSun} from 'react-icons/fa';
import useAuthStore from "../../../store/store";
import BaseModal from '../../common/BaseModal';
import leaveTypeStore from "../../../store/leaveTypeStore";
import useLeaveStore from '../../../store/leaveStore.js';
import { toast } from "react-hot-toast";

const ApplyLeaveModal = ({ show, onClose, totalPaidLeaves, leaveDate =''  }) => {

  const { assignedLeaveTypes, isLoading, error, fetchAssignedLeaveTypeById,  } = leaveTypeStore();
  const { availability, applyLeave, fetchAvailability} = useLeaveStore()

  const authStore = useAuthStore();
  const userEmplId = authStore.employeeId

  const [formData, setFormData] = useState({
    leaveType: '',
    leave_From: '',
    leave_To: '',
    no_Of_Days: '',
    Unpaid_Days: '',
    isHalfDay: false,
    halfDayPeriod: '', 
    halfDayPosition: 'end', 
    reason_For_Leave: '',
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
  const [manualDaysEntry, setManualDaysEntry] = useState(false);

  useEffect(() => {
    fetchAssignedLeaveTypeById(userEmplId)
  }, [ fetchAssignedLeaveTypeById]);

  const getDocumentRequirement = () => {
    if (!selectedLeaveType) return { required: false, reason: '' };

    const requestedDays = parseFloat(formData.no_Of_Days) || calculatedDays;

    if (selectedLeaveType.name === 'Sick Leave' && selectedLeaveType.noDocumentLimit) {
      if (requestedDays > selectedLeaveType.noDocumentLimit) {
        return {
          required: true,
          reason: `Medical certificate required for more than ${selectedLeaveType.noDocumentLimit} days`,
        };
      }
      return {
        required: false,
        reason: `No documents required for up to ${selectedLeaveType.noDocumentLimit} days`,
      };
    }

    return {
      required: selectedLeaveType.documentsRequired !== 'Not Required',
      reason: selectedLeaveType.documentsRequired,
    };
  };

  const documentRequirement = getDocumentRequirement();

  const calculateWorkingDays = (leave_From, leave_To) => {
    if (!leave_From || !leave_To) return 0;
    
    const start = new Date(leave_From);
    const end = new Date(leave_To);
    let count = 0;
    
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { 
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  };

  const formatDateForDisplay = (yyyyMMdd) => {
    if (!yyyyMMdd) return '';
    const [year, month, day] = yyyyMMdd.split('-');
    return new Date(year, month - 1, day).toLocaleDateString();
  };


  useEffect(() => {
    if (formData.leave_From && !manualDaysEntry) {
      let days;
      if (formData.leave_To) {
        days = calculateWorkingDays(formData.leave_From, formData.leave_To);
        
        if (formData.isHalfDay) {
          days = days - 0.5;
        }
      } else if (formData.isHalfDay && formData.leave_From) {

        days = 0.5;
      } else if (formData.leave_From) {

        days = 1;
      }
      
      if (days !== undefined) {
        setCalculatedDays(days);
        setFormData(prev => ({ ...prev, no_Of_Days: days.toString() }));
      }
    }
  }, [formData.leave_From, formData.leave_To, formData.isHalfDay, manualDaysEntry]);

  const extractDaysFromAdvanceNotice = (advanceNotice) => {
    if (!advanceNotice) return 0;
    
    const lowerNotice = advanceNotice?.toLowerCase();
    
    if (lowerNotice.includes('immediate') || lowerNotice.includes('same day')) {
      return 0;
    }
    const dayMatch = lowerNotice.match(/(\d+)\s*days?/);
    if (dayMatch) {
      return parseInt(dayMatch[1], 10);
    }
    const weekMatch = lowerNotice.match(/(\d+)\s*weeks?/);
    if (weekMatch) {
      return parseInt(weekMatch[1], 10) * 7;
    }
    const monthMatch = lowerNotice.match(/(\d+)\s*months?/);
    if (monthMatch) {
      return parseInt(monthMatch[1], 10) * 30;
    }  
    return 0;
  };

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedLeaveType && selectedLeaveType.advanceNotice) {
      const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
      today.setDate(today.getDate() + advanceNoticeDays);
    }

    return today; 
  };


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

  useEffect(() => {
    if(leaveDate.length >0){
    setFormData(prev => ({ ...prev, leave_From: leaveDate, leave_To: leaveDate }));
    }
  }, [leaveDate])

  const handleLeaveTypeChange = (leaveTypeId) => {
    const leaveType = assignedLeaveTypes.find(lt => lt._id === leaveTypeId);
    setSelectedLeaveType(leaveType);
    setFormData(prev => ({
      ...prev,
      leaveType: leaveTypeId,
      leave_From: '',
      leave_To: '',
      no_Of_Days: '',
      isHalfDay: false,
      halfDayPeriod: '',
      halfDayPosition: 'end',
      documents: null
    }));
    console.log(formData.leave_From, 'leave_From')
    fetchAvailability(leaveTypeId);
    setCalculatedDays(0);
    setManualDaysEntry(false);
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    

    if (field === 'no_Of_Days') {
      setManualDaysEntry(true);
      const numDays = parseFloat(value);

      if (!isNaN(numDays) && formData.leave_From) {
        setCalculatedDays(numDays);

        const from = new Date(formData.leave_From);
        let added = 0;
        let current = new Date(from);
        while (added < numDays && current.getDate() <= 31) {
          if (current.getDay() !== 0 && current.getDay() !== 6) added++;
          if (added < numDays) current.setDate(current.getDate() + 1);
        }
        const toStr = `${current.getFullYear()}-${(current.getMonth() + 1)
          .toString().padStart(2, '0')}-${current.getDate().toString().padStart(2, '0')}`;

        setFormData(prev => ({ ...prev, leave_To: toStr }));
      }
    }
    
    if (field === 'isHalfDay') {
      if (!value) {
        setFormData(prev => ({ 
          ...prev, 
          halfDayPeriod: '', 
          halfDayPosition: 'end'
        }));
      }
      setManualDaysEntry(false);
    }
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          documents: 'File size must be less than 5MB'
        }));
        return;
      }
      
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

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      documents: null
    }));
    const fileInput = document.getElementById('documents');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    const days = parseFloat(formData.no_Of_Days);

    if (!formData.leaveType) {
      newErrors.leaveType = 'Please select a leave type';
    }

    if (!formData.no_Of_Days || isNaN(days) || days <= 0) {
      newErrors.no_Of_Days = 'Please enter a valid number of days';
    } else {
      if (selectedLeaveType?.category === 'paid' && days > selectedLeaveType.maxDays) {
        newErrors.no_Of_Days = `You can't take more than ${selectedLeaveType.maxDays} days of paid leave.`;
      }
      if (availability?.totalAvailable !== undefined && days > availability.totalAvailable) {
        newErrors.no_Of_Days = `You only have ${availability.totalAvailable} days available this month.`;
      }
    }

    if (!formData.leave_From) {
        newErrors.leave_From = 'Please select start date';
      }

      if (!formData.isHalfDay || (formData.isHalfDay && parseFloat(formData.no_Of_Days) > 0.5)) {
        if (!formData.leave_To && !manualDaysEntry) {
          newErrors.leave_To = 'Please select end date or enter days manually';
        }
      }

      if (formData.isHalfDay) {
        if (!formData.halfDayPeriod) {
          newErrors.halfDayPeriod = 'Please select first half or second half';
        }
        if (!formData.halfDayPosition) {
          newErrors.halfDayPosition = 'Please specify which day is the half day';
        }
      }

      if (formData.leave_From && formData.leave_To) {
        const start = new Date(formData.leave_From);
        const end = new Date(formData.leave_To);
        
        if (end < start) {
          newErrors.leave_To = 'End date cannot be before start date';
        }
        
        if (selectedLeaveType) {
          const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
          const minAllowedDate = new Date();
          minAllowedDate.setDate(minAllowedDate.getDate() + advanceNoticeDays);
          minAllowedDate.setHours(0, 0, 0, 0);
          
          if (start < minAllowedDate) {
            newErrors.leave_From = `Start date must be at least ${advanceNoticeDays} days from today (${selectedLeaveType.advanceNotice})`;
          }
        }
      }

      if (!formData.reason_For_Leave.trim()) {
        newErrors.reason_For_Leave = 'Please provide a reason for leave';
      } else if (formData.reason_For_Leave.trim().length < 10) {
        newErrors.reason_For_Leave = 'Reason must be at least 10 characters';
      }

      if (!formData.emergencyContact.trim()) {
        newErrors.emergencyContact = 'Emergency contact is required';
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formData, 'formData')
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      submitData.append('leaveType', formData.leaveType);
      submitData.append('leave_From', new Date(formData.leave_From).toISOString());
      submitData.append('leave_To', new Date(formData.leave_To || formData.leave_From).toISOString());
      submitData.append('no_Of_Days', formData.no_Of_Days);
      submitData.append('isHalfDay', formData.isHalfDay);
      if (formData.isHalfDay) {
        submitData.append('halfDayPeriod', formData.halfDayPeriod);
        submitData.append('halfDayPosition', formData.halfDayPosition);
      }
      submitData.append('reason_For_Leave', formData.reason_For_Leave);
      submitData.append('emergencyContact', formData.emergencyContact);
      submitData.append('workHandover', formData.workHandover);
      
      if (formData.documents) {
        submitData.append('documents', formData.documents);
      }
      console.log(submitData, 'submitData');

      const result = await applyLeave(submitData); 
      if(result){
        setShowSuccess(true);
        handleCancel();
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      leaveType: '',
      leave_From: '',
      leave_To: '',
      no_Of_Days: '',
      isHalfDay: false,
      halfDayPeriod: '',
      halfDayPosition: 'end',
      reason_For_Leave: '',
      documents: null,
      emergencyContact: '',
      workHandover: ''
    });
    setSelectedLeaveType(null);
    setCalculatedDays(0);
    setManualDaysEntry(false);
    setErrors({});
    const fileInput = document.getElementById('documents');
    if (fileInput) fileInput.value = '';
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'paid': return 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/40 dark:border-green-500/50';
      case 'unpaid': return 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/40 dark:border-red-500/50';
      case 'mixed': return 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:border-blue-500/50';
      default: return 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-700/50 dark:border-gray-500/50';
    }
  };

  const ModernCalendar = () => {
    const today = new Date();
    const minSelectableDate = getMinDate();
    
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
      
      if (dayOfWeek === 0 || dayOfWeek === 6) return true;
      if (dateObj < minSelectableDate) return true;
      
     
      if (!selectingStartDate && formData.leave_From) {
        const start = new Date(formData.leave_From);
        start.setHours(0, 0, 0, 0);
        dateObj.setHours(0, 0, 0, 0);
        if (dateObj < start) return true; 
      }
      
      return false;
    };

    const isDateSelected = (date) => {
      const dateStr = formatDate(date);
      return dateStr === formData.leave_From || dateStr === formData.leave_To;
    };

    const isDateInRange = (date) => {
      if (!formData.leave_From || !formData.leave_To) return false;
      const dateObj = new Date(date);
      const start = new Date(formData.leave_From);
      const end = new Date(formData.leave_To);
      return dateObj > start && dateObj < end;
    };

    const handleDateClick = (date) => {
      const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

      if (isDateDisabled(date)) return;

      if (selectingStartDate) {
        setFormData(prev => ({ ...prev, leave_From: dateStr, leave_To: '' }));
        setSelectingStartDate(false);
      } else {
        const days = calculateWorkingDays(formData.leave_From, dateStr);

        if (
          selectedLeaveType?.category === 'paid' &&
          availability?.totalAvailable !== undefined &&
          days > availability.totalAvailable
        ) {
          toast.error(`Only ${availability.totalAvailable} day(s) available for this leave type.`);
          return;
        }

        if (selectedLeaveType?.maxDays && days > selectedLeaveType.maxDays) {
          toast.error(`You can select up to ${selectedLeaveType.maxDays} working days.`);
          return;
        }

        setFormData(prev => ({ ...prev, leave_To: dateStr }));
        setShowCalendar(false);
      }
    };


    const safeDisplayDate = (dateStr) => {
      return new Date(dateStr + 'T00:00:00Z').toLocaleDateString();
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

      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10"></div>);
      }

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
      <div className="rounded-xl shadow-xl border p-6 max-w-md mx-auto transition-all duration-300 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            type="button"
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-lg border transition-all duration-300 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
            {selectingStartDate ? 'Select start date' : 'Select end date'}
          </p>
          {formData.leave_From && (
            <p className="text-xs mt-1 text-blue-600 dark:text-blue-400">
              Start: {formatDateForDisplay(formData.leave_From)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {renderCalendarDays()}
        </div>

        <div className="border-t pt-4 border-gray-200 dark:border-gray-600">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
              <span className="text-gray-600 dark:text-gray-400">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded mr-2 bg-blue-100 dark:bg-blue-900/20"></div>
              <span className="text-gray-600 dark:text-gray-400">In Range</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded mr-2 bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-gray-600 dark:text-gray-400">Disabled</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, leave_From: '', leave_To: '' }));
              setSelectingStartDate(true);
            }}
            className="flex-1 px-4 py-2 border rounded-lg transition-colors duration-200 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
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

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!show) return null;

  return (
     <BaseModal isOpen={show} onClose={handleCancel}>
      <div className="">
        <div className="h-[90vh] overflow-y-auto rounded-2xl shadow-2xl max-w-4xl w-full transition-all duration-300 bg-gradient-to-br from-blue-50 via-white to-purple-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-700">
          <div className="py-8 px-4 dark:bg-gray-700">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div></div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                    Leave Application
                  </h1>
                  <button
                    onClick={handleCancel}
                    className="p-2 rounded-full transition-all duration-200 hover:bg-gray-200 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Submit your leave request with all required details
                </p>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="mb-8 p-6 rounded-xl border backdrop-blur-sm animate-pulse transition-all duration-300 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                  <div className="flex items-center">
                    <FaCheckCircle className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                    <div>
                      <h3 className="font-semibold text-lg text-green-800 dark:text-green-300">
                        Application Submitted Successfully!
                      </h3>
                      <p className="text-green-600 dark:text-green-400">
                        Your leave application has been sent for approval.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 bg-white border-gray-200 shadow-gray-300/30 dark:bg-gray-800 dark:border-gray-600 dark:shadow-gray-900/50">
                
                {/* Leave Type Selection */}
                <div className="p-8 border-b transition-all duration-300 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 dark:border-gray-600">
                  <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-100">
                      <FaUser className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                      Select Leave Type
                    </h2>
                    <div className='flex items-center'> 
                      <p className="font-bold pr-3 text-gray-800 dark:text-gray-200">Total Paid Leaves</p>
                      <span className="font-bold pr-3 text-xl text-gray-900 dark:text-gray-100">{totalPaidLeaves}</span>
                      

                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {assignedLeaveTypes.map(leaveType => (
                      <div
                        key={leaveType._id}
                        onClick={() => handleLeaveTypeChange(leaveType._id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          formData.leaveType === leaveType._id
                            ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20 dark:border-blue-400 dark:bg-blue-900/40 dark:shadow-lg dark:shadow-blue-900/30 dark:ring-1 dark:ring-blue-400/50' 
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-600 dark:bg-gray-700/50 dark:hover:border-gray-500 dark:hover:bg-gray-700/80'
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-4 h-4 rounded-full ${leaveType.color} mr-3`}></div>
                          <h3 className="font-bold text-gray-800 dark:text-gray-100">
                            {leaveType.name}
                          </h3>
                        </div>
                        <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">
                          {leaveType.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getCategoryColor(leaveType.category)}`}>
                            {leaveType.category}
                          </span>
                          <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            {leaveType.maxDays} days max
                          </span>
                        </div>
                        {/* Show sick leave policy */}
                        {leaveType.name === 'Sick Leave' && leaveType.noDocumentLimit && (
                          <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                            No documents required for ≤{leaveType.noDocumentLimit} days
                          </div>
                        )}
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
                  <div className="p-8 border-b transition-all duration-300 border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-100">
                      <FaInfoCircle className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                      Leave Type Information
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="rounded-xl p-6 transition-all duration-300 bg-gray-50 dark:bg-gray-700/60 dark:border dark:border-gray-600/50">
                        <h4 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Requirements</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Advance Notice:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-100">
                              {selectedLeaveType.advanceNotice}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Documents:</span>
                            <span className={`font-semibold ${
                              documentRequirement.required 
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-green-600 dark:text-green-400'
                            }`}>
                              {documentRequirement.reason || selectedLeaveType.documentsRequired}
                            </span>
                          </div>
                         <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-300">Max Days (Policy):</span>
                              <span className="font-semibold text-gray-800 dark:text-gray-100">
                                {selectedLeaveType.maxDays}
                              </span>
                            </div>
                            {availability?.totalAvailable !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Available this month:</span>
                                <span className="font-semibold text-blue-800 dark:text-blue-300">
                                  {availability.totalAvailable}
                                </span>
                              </div>
                            )}
                          </div>
                          {availability && (
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              Quota: {availability.monthlyQuota}, Used: {availability.used}, Carry Forward: {availability.carryForward}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="rounded-xl p-6 transition-all duration-300 bg-gray-50 dark:bg-gray-700/60 dark:border dark:border-gray-600/50">
                        <h4 className="font-bold mb-4 text-gray-800 dark:text-gray-100">Eligibility</h4>
                        <p className="text-gray-600 dark:text-gray-300">{selectedLeaveType.eligibility}</p>
                      </div>
                    </div>

                    {selectedLeaveType.policies && selectedLeaveType.policies.length > 0 && (
                      <div className="rounded-xl p-6 border transition-all duration-300 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50 dark:shadow-lg dark:shadow-blue-900/20">
                        <h4 className="font-bold mb-4 flex items-center text-blue-800 dark:text-blue-300">
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

                {/* Days and Date Selection */}
                {selectedLeaveType && (
                  <div className="p-8 border-b transition-all duration-300 border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-100">
                      <FaCalendarAlt className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                      Leave Duration & Dates
                    </h2>

                    {/* Half Day Toggle */}
                    { leaveDate.length === 0 &&
                    <>
                    <div className="mb-6">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isHalfDay}
                          onChange={(e) => handleInputChange('isHalfDay', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-400"
                        />
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          This is a half-day leave
                        </span>
                      </label>
                    </div>

                    {formData.isHalfDay &&  (
                      <div className="mb-6 space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Select Half Day Period *
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => handleInputChange('halfDayPeriod', 'morning')}
                              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                                formData.halfDayPeriod === 'morning'
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center justify-center mb-1">
                                <FaSun className={`w-5 h-5 mr-2 ${formData.halfDayPeriod === 'morning' ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'}`} />
                                <div className="font-semibold text-gray-800 dark:text-gray-200">First Half</div>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Morning (9 AM - 1 PM)</div>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInputChange('halfDayPeriod', 'afternoon')}
                              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                                formData.halfDayPeriod === 'afternoon'
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center justify-center mb-1">
                                <FaMoon className={`w-5 h-5 mr-2 ${formData.halfDayPeriod === 'afternoon' ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'}`} />
                                <div className="font-semibold text-gray-800 dark:text-gray-200">Second Half</div>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Afternoon (1 PM - 6 PM)</div>
                            </button>
                          </div>
                          {errors.halfDayPeriod && (
                            <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                              <FaExclamationTriangle className="w-4 h-4 mr-1" />
                              {errors.halfDayPeriod}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Half Day Position *
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => handleInputChange('halfDayPosition', 'start')}
                              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                                formData.halfDayPosition === 'start'
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="font-semibold text-gray-800 dark:text-gray-200">First Day</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Half day on start date</div>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInputChange('halfDayPosition', 'end')}
                              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                                formData.halfDayPosition === 'end'
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                  : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="font-semibold text-gray-800 dark:text-gray-200">Last Day</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Half day on end date</div>
                            </button>
                          </div>
                          {errors.halfDayPosition && (
                            <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                              <FaExclamationTriangle className="w-4 h-4 mr-1" />
                              {errors.halfDayPosition}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    </>
                  }
                  {
                    leaveDate.length > 0 && 
                    <div className='flex text-lg'>
                      <p>Leave Date for Request : </p>
                     <span className='pl-2 text-red-400 font-bold'> {leaveDate} </span>
                    </div>
                  }
                    {/* Number of Days Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        Number of Days *
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="365"
                        value={formData.no_Of_Days}
                        onChange={(e) => handleInputChange('no_Of_Days', e.target.value)}
                        placeholder="Enter number of days (e.g., 2.5 for 2.5 days)"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:bg-gray-700 dark:focus:border-blue-400 ${
                          errors.no_Of_Days ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                      />
                      {errors.no_Of_Days && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                          <FaExclamationTriangle className="w-4 h-4 mr-1" />
                          {errors.no_Of_Days}
                        </p>
                      )}
                      <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                        {formData.isHalfDay 
                          ? 'When half-day is enabled, 0.5 will be deducted from your total (e.g., 5 days becomes 4.5 days)'
                          : 'You can enter decimal values like 0.5, 1.5, 2.5, etc. for half days'
                        }
                      </p>
                    </div>

                    {/* Advance Notice Warning */}
                    {getAdvanceNoticeInfo() && getAdvanceNoticeInfo().days > 0 && (
                      <div className="mb-6 p-4 rounded-xl border transition-all duration-300 bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:border-orange-500/50 dark:shadow-lg dark:shadow-orange-900/20">
                        <div className="flex items-center">
                          <FaExclamationTriangle className="w-5 h-5 mr-3 text-orange-600 dark:text-orange-400" />
                          <div>
                            <p className="font-semibold text-orange-800 dark:text-orange-300">
                              Advance Notice Required: {getAdvanceNoticeInfo().notice}
                            </p>
                            <p className="text-sm text-orange-700 dark:text-orange-400">
                              Earliest selectable date: {getAdvanceNoticeInfo().earliestDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Date Input Fields */}
                    {leaveDate.length === 0 &&
                    <>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                          Start Date *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.leave_From ? formatDateForDisplay(formData.leave_From) : ''}
                            placeholder="Select start date"
                            readOnly
                            onClick={() => {
                              setShowCalendar(true);
                              setSelectingStartDate(true);
                            }}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                              errors.leave_From ? 'border-red-500' : ''
                            }`}
                          />
                          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
                        </div>
                        {errors.leave_From && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                            <FaExclamationTriangle className="w-4 h-4 mr-1" />
                            {errors.leave_From}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                          End Date {!manualDaysEntry && '*'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.leave_To ? new Date(formData.leave_To).toLocaleDateString() : ''}
                            placeholder="Select end date (or same as start for single day)"
                            readOnly
                            onClick={() => {
                              if (formData.leave_From) {
                                setShowCalendar(true);
                                setSelectingStartDate(false);
                              }
                            }}
                            disabled={!formData.leave_From || manualDaysEntry}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                              errors.leave_To ? 'border-red-500' : ''
                            }`}
                          />
                          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
                        </div>
                        {errors.leave_To && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                            <FaExclamationTriangle className="w-4 h-4 mr-1" />
                            {errors.leave_To}
                          </p>
                        )}
                        {manualDaysEntry && (
                          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                            End date will be calculated automatically based on days entered
                          </p>
                        )}
                      </div>
                    </div>

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
                    </>
                  }
                  

                    {/* Days Summary */}
                    {parseFloat(formData.no_Of_Days) > 0 && (
                      <div className="p-4 rounded-xl border transition-all duration-300 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50 dark:shadow-lg dark:shadow-blue-900/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-blue-700 dark:text-blue-300">
                            Total Days Requested:
                          </span>
                          <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                            {formData.no_Of_Days}
                          </span>
                        </div>
                        {formData.isHalfDay && formData.halfDayPeriod && formData.halfDayPosition && (
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            <strong>Half Day:</strong> {formData.halfDayPeriod === 'morning' ? 'First Half (Morning)' : 'Second Half (Afternoon)'} 
                            {' '}on {formData.halfDayPosition === 'start' ? 'first day' : 'last day'}
                          </div>
                        )}
                        {formData.leave_From && (
                          <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                            <strong>Date(s):</strong> { formatDateForDisplay(formData.leave_From)}
                            {formData.leave_To && formData.leave_To !== formData.leave_From && 
                              ` - ${new Date(formData.leave_To).toLocaleDateString()}`
                            }
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Application Details */}
                {selectedLeaveType && (
                  <div className="p-8 border-b transition-all duration-300 border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-100">
                      <FaFileAlt className="w-6 h-6 mr-3 text-orange-600 dark:text-orange-400" />
                      Application Details
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                          Reason for Leave *
                        </label>
                        <textarea
                          value={formData.reason_For_Leave}
                          onChange={(e) => handleInputChange('reason_For_Leave', e.target.value)}
                          rows={4}
                          placeholder="Please provide a detailed reason for your leave request..."
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                            errors.reason_For_Leave ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.reason_For_Leave && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1 flex items-center">
                            <FaExclamationTriangle className="w-4 h-4 mr-1" />
                            {errors.reason_For_Leave}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                          Emergency Contact *
                        </label>
                        <input
                          type="text"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          placeholder="Emergency contact person and phone number"
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
                            errors.emergencyContact ? 'border-red-500' : ''
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
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                          Work Handover Details
                        </label>
                        <textarea
                          value={formData.workHandover}
                          onChange={(e) => handleInputChange('workHandover', e.target.value)}
                          rows={3}
                          placeholder="Describe how your work will be handled during your absence..."
                          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Upload */}
                {selectedLeaveType && documentRequirement.required && (
                  <div className='p-8 border-b transition-colors dark:border-gray-600 border-gray-200'>
                    <h2 className='text-2xl font-bold mb-6 flex items-center dark:text-gray-100 text-gray-800'>
                      <FaFileUpload className='w-6 h-6 mr-3 dark:text-red-400 text-red-600' />
                      Required Documents *
                    </h2>
                    
                    <div className='mb-4 p-4 rounded-xl border transition-colors dark:bg-orange-900/20 dark:border-orange-800 bg-orange-50 border-orange-200'>
                      <div className="flex items-center">
                        <FaInfoCircle className='w-5 h-5 mr-3 dark:text-orange-400 text-orange-600' />
                        <div>
                          <p className='font-semibold dark:text-orange-300 text-orange-800'>
                            Required Document:
                          </p>
                          <p className='text-sm dark:text-orange-400 text-orange-700'>
                            {documentRequirement.reason}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {!formData.documents ? (
                        <div className='border-2 border-dashed rounded-xl p-8 text-center transition-colors hover:border-blue-400 dark:hover:border-blue-500 dark:border-gray-600 border-gray-300'>
                          <FaFileUpload className={`w-12 h-12 mx-auto mb-4 dark:text-gray-500' : 'text-gray-400'}`} />
                          <p className={`mb-4 dark:text-gray-300' : 'text-gray-600'}`}>
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
                          <p className={`text-sm mt-2 dark:text-gray-400' : 'text-gray-500'}`}>
                            Supported formats: PDF, JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      ) : (
                        <div className='border rounded-xl p-4 transition-colors dark:bg-green-900/20 border-green-800 bg-green-50 border-green-200'>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FaCheckCircle className={`w-5 h-5 mr-3 dark:text-green-400' : 'text-green-600'}`} />
                              <div>
                                <p className={`font-semibold dark:text-green-300' : 'text-green-800'}`}>
                                  {formData.documents.name}
                                </p>
                                <p className={`text-sm dark:text-green-400' : 'text-green-600'}`}>
                                  {(formData.documents.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={removeFile}
                              className='p-2 rounded-full transition-colors 
                                  dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30
                                  text-red-600 hover:text-red-700 hover:bg-red-100'
                              
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
                  <div className="p-8 transition-all duration-300 bg-gradient-to-r from-gray-50 to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-800 dark:to-gray-700">
                    {errors.submit && (
                      <div className="mb-6 p-4 rounded-xl border transition-all duration-300 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
                        <div className="flex items-center">
                          <FaExclamationTriangle className="w-5 h-5 mr-3 text-red-600 dark:text-red-400" />
                          <p className="text-red-800 dark:text-red-300">{errors.submit}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                      <button
                        type="button"
                        onClick={resetForm}
                        disabled={isSubmitting}
                        className="px-8 py-3 border rounded-xl transition-colors duration-300 disabled:opacity-50 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Reset Form
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="px-8 py-3 border rounded-xl transition-colors duration-300 disabled:opacity-50 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none min-w-[200px] shadow-blue-500/30 hover:shadow-blue-500/50 dark:shadow-blue-900/40 dark:hover:shadow-blue-900/60"
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
                      <div className="mt-6 p-4 rounded-xl border transition-all duration-300 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50 dark:shadow-lg dark:shadow-blue-900/20">
                        <h4 className="font-semibold mb-2 flex items-center text-blue-800 dark:text-blue-300">
                          <FaClock className="w-4 h-4 mr-2" />
                          Application Summary
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-blue-600 dark:text-blue-400">Leave Type:</span>
                            <span className="ml-2 font-semibold text-blue-800 dark:text-blue-200">
                              {selectedLeaveType.name}
                            </span>
                          </div>
                          <div>
                            <span className="text-blue-600 dark:text-blue-400">Category:</span>
                            <span className="ml-2 font-semibold capitalize text-blue-800 dark:text-blue-200">
                              {selectedLeaveType.category}
                            </span>
                          </div>
                          {formData.no_Of_Days && (
                            <>
                              <div>
                                <span className="text-blue-600 dark:text-blue-400">Duration:</span>
                                <span className="ml-2 font-semibold text-blue-800 dark:text-blue-200">
                                  {formData.no_Of_Days} {parseFloat(formData.no_Of_Days) === 1 ? 'day' : 'days'}
                                  {formData.isHalfDay && ` (includes half day)`}
                                </span>
                              </div>
                              <div>
                                <span className="text-blue-600 dark:text-blue-400">Documents:</span>
                                <span className={`ml-2 font-semibold ${
                                  documentRequirement.required 
                                    ? 'text-orange-600 dark:text-orange-400'
                                    : 'text-green-600 dark:text-green-400'
                                }`}>
                                  {documentRequirement.required ? 'Required' : 'Not Required'}
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
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ApplyLeaveModal;



// import React, { useState, useEffect, useMemo } from 'react';
// import {  FaCalendarAlt,  FaUser,  FaFileUpload,  FaPaperPlane,  FaTimes,  FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaClock, FaFileAlt, FaSpinner, FaChevronLeft, FaChevronRight, FaMoon, FaSun} from 'react-icons/fa';
// import useAuthStore from "../../../store/store";
// import BaseModal from '../../common/BaseModal';
// import leaveTypeStore from "../../../store/leaveTypeStore";
// import useLeaveStore from '../../../store/leaveStore.js';
// import { toast } from "react-hot-toast";

// const ApplyLeaveModal = ({ show, onClose, totalPaidLeaves }) => {

//   const { assignedLeaveTypes, isLoading, error, fetchAssignedLeaveTypeById,  } = leaveTypeStore();
//   const { availability, applyLeave, fetchAvailability} = useLeaveStore()

//   const authStore = useAuthStore();
//   const userEmplId = authStore.employeeId

//   const [formData, setFormData] = useState({
//     leaveType: '',
//     leave_From: '',
//     leave_To: '',
//     no_Of_Days: '',
//     Unpaid_Days: '',
//     isHalfDay: false,
//     halfDayPeriod: '', 
//     halfDayPosition: 'end', 
//     reason_For_Leave: '',
//     documents: null,
//     emergencyContact: '',
//     workHandover: ''
//   });

//   const [selectedLeaveType, setSelectedLeaveType] = useState(null);
//   const [calculatedDays, setCalculatedDays] = useState(0);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectingStartDate, setSelectingStartDate] = useState(true);
//   const [manualDaysEntry, setManualDaysEntry] = useState(false);

//   useEffect(() => {
//     fetchAssignedLeaveTypeById(userEmplId)
//   }, [ fetchAssignedLeaveTypeById]);

//   const getDocumentRequirement = () => {
//     if (!selectedLeaveType) return { required: false, reason: '' };

//     const requestedDays = parseFloat(formData.no_Of_Days) || calculatedDays;

//     if (selectedLeaveType.name === 'Sick Leave' && selectedLeaveType.noDocumentLimit) {
//       if (requestedDays > selectedLeaveType.noDocumentLimit) {
//         return {
//           required: true,
//           reason: `Medical certificate required for more than ${selectedLeaveType.noDocumentLimit} days`,
//         };
//       }
//       return {
//         required: false,
//         reason: `No documents required for up to ${selectedLeaveType.noDocumentLimit} days`,
//       };
//     }

//     // Handle different API response formats
//     const docRequired = selectedLeaveType.documentsRequired;
//     const isRequired = docRequired && 
//                       docRequired !== 'Not Required' && 
//                       docRequired !== 'No' && 
//                       docRequired !== false && 
//                       docRequired.toLowerCase() !== 'not required' &&
//                       docRequired.toLowerCase() !== 'no';

//     return {
//       required: isRequired,
//       reason: docRequired || 'Not Required',
//     };
//   };

//   const documentRequirement = useMemo(() => getDocumentRequirement(), [selectedLeaveType, formData.no_Of_Days, calculatedDays]);

//   const calculateWorkingDays = (leave_From, leave_To) => {
//     if (!leave_From || !leave_To) return 0;
    
//     const start = new Date(leave_From);
//     const end = new Date(leave_To);
//     let count = 0;
    
//     const current = new Date(start);
//     while (current <= end) {
//       const dayOfWeek = current.getDay();
//       if (dayOfWeek !== 0 && dayOfWeek !== 6) { 
//         count++;
//       }
//       current.setDate(current.getDate() + 1);
//     }
    
//     return count;
//   };

//   const formatDateForDisplay = (yyyyMMdd) => {
//     if (!yyyyMMdd) return '';
//     const [year, month, day] = yyyyMMdd.split('-');
//     return new Date(year, month - 1, day).toLocaleDateString();
//   };

//   useEffect(() => {
//     if (formData.leave_From && !manualDaysEntry) {
//       let days;
//       if (formData.leave_To) {
//         days = calculateWorkingDays(formData.leave_From, formData.leave_To);
        
//         if (formData.isHalfDay) {
//           days = days - 0.5;
//         }
//       } else if (formData.isHalfDay && formData.leave_From) {
//         days = 0.5;
//       } else if (formData.leave_From) {
//         days = 1;
//       }
      
//       if (days !== undefined) {
//         setCalculatedDays(days);
//         setFormData(prev => ({ ...prev, no_Of_Days: days.toString() }));
//       }
//     }
//   }, [formData.leave_From, formData.leave_To, formData.isHalfDay, manualDaysEntry]);

//   const extractDaysFromAdvanceNotice = (advanceNotice) => {
//     if (!advanceNotice) return 0;
    
//     const lowerNotice = advanceNotice?.toLowerCase();
    
//     if (lowerNotice.includes('immediate') || lowerNotice.includes('same day')) {
//       return 0;
//     }
//     const dayMatch = lowerNotice.match(/(\d+)\s*days?/);
//     if (dayMatch) {
//       return parseInt(dayMatch[1], 10);
//     }
//     const weekMatch = lowerNotice.match(/(\d+)\s*weeks?/);
//     if (weekMatch) {
//       return parseInt(weekMatch[1], 10) * 7;
//     }
//     const monthMatch = lowerNotice.match(/(\d+)\s*months?/);
//     if (monthMatch) {
//       return parseInt(monthMatch[1], 10) * 30;
//     }  
//     return 0;
//   };

//   const getMinDate = () => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (selectedLeaveType && selectedLeaveType.advanceNotice) {
//       const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
//       today.setDate(today.getDate() + advanceNoticeDays);
//     }

//     return today; 
//   };

//   const getAdvanceNoticeInfo = () => {
//     if (!selectedLeaveType) return null;
    
//     const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
//     const minDate = new Date();
//     minDate.setDate(minDate.getDate() + advanceNoticeDays);
    
//     return {
//       days: advanceNoticeDays,
//       earliestDate: minDate.toLocaleDateString(),
//       notice: selectedLeaveType.advanceNotice
//     };
//   };

//   const handleLeaveTypeChange = (leaveTypeId) => {
//     const leaveType = assignedLeaveTypes.find(lt => lt._id === leaveTypeId);
//     setSelectedLeaveType(leaveType);
//     setFormData(prev => ({
//       ...prev,
//       leaveType: leaveTypeId,
//       leave_From: '',
//       leave_To: '',
//       no_Of_Days: '',
//       isHalfDay: false,
//       halfDayPeriod: '',
//       halfDayPosition: 'end',
//       documents: null
//     }));
//     fetchAvailability(leaveTypeId);
//     setCalculatedDays(0);
//     setManualDaysEntry(false);
//     setErrors({});
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     if (field === 'no_Of_Days') {
//       setManualDaysEntry(true);
//       const numDays = parseFloat(value);

//       if (!isNaN(numDays) && formData.leave_From) {
//         setCalculatedDays(numDays);

//         const from = new Date(formData.leave_From);
//         let added = 0;
//         let current = new Date(from);
//         while (added < numDays && current.getDate() <= 31) {
//           if (current.getDay() !== 0 && current.getDay() !== 6) added++;
//           if (added < numDays) current.setDate(current.getDate() + 1);
//         }
//         const toStr = `${current.getFullYear()}-${(current.getMonth() + 1)
//           .toString().padStart(2, '0')}-${current.getDate().toString().padStart(2, '0')}`;

//         setFormData(prev => ({ ...prev, leave_To: toStr }));
//       }
//     }
    
//     if (field === 'isHalfDay') {
//       if (!value) {
//         setFormData(prev => ({ 
//           ...prev, 
//           halfDayPeriod: '', 
//           halfDayPosition: 'end'
//         }));
//       }
//       setManualDaysEntry(false);
//     }
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors(prev => ({
//           ...prev,
//           documents: 'File size must be less than 5MB'
//         }));
//         return;
//       }
      
//       const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//       if (!allowedTypes.includes(file.type)) {
//         setErrors(prev => ({
//           ...prev,
//           documents: 'Only PDF, JPG, and PNG files are allowed'
//         }));
//         return;
//       }
      
//       setFormData(prev => ({
//         ...prev,
//         documents: file
//       }));
      
//       if (errors.documents) {
//         setErrors(prev => ({
//           ...prev,
//           documents: ''
//         }));
//       }
//     }
//   };

//   const removeFile = () => {
//     setFormData(prev => ({
//       ...prev,
//       documents: null
//     }));
//     const fileInput = document.getElementById('documents');
//     if (fileInput) fileInput.value = '';
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const days = parseFloat(formData.no_Of_Days);

//     if (!formData.leaveType) {
//       newErrors.leaveType = 'Please select a leave type';
//     }

//     if (!formData.no_Of_Days || isNaN(days) || days <= 0) {
//       newErrors.no_Of_Days = 'Please enter a valid number of days';
//     } else {
//       if (selectedLeaveType?.category === 'paid' && days > selectedLeaveType.maxDays) {
//         newErrors.no_Of_Days = `You can't take more than ${selectedLeaveType.maxDays} days of paid leave.`;
//       }
//       if (availability?.totalAvailable !== undefined && days > availability.totalAvailable) {
//         newErrors.no_Of_Days = `You only have ${availability.totalAvailable} days available this month.`;
//       }
//     }

//     if (!formData.leave_From) {
//         newErrors.leave_From = 'Please select start date';
//       }

//       if (!formData.isHalfDay || (formData.isHalfDay && parseFloat(formData.no_Of_Days) > 0.5)) {
//         if (!formData.leave_To && !manualDaysEntry) {
//           newErrors.leave_To = 'Please select end date or enter days manually';
//         }
//       }

//       if (formData.isHalfDay) {
//         if (!formData.halfDayPeriod) {
//           newErrors.halfDayPeriod = 'Please select first half or second half';
//         }
//         if (!formData.halfDayPosition) {
//           newErrors.halfDayPosition = 'Please specify which day is the half day';
//         }
//       }

//       if (formData.leave_From && formData.leave_To) {
//         const start = new Date(formData.leave_From);
//         const end = new Date(formData.leave_To);
        
//         if (end < start) {
//           newErrors.leave_To = 'End date cannot be before start date';
//         }
        
//         if (selectedLeaveType) {
//           const advanceNoticeDays = extractDaysFromAdvanceNotice(selectedLeaveType.advanceNotice);
//           const minAllowedDate = new Date();
//           minAllowedDate.setDate(minAllowedDate.getDate() + advanceNoticeDays);
//           minAllowedDate.setHours(0, 0, 0, 0);
          
//           if (start < minAllowedDate) {
//             newErrors.leave_From = `Start date must be at least ${advanceNoticeDays} days from today (${selectedLeaveType.advanceNotice})`;
//           }
//         }
//       }

//       if (!formData.reason_For_Leave.trim()) {
//         newErrors.reason_For_Leave = 'Please provide a reason for leave';
//       } else if (formData.reason_For_Leave.trim().length < 10) {
//         newErrors.reason_For_Leave = 'Reason must be at least 10 characters';
//       }

//       if (!formData.emergencyContact.trim()) {
//         newErrors.emergencyContact = 'Emergency contact is required';
//       }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       const submitData = new FormData();
//       submitData.append('leaveType', formData.leaveType);
//       submitData.append('leave_From', new Date(formData.leave_From).toISOString());
//       submitData.append('leave_To', new Date(formData.leave_To || formData.leave_From).toISOString());
//       submitData.append('no_Of_Days', formData.no_Of_Days);
//       submitData.append('isHalfDay', formData.isHalfDay);
//       if (formData.isHalfDay) {
//         submitData.append('halfDayPeriod', formData.halfDayPeriod);
//         submitData.append('halfDayPosition', formData.halfDayPosition);
//       }
//       submitData.append('reason_For_Leave', formData.reason_For_Leave);
//       submitData.append('emergencyContact', formData.emergencyContact);
//       submitData.append('workHandover', formData.workHandover);
      
//       if (formData.documents) {
//         submitData.append('documents', formData.documents);
//       }
//       const result = await applyLeave(submitData); 
//       if(result){
//         setShowSuccess(true);
//         handleCancel();
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       setErrors({ submit: 'Failed to submit application. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       leaveType: '',
//       leave_From: '',
//       leave_To: '',
//       no_Of_Days: '',
//       isHalfDay: false,
//       halfDayPeriod: '',
//       halfDayPosition: 'end',
//       reason_For_Leave: '',
//       documents: null,
//       emergencyContact: '',
//       workHandover: ''
//     });
//     setSelectedLeaveType(null);
//     setCalculatedDays(0);
//     setManualDaysEntry(false);
//     setErrors({});
//     const fileInput = document.getElementById('documents');
//     if (fileInput) fileInput.value = '';
//   };

//   const getCategoryColor = (category) => {
//     switch(category) {
//       case 'paid': return 'text-green-600 bg-green-100 border-green-200 dark:text-green-300 dark:bg-green-900/40 dark:border-green-500/50';
//       case 'unpaid': return 'text-red-600 bg-red-100 border-red-200 dark:text-red-300 dark:bg-red-900/40 dark:border-red-500/50';
//       case 'mixed': return 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:border-blue-500/50';
//       default: return 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-300 dark:bg-gray-700/50 dark:border-gray-500/50';
//     }
//   };

//   const ModernCalendar = () => {
//     const today = new Date();
//     const minSelectableDate = getMinDate();
    
//     const getDaysInMonth = (date) => {
//       return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//     };

//     const getFirstDayOfMonth = (date) => {
//       return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//     };

//     const formatDate = (date) => {
//       return date.toISOString().split('T')[0];
//     };

//     const isDateDisabled = (date) => {
//       const dateObj = new Date(date);
//       const dayOfWeek = dateObj.getDay();
      
//       if (dayOfWeek === 0 || dayOfWeek === 6) return true;
//       if (dateObj < minSelectableDate) return true;
      
//       if (!selectingStartDate && formData.leave_From) {
//         const start = new Date(formData.leave_From);
//         start.setHours(0, 0, 0, 0);
//         dateObj.setHours(0, 0, 0, 0);
//         if (dateObj < start) return true;
//       }
      
//       return false;
//     };

//     const isDateSelected = (date) => {
//       const dateStr = formatDate(date);
//       return dateStr === formData.leave_From || dateStr === formData.leave_To;
//     };

//     const isDateInRange = (date) => {
//       if (!formData.leave_From || !formData.leave_To) return false;
//       const dateObj = new Date(date);
//       const start = new Date(formData.leave_From);
//       const end = new Date(formData.leave_To);
//       return dateObj > start && dateObj < end;
//     };

//     const handleDateClick = (date) => {
//       const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
//         .toString()
//         .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

//       if (isDateDisabled(date)) return;

//       if (selectingStartDate) {
//         setFormData(prev => ({ ...prev, leave_From: dateStr, leave_To: '' }));
//         setSelectingStartDate(false);
//       } else {
//         const days = calculateWorkingDays(formData.leave_From, dateStr);

//         if (
//           selectedLeaveType?.category === 'paid' &&
//           availability?.totalAvailable !== undefined &&
//           days > availability.totalAvailable
//         ) {
//           toast.error(`Only ${availability.totalAvailable} day(s) available for this leave type.`);
//           return;
//         }

//         if (selectedLeaveType?.maxDays && days > selectedLeaveType.maxDays) {
//           toast.error(`You can select up to ${selectedLeaveType.maxDays} working days.`);
//           return;
//         }

//         setFormData(prev => ({ ...prev, leave_To: dateStr }));
//         setShowCalendar(false);
//       }
//     };

//     const safeDisplayDate = (dateStr) => {
//       return new Date(dateStr + 'T00:00:00Z').toLocaleDateString();
//     };

//     const navigateMonth = (direction) => {
//       setCurrentMonth(prev => {
//         const newMonth = new Date(prev);
//         newMonth.setMonth(prev.getMonth() + direction);
//         return newMonth;
//       });
//     };

//     const renderCalendarDays = () => {
//       const daysInMonth = getDaysInMonth(currentMonth);
//       const firstDay = getFirstDayOfMonth(currentMonth);
//       const days = [];

//       for (let i = 0; i < firstDay; i++) {
//         days.push(<div key={`empty-${i}`} className="h-8"></div>);
//       }

//       for (let day = 1; day <= daysInMonth; day++) {
//         const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//         const isDisabled = isDateDisabled(date);
//         const isSelected = isDateSelected(date);
//         const isInRange = isDateInRange(date);
//         const isToday = formatDate(date) === formatDate(today);

//         days.push(
//           <button
//             key={day}
//             type="button"
//             onClick={() => handleDateClick(date)}
//             disabled={isDisabled}
//             className={`
//               h-8 w-8 rounded-lg text-xs font-medium transition-all duration-200 relative
//               ${isDisabled 
//                 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800' 
//                 : 'hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer'
//               }
//               ${isSelected 
//                 ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 dark:ring-blue-500' 
//                 : 'text-gray-700 dark:text-gray-300'
//               }
//               ${isInRange 
//                 ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
//                 : ''
//               }
//               ${isToday && !isSelected 
//                 ? 'ring-2 ring-purple-400 dark:ring-purple-500 bg-purple-50 dark:bg-purple-900/20' 
//                 : ''
//               }
//             `}
//           >
//             {day}
//             {isToday && (
//               <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
//             )}
//           </button>
//         );
//       }

//       return days;
//     };

//     return (
//       <div className="rounded-xl shadow-xl border p-4 max-w-sm mx-auto transition-all duration-300 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600">
//         <div className="flex items-center justify-between mb-4">
//           <button
//             type="button"
//             onClick={() => navigateMonth(-1)}
//             className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             <FaChevronLeft className="w-3 h-3 text-gray-600 dark:text-gray-400" />
//           </button>
          
//           <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
//             {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//           </h3>
          
//           <button
//             type="button"
//             onClick={() => navigateMonth(1)}
//             className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             <FaChevronRight className="w-3 h-3 text-gray-600 dark:text-gray-400" />
//           </button>
//         </div>

//         <div className="mb-3 p-2 rounded-lg border transition-all duration-300 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
//           <p className="text-xs font-medium text-blue-800 dark:text-blue-300">
//             {selectingStartDate ? 'Select start date' : 'Select end date'}
//           </p>
//           {formData.leave_From && (
//             <p className="text-xs mt-1 text-blue-600 dark:text-blue-400">
//               Start: {formatDateForDisplay(formData.leave_From)}
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
//               {day}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 gap-1 mb-3">
//           {renderCalendarDays()}
//         </div>

//         <div className="border-t pt-3 border-gray-200 dark:border-gray-600">
//           <div className="flex flex-wrap gap-2 text-xs">
//             <div className="flex items-center">
//               <div className="w-2 h-2 bg-blue-600 rounded mr-1"></div>
//               <span className="text-gray-600 dark:text-gray-400">Selected</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-2 h-2 rounded mr-1 bg-blue-100 dark:bg-blue-900/20"></div>
//               <span className="text-gray-600 dark:text-gray-400">Range</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-2 h-2 rounded mr-1 bg-gray-200 dark:bg-gray-700"></div>
//               <span className="text-gray-600 dark:text-gray-400">Disabled</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-2 mt-3">
//           <button
//             type="button"
//             onClick={() => {
//               setFormData(prev => ({ ...prev, leave_From: '', leave_To: '' }));
//               setSelectingStartDate(true);
//             }}
//             className="flex-1 px-3 py-1.5 text-xs border rounded-lg transition-colors duration-200 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
//           >
//             Clear
//           </button>
//           <button
//             type="button"
//             onClick={() => setShowCalendar(false)}
//             className="flex-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const handleCancel = () => {
//     resetForm();
//     onClose();
//   };

//   if (!show) return null;

//   return (
//      <BaseModal isOpen={show} onClose={handleCancel}>
//       <div className="">
//         <div className="h-[95vh] overflow-y-auto rounded-2xl shadow-2xl max-w-7xl w-full transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//           <div className="py-4 px-4 dark:bg-gray-800">
//             <div className="max-w-7xl mx-auto">
//               {/* Compact Header */}
//               <div className="flex items-center justify-between mb-4 pb-3 border-b dark:border-gray-700">
//                 <div>
//                   <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
//                     <FaPaperPlane className="w-5 h-5 mr-2 text-blue-600" />
//                     Leave Application
//                   </h1>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">Submit your leave request</p>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Total Paid Leaves</p>
//                     <p className="text-lg font-bold text-gray-900 dark:text-white">{totalPaidLeaves}</p>
//                   </div>
//                   <button
//                     onClick={handleCancel}
//                     className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
//                   >
//                     <FaTimes size={16} />
//                   </button>
//                 </div>
//               </div>

//               {/* Success Message */}
//               {showSuccess && (
//                 <div className="mb-4 p-3 rounded-lg border bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
//                   <div className="flex items-center">
//                     <FaCheckCircle className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
//                     <div>
//                       <h3 className="font-semibold text-sm text-green-800 dark:text-green-300">Application Submitted!</h3>
//                       <p className="text-xs text-green-600 dark:text-green-400">Your leave application has been sent for approval.</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Main Form */}
//               <div className="space-y-4">
                
//                 {/* Two Column Layout */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
//                   {/* Left Column */}
//                   <div className="space-y-4">
                    
//                     {/* Leave Type Selection */}
//                     <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
//                       <h2 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-100">
//                         <FaUser className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
//                         Leave Type
//                       </h2>
                      
//                       <div className="space-y-2">
//                         {assignedLeaveTypes.map(leaveType => (
//                           <div
//                             key={leaveType._id}
//                             onClick={() => handleLeaveTypeChange(leaveType._id)}
//                             className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
//                               formData.leaveType === leaveType._id
//                                 ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/40' 
//                                 : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:border-gray-500'
//                             }`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center">
//                                 <div className={`w-3 h-3 rounded-full ${leaveType.color} mr-2`}></div>
//                                 <div>
//                                   <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">{leaveType.name}</h3>
//                                   <p className="text-xs text-gray-600 dark:text-gray-300">{leaveType.description}</p>
//                                 </div>
//                               </div>
//                               <div className="text-right">
//                                 <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase border ${getCategoryColor(leaveType.category)}`}>
//                                   {leaveType.category}
//                                 </span>
//                                 <p className="text-xs font-bold text-gray-800 dark:text-gray-100 mt-1">{leaveType.maxDays} days max</p>
//                               </div>
//                             </div>
//                             {leaveType.name === 'Sick Leave' && leaveType.noDocumentLimit && (
//                               <div className="mt-1 text-xs text-orange-600 dark:text-orange-400">
//                                 No documents required for ≤{leaveType.noDocumentLimit} days
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
                      
//                       {errors.leaveType && (
//                         <p className="text-red-600 dark:text-red-400 text-xs mt-2 flex items-center">
//                           <FaExclamationTriangle className="w-3 h-3 mr-1" />
//                           {errors.leaveType}
//                         </p>
//                       )}
//                     </div>

//                     {/* Leave Type Information */}
//                     {selectedLeaveType && (
//                       <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
//                         <h2 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-100">
//                           <FaInfoCircle className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
//                           Information
//                         </h2>
                        
//                         <div className="grid grid-cols-1 gap-3">
//                           <div className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-3">
//                             <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-100">Requirements</h4>
//                             <div className="space-y-2 text-xs">
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600 dark:text-gray-300">Advance Notice:</span>
//                                 <span className="font-semibold text-gray-800 dark:text-gray-100">{selectedLeaveType.advanceNotice}</span>
//                               </div>
//                               {/* <div className="flex justify-between">
//                                 <span className="text-gray-600 dark:text-gray-300">API Value:</span>
//                                 <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
//                                   "{selectedLeaveType.documentsRequired}"
//                                 </span>
//                               </div> */}
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600 dark:text-gray-300">Documents:</span>
//                                 <div className="text-right">
//                                   <span className={`font-semibold ${
//                                     documentRequirement.required 
//                                       ? 'text-orange-600 dark:text-orange-400'
//                                       : 'text-green-600 dark:text-green-400'
//                                   }`}>
//                                     {documentRequirement.required ? 'Required' : 'Not Required'}
//                                   </span>
//                                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                                     {documentRequirement.reason}
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-gray-600 dark:text-gray-300">Max Days:</span>
//                                 <span className="font-semibold text-gray-800 dark:text-gray-100">{selectedLeaveType.maxDays}</span>
//                               </div>
//                               {availability?.totalAvailable !== undefined && (
//                                 <div className="flex justify-between">
//                                   <span className="text-gray-600 dark:text-gray-300">Available:</span>
//                                   <span className="font-semibold text-blue-800 dark:text-blue-300">{availability.totalAvailable}</span>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className="bg-gray-50 dark:bg-gray-700/60 rounded-lg p-3">
//                             <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-100">Eligibility</h4>
//                             <p className="text-xs text-gray-600 dark:text-gray-300">{selectedLeaveType.eligibility}</p>
//                           </div>

//                           {availability && (
//                             <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
//                               <h4 className="font-semibold text-sm mb-2 text-blue-800 dark:text-blue-300">Monthly Status</h4>
//                               <div className="grid grid-cols-3 gap-2 text-xs">
//                                 <div className="text-center">
//                                   <p className="text-gray-600 dark:text-gray-400">Quota</p>
//                                   <p className="font-bold text-gray-800 dark:text-gray-200">{availability.monthlyQuota}</p>
//                                 </div>
//                                 <div className="text-center">
//                                   <p className="text-gray-600 dark:text-gray-400">Used</p>
//                                   <p className="font-bold text-gray-800 dark:text-gray-200">{availability.used}</p>
//                                 </div>
//                                 <div className="text-center">
//                                   <p className="text-gray-600 dark:text-gray-400">Carry Forward</p>
//                                   <p className="font-bold text-gray-800 dark:text-gray-200">{availability.carryForward}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {selectedLeaveType.policies && selectedLeaveType.policies.length > 0 && (
//                           <div className="mt-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 border border-blue-200 dark:border-blue-500/50">
//                             <h4 className="font-semibold text-sm mb-2 flex items-center text-blue-800 dark:text-blue-300">
//                               <FaFileAlt className="w-3 h-3 mr-1" />
//                               Policies
//                             </h4>
//                             <ul className="space-y-1">
//                               {selectedLeaveType.policies.map((policy, index) => (
//                                 <li key={index} className="flex items-start text-blue-700 dark:text-blue-300">
//                                   <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
//                                   <span className="text-xs">{policy}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Right Column */}
//                   <div className="space-y-4">
                    
//                     {/* Duration & Dates */}
//                     {selectedLeaveType && (
//                       <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
//                         <h2 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-100">
//                           <FaCalendarAlt className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
//                           Duration & Dates
//                         </h2>

//                         {/* Half Day Toggle */}
//                         <div className="mb-3">
//                           <label className="flex items-center space-x-2 cursor-pointer">
//                             <input
//                               type="checkbox"
//                               checked={formData.isHalfDay}
//                               onChange={(e) => handleInputChange('isHalfDay', e.target.checked)}
//                               className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
//                             />
//                             <span className="text-sm font-medium text-gray-700 dark:text-gray-200">This is a half-day leave</span>
//                           </label>
//                         </div>

//                         {/* Half Day Options */}
//                         {formData.isHalfDay && (
//                           <div className="grid grid-cols-2 gap-3 mb-3">
//                             <div>
//                               <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Half Day Period *</label>
//                               <div className="grid grid-cols-2 gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleInputChange('halfDayPeriod', 'morning')}
//                                   className={`p-2 rounded-lg border text-xs transition-all ${
//                                     formData.halfDayPeriod === 'morning'
//                                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
//                                       : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
//                                   }`}
//                                 >
//                                   <FaSun className="w-3 h-3 mx-auto mb-1" />
//                                   <div className="font-semibold">First Half</div>
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => handleInputChange('halfDayPeriod', 'afternoon')}
//                                   className={`p-2 rounded-lg border text-xs transition-all ${
//                                     formData.halfDayPeriod === 'afternoon'
//                                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
//                                       : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
//                                   }`}
//                                 >
//                                   <FaMoon className="w-3 h-3 mx-auto mb-1" />
//                                   <div className="font-semibold">Second Half</div>
//                                 </button>
//                               </div>
//                               {errors.halfDayPeriod && (
//                                 <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.halfDayPeriod}</p>
//                               )}
//                             </div>

//                             <div>
//                               <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Position *</label>
//                               <div className="grid grid-cols-2 gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleInputChange('halfDayPosition', 'start')}
//                                   className={`p-2 rounded-lg border text-xs transition-all ${
//                                     formData.halfDayPosition === 'start'
//                                       ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
//                                       : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
//                                   }`}
//                                 >
//                                   <div className="font-semibold">First Day</div>
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => handleInputChange('halfDayPosition', 'end')}
//                                   className={`p-2 rounded-lg border text-xs transition-all ${
//                                     formData.halfDayPosition === 'end'
//                                       ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
//                                       : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
//                                   }`}
//                                 >
//                                   <div className="font-semibold">Last Day</div>
//                                 </button>
//                               </div>
//                               {errors.halfDayPosition && (
//                                 <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.halfDayPosition}</p>
//                               )}
//                             </div>
//                           </div>
//                         )}

//                         {/* Days Input */}
//                         <div className="mb-3">
//                           <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Number of Days *</label>
//                           <input
//                             type="number"
//                             step="0.5"
//                             min="0.5"
//                             max="365"
//                             value={formData.no_Of_Days}
//                             onChange={(e) => handleInputChange('no_Of_Days', e.target.value)}
//                             placeholder="Enter days (e.g., 2.5)"
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
//                               errors.no_Of_Days ? 'border-red-500' : ''
//                             }`}
//                           />
//                           {errors.no_Of_Days && (
//                             <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.no_Of_Days}</p>
//                           )}
//                         </div>

//                         {/* Advance Notice Warning */}
//                         {getAdvanceNoticeInfo() && getAdvanceNoticeInfo().days > 0 && (
//                           <div className="mb-3 p-2 rounded-lg border bg-orange-50 border-orange-200 dark:bg-orange-900/30 dark:border-orange-500/50">
//                             <div className="flex items-center">
//                               <FaExclamationTriangle className="w-3 h-3 mr-2 text-orange-600 dark:text-orange-400" />
//                               <div>
//                                 <p className="font-semibold text-xs text-orange-800 dark:text-orange-300">
//                                   Advance Notice: {getAdvanceNoticeInfo().notice}
//                                 </p>
//                                 <p className="text-xs text-orange-700 dark:text-orange-400">
//                                   Earliest date: {getAdvanceNoticeInfo().earliestDate}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
                        
//                         {/* Date Inputs */}
//                         <div className="grid grid-cols-2 gap-3 mb-3">
//                           <div>
//                             <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Start Date *</label>
//                             <div className="relative">
//                               <input
//                                 type="text"
//                                 value={formData.leave_From ? formatDateForDisplay(formData.leave_From) : ''}
//                                 placeholder="Select start date"
//                                 readOnly
//                                 onClick={() => {
//                                   setShowCalendar(true);
//                                   setSelectingStartDate(true);
//                                 }}
//                                 className={`w-full px-3 py-2 text-sm border rounded-lg cursor-pointer bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
//                                   errors.leave_From ? 'border-red-500' : ''
//                                 }`}
//                               />
//                               <FaCalendarAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-400" />
//                             </div>
//                             {errors.leave_From && (
//                               <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.leave_From}</p>
//                             )}
//                           </div>
                          
//                           <div>
//                             <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">End Date</label>
//                             <div className="relative">
//                               <input
//                                 type="text"
//                                 value={formData.leave_To ? new Date(formData.leave_To).toLocaleDateString() : ''}
//                                 placeholder="Select end date"
//                                 readOnly
//                                 onClick={() => {
//                                   if (formData.leave_From) {
//                                     setShowCalendar(true);
//                                     setSelectingStartDate(false);
//                                   }
//                                 }}
//                                 disabled={!formData.leave_From || manualDaysEntry}
//                                 className={`w-full px-3 py-2 text-sm border rounded-lg cursor-pointer disabled:opacity-50 bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
//                                   errors.leave_To ? 'border-red-500' : ''
//                                 }`}
//                               />
//                               <FaCalendarAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-400" />
//                             </div>
//                             {errors.leave_To && (
//                               <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.leave_To}</p>
//                             )}
//                           </div>
//                         </div>

//                         {/* Days Summary */}
//                         {parseFloat(formData.no_Of_Days) > 0 && (
//                           <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50">
//                             <div className="flex items-center justify-between mb-1">
//                               <span className="font-semibold text-sm text-blue-700 dark:text-blue-300">Total Days:</span>
//                               <span className="text-lg font-bold text-blue-800 dark:text-blue-200">{formData.no_Of_Days}</span>
//                             </div>
//                             {formData.isHalfDay && formData.halfDayPeriod && formData.halfDayPosition && (
//                               <div className="text-xs text-blue-600 dark:text-blue-400">
//                                 <strong>Half Day:</strong> {formData.halfDayPeriod === 'morning' ? 'Morning' : 'Afternoon'} 
//                                 {' '}on {formData.halfDayPosition === 'start' ? 'first' : 'last'} day
//                               </div>
//                             )}
//                             {formData.leave_From && (
//                               <div className="text-xs text-blue-600 dark:text-blue-400">
//                                 <strong>Dates:</strong> {formatDateForDisplay(formData.leave_From)}
//                                 {formData.leave_To && formData.leave_To !== formData.leave_From && 
//                                   ` - ${new Date(formData.leave_To).toLocaleDateString()}`
//                                 }
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Application Details */}
//                     {selectedLeaveType && (
//                       <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
//                         <h2 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-100">
//                           <FaFileAlt className="w-4 h-4 mr-2 text-orange-600 dark:text-orange-400" />
//                           Details
//                         </h2>
                        
//                         <div className="space-y-3">
//                           <div>
//                             <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Reason for Leave *</label>
//                             <textarea
//                               value={formData.reason_For_Leave}
//                               onChange={(e) => handleInputChange('reason_For_Leave', e.target.value)}
//                               rows={3}
//                               placeholder="Provide detailed reason..."
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
//                                 errors.reason_For_Leave ? 'border-red-500' : ''
//                               }`}
//                             />
//                             {errors.reason_For_Leave && (
//                               <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.reason_For_Leave}</p>
//                             )}
//                           </div>

//                           <div>
//                             <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Emergency Contact *</label>
//                             <input
//                               type="text"
//                               value={formData.emergencyContact}
//                               onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
//                               placeholder="Contact person and phone"
//                               className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${
//                                 errors.emergencyContact ? 'border-red-500' : ''
//                               }`}
//                             />
//                             {errors.emergencyContact && (
//                               <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.emergencyContact}</p>
//                             )}
//                           </div>

//                           <div>
//                             <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">Work Handover</label>
//                             <textarea
//                               value={formData.workHandover}
//                               onChange={(e) => handleInputChange('workHandover', e.target.value)}
//                               rows={2}
//                               placeholder="How will work be handled..."
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Document Upload */}
//                     {selectedLeaveType && documentRequirement.required && (
//                       <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
//                         <h2 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-100">
//                           <FaFileUpload className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
//                           Documents
//                         </h2>
                        
//                         <div className="mb-3 p-2 rounded-lg border bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800">
//                           <div className="flex items-center">
//                             <FaInfoCircle className="w-3 h-3 mr-2 text-orange-600 dark:text-orange-400" />
//                             <p className="text-xs font-semibold text-orange-800 dark:text-orange-300">
//                               {documentRequirement.reason}
//                             </p>
//                           </div>
//                         </div>

//                         {!formData.documents ? (
//                           <div className="border-2 border-dashed rounded-lg p-4 text-center border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
//                             <FaFileUpload className="w-6 h-6 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
//                             <p className="mb-2 text-xs text-gray-600 dark:text-gray-300">Drag and drop or</p>
//                             <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs rounded-lg cursor-pointer transition-colors inline-flex items-center">
//                               <FaFileUpload className="w-3 h-3 mr-1" />
//                               Choose File
//                               <input
//                                 type="file"
//                                 id="documents"
//                                 onChange={handleFileUpload}
//                                 accept=".pdf,.jpg,.jpeg,.png"
//                                 className="hidden"
//                               />
//                             </label>
//                             <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">PDF, JPG, PNG (Max 5MB)</p>
//                           </div>
//                         ) : (
//                           <div className="border rounded-lg p-3 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center">
//                                 <FaCheckCircle className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
//                                 <div>
//                                   <p className="font-semibold text-sm text-green-800 dark:text-green-300">{formData.documents.name}</p>
//                                   <p className="text-xs text-green-600 dark:text-green-400">
//                                     {(formData.documents.size / 1024 / 1024).toFixed(2)} MB
//                                   </p>
//                                 </div>
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={removeFile}
//                                 className="p-1 rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
//                               >
//                                 <FaTimes className="w-3 h-3" />
//                               </button>
//                             </div>
//                           </div>
//                         )}
                        
//                         {errors.documents && (
//                           <p className="text-red-600 dark:text-red-400 text-xs mt-2">{errors.documents}</p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Calendar Modal */}
//                 {showCalendar && (
//                   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="relative">
//                       <button
//                         type="button"
//                         onClick={() => setShowCalendar(false)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
//                       >
//                         <FaTimes className="w-3 h-3" />
//                       </button>
//                       <ModernCalendar />
//                     </div>
//                   </div>
//                 )}

//                 {/* Submit Section */}
//                 {selectedLeaveType && (
//                   <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
//                     {errors.submit && (
//                       <div className="mb-4 p-3 rounded-lg border bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
//                         <div className="flex items-center">
//                           <FaExclamationTriangle className="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
//                           <p className="text-sm text-red-800 dark:text-red-300">{errors.submit}</p>
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex flex-col sm:flex-row gap-3 justify-end">
//                       <button
//                         type="button"
//                         onClick={resetForm}
//                         disabled={isSubmitting}
//                         className="px-4 py-2 text-sm border rounded-lg transition-colors disabled:opacity-50 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
//                       >
//                         Reset
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleCancel}
//                         disabled={isSubmitting}
//                         className="px-4 py-2 text-sm border rounded-lg transition-colors disabled:opacity-50 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleSubmit}
//                         disabled={isSubmitting}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded-lg transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50 min-w-[140px]"
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <FaSpinner className="w-4 h-4 animate-spin" />
//                             Submitting...
//                           </>
//                         ) : (
//                           <>
//                             <FaPaperPlane className="w-4 h-4" />
//                             Submit
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     {/* Application Summary */}
//                     <div className="mt-4 p-3 rounded-lg border bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-500/50">
//                       <h4 className="font-semibold text-sm mb-2 flex items-center text-blue-800 dark:text-blue-300">
//                         <FaClock className="w-3 h-3 mr-1" />
//                         Summary
//                       </h4>
//                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
//                         <div>
//                           <span className="text-blue-600 dark:text-blue-400">Type:</span>
//                           <span className="ml-1 font-semibold text-blue-800 dark:text-blue-200">{selectedLeaveType.name}</span>
//                         </div>
//                         <div>
//                           <span className="text-blue-600 dark:text-blue-400">Category:</span>
//                           <span className="ml-1 font-semibold capitalize text-blue-800 dark:text-blue-200">{selectedLeaveType.category}</span>
//                         </div>
//                         {formData.no_Of_Days && (
//                           <>
//                             <div>
//                               <span className="text-blue-600 dark:text-blue-400">Duration:</span>
//                               <span className="ml-1 font-semibold text-blue-800 dark:text-blue-200">
//                                 {formData.no_Of_Days} {parseFloat(formData.no_Of_Days) === 1 ? 'day' : 'days'}
//                               </span>
//                             </div>
//                             <div>
//                               <span className="text-blue-600 dark:text-blue-400">Documents:</span>
//                               <span className={`ml-1 font-semibold ${
//                                 documentRequirement.required 
//                                   ? 'text-orange-600 dark:text-orange-400'
//                                   : 'text-green-600 dark:text-green-400'
//                               }`}>
//                                 {documentRequirement.required ? 'Required' : 'Not Required'}
//                               </span>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// export default ApplyLeaveModal;