import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaCalendarAlt, 
  FaUsers, 
  FaFileAlt, 
  FaClock, 
  FaCheckCircle, 
  FaExclamationCircle 
} from 'react-icons/fa';
import LeaveTypeInfo from "./models/LeaveTypeModel";
import LeaveType from "./models/LeaveTypeModel";

export default function LeavesTypes() {

   const [expandedLeave, setExpandedLeave] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
  
     const [isModalOpen, setIsModalOpen] = useState(false);
     
     const handleAdd = () => {
    setIsModalOpen(true);
   
  };

   const handleCloseModal = () => {
    setIsModalOpen(false);
   
  };

    const leaveTypes = [
    {
      id: 1,
      name: "Annual Leave",
      category: "paid",
      maxDays: 21,
      description: "Yearly vacation days for rest and recreation",
      approver: "Direct Manager",
      documentsRequired: false,
      advanceNotice: "2 weeks",
      policies: [
        "Must be taken within the calendar year",
        "Cannot exceed 5 consecutive days without manager approval",
        "Unused days may carry over up to 5 days",
        "Blackout periods apply during peak business seasons"
      ],
      eligibility: "All full-time employees after 90 days of employment",
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Sick Leave",
      category: "paid",
      maxDays: 10,
      description: "For personal illness or medical appointments",
      approver: "HR Department",
      documentsRequired: "Medical certificate for 3+ consecutive days",
      advanceNotice: "As soon as possible",
      policies: [
        "Can be taken immediately when needed",
        "Medical certificate required for extended absence",
        "Cannot be carried forward to next year",
        "Family care covered up to 3 days per year"
      ],
      eligibility: "All employees from day one",
      color: "bg-red-500"
    },
    {
      id: 3,
      name: "Maternity Leave",
      category: "paid",
      maxDays: 84,
      description: "For new mothers during childbirth and recovery",
      approver: "HR Department + Direct Manager",
      documentsRequired: "Medical certificate, birth certificate",
      advanceNotice: "2 months before due date",
      policies: [
        "12 weeks paid leave for biological mothers",
        "Can be extended with unpaid leave up to 6 months",
        "Flexible return-to-work arrangements available",
        "Job protection guaranteed during leave period"
      ],
      eligibility: "Female employees with 6+ months of service",
      color: "bg-pink-500"
    },
    {
      id: 4,
      name: "Paternity Leave",
      category: "paid",
      maxDays: 14,
      description: "For new fathers to bond with newborn",
      approver: "Direct Manager",
      documentsRequired: "Birth certificate or adoption papers",
      advanceNotice: "1 month before expected date",
      policies: [
        "2 weeks paid leave for fathers",
        "Must be taken within 6 months of birth/adoption",
        "Can be taken in blocks or continuously",
        "Additional unpaid leave may be granted"
      ],
      eligibility: "Male employees with 3+ months of service",
      color: "bg-green-500"
    },
    {
      id: 5,
      name: "Bereavement Leave",
      category: "paid",
      maxDays: 5,
      description: "For grieving the loss of family members",
      approver: "HR Department",
      documentsRequired: "Death certificate or funeral notice",
      advanceNotice: "As soon as possible",
      policies: [
        "5 days for immediate family members",
        "3 days for extended family members",
        "Additional unpaid leave may be granted",
        "Travel time included for out-of-state funerals"
      ],
      eligibility: "All employees",
      color: "bg-gray-500"
    },
    {
      id: 6,
      name: "Personal Leave",
      category: "unpaid",
      maxDays: 30,
      description: "Extended time off for personal matters",
      approver: "Department Head + HR",
      documentsRequired: "Written application with justification",
      advanceNotice: "1 month minimum",
      policies: [
        "Unpaid leave up to 30 days per year",
        "Job protection not guaranteed beyond 30 days",
        "Health benefits may be affected",
        "Must exhaust other leave types first"
      ],
      eligibility: "Employees with 1+ year of service",
      color: "bg-purple-500"
    },
    {
      id: 7,
      name: "Study Leave",
      category: "mixed",
      maxDays: 10,
      description: "For educational pursuits and examinations",
      approver: "Direct Manager + HR",
      documentsRequired: "Enrollment proof, exam schedule",
      advanceNotice: "1 month before exams",
      policies: [
        "Up to 10 days paid leave for job-related studies",
        "Additional unpaid leave available",
        "Reimbursement available for approved courses",
        "Must maintain satisfactory work performance"
      ],
      eligibility: "Employees enrolled in approved educational programs",
      color: "bg-indigo-500"
    },
    {
      id: 8,
      name: "Emergency Leave",
      category: "paid",
      maxDays: 3,
      description: "For urgent, unforeseen circumstances",
      approver: "Any Available Manager",
      documentsRequired: "Explanation within 48 hours",
      advanceNotice: "Immediate notification required",
      policies: [
        "Up to 3 days per year for genuine emergencies",
        "Must provide detailed explanation",
        "Cannot be planned in advance",
        "Subject to verification by HR"
      ],
      eligibility: "All employees",
      color: "bg-orange-500"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Leave Types', count: leaveTypes.length },
    { key: 'paid', label: 'Paid Leave', count: leaveTypes.filter(l => l.category === 'paid').length },
    { key: 'unpaid', label: 'Unpaid Leave', count: leaveTypes.filter(l => l.category === 'unpaid').length },
    { key: 'mixed', label: 'Mixed Benefits', count: leaveTypes.filter(l => l.category === 'mixed').length }
  ];

  const filteredLeaves = selectedCategory === 'all' 
    ? leaveTypes 
    : leaveTypes.filter(leave => leave.category === selectedCategory);

  const toggleExpand = (leaveId) => {
    setExpandedLeave(expandedLeave === leaveId ? null : leaveId);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'unpaid': return 'text-red-600 bg-red-100';
      case 'mixed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
           {/* Header */}
           <div className="mb-8">
             <div className="flex justify-between items-center mb-4">
             <h1 className="text-4xl font-bold text-gray-800 mb-2">Leave Type Information</h1>
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Leave Type
              </button>
             </div>
             <p className="text-gray-600 text-lg">Comprehensive overview of all available leave types, policies, and requirements</p>
           </div>
     
           {/* Category Filter */}
           <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
             <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by Category</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {categories.map(category => (
                 <button
                   key={category.key}
                   onClick={() => setSelectedCategory(category.key)}
                   className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                     selectedCategory === category.key
                       ? 'border-blue-500 bg-blue-50 text-blue-700'
                       : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                   }`}
                 >
                   <div className="text-2xl font-bold">{category.count}</div>
                   <div className="text-sm">{category.label}</div>
                 </button>
               ))}
             </div>
           </div>
     
           {/* Leave Types Grid */}
           <div className="grid gap-6">
             {filteredLeaves.map(leave => (
               <div
                 key={leave.id}
                 className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
               >
                 {/* Leave Header */}
                 <div
                   className="p-6 cursor-pointer"
                   onClick={() => toggleExpand(leave.id)}
                 >
                   <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                       <div className={`w-4 h-4 rounded-full ${leave.color}`}></div>
                       <div>
                         <h3 className="text-2xl font-bold text-gray-800">{leave.name}</h3>
                         <p className="text-gray-600 mt-1">{leave.description}</p>
                       </div>
                     </div>
                     <div className="flex items-center space-x-4">
                       <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryColor(leave.category)}`}>
                         {leave.category}
                       </span>
                       <div className="text-right">
                         <div className="text-2xl font-bold text-gray-800">{leave.maxDays}</div>
                         <div className="text-sm text-gray-500">Max Days</div>
                       </div>
                       {expandedLeave === leave.id ? (
                         <FaChevronUp className="w-6 h-6 text-gray-400" />
                       ) : (
                         <FaChevronDown className="w-6 h-6 text-gray-400" />
                       )}
                     </div>
                   </div>
                 </div>
     
                 {/* Expanded Details */}
                 {expandedLeave === leave.id && (
                   <div className="border-t bg-gray-50">
                     <div className="p-6">
                       <div className="grid md:grid-cols-2 gap-8">
                         {/* Left Column */}
                         <div className="space-y-6">
                           {/* Quick Info */}
                           <div className="bg-white rounded-lg p-4 shadow-sm">
                             <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                               <FaClock className="w-5 h-5 mr-2 text-blue-500" />
                               Quick Information
                             </h4>
                             <div className="space-y-3">
                               <div className="flex justify-between items-center">
                                 <span className="text-gray-600">Approver:</span>
                                 <span className="font-medium text-gray-800">{leave.approver}</span>
                               </div>
                               <div className="flex justify-between items-center">
                                 <span className="text-gray-600">Advance Notice:</span>
                                 <span className="font-medium text-gray-800">{leave.advanceNotice}</span>
                               </div>
                               <div className="flex justify-between items-start">
                                 <span className="text-gray-600">Documents:</span>
                                 <div className="text-right">
                                   {leave.documentsRequired ? (
                                     <div className="flex items-center text-orange-600">
                                       <FaFileAlt className="w-4 h-4 mr-1" />
                                       <span className="font-medium text-sm">{leave.documentsRequired}</span>
                                     </div>
                                   ) : (
                                     <div className="flex items-center text-green-600">
                                       <FaCheckCircle className="w-4 h-4 mr-1" />
                                       <span className="font-medium text-sm">Not Required</span>
                                     </div>
                                   )}
                                 </div>
                               </div>
                             </div>
                           </div>
     
                           {/* Eligibility */}
                           <div className="bg-white rounded-lg p-4 shadow-sm">
                             <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                               <FaUsers className="w-5 h-5 mr-2 text-green-500" />
                               Eligibility
                             </h4>
                             <p className="text-gray-700">{leave.eligibility}</p>
                           </div>
                         </div>
     
                         {/* Right Column */}
                         <div>
                           <div className="bg-white rounded-lg p-4 shadow-sm">
                             <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                               <FaExclamationCircle className="w-5 h-5 mr-2 text-purple-500" />
                               Policies & Guidelines
                             </h4>
                             <ul className="space-y-2">
                               {leave.policies.map((policy, index) => (
                                 <li key={index} className="flex items-start">
                                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                   <span className="text-gray-700 text-sm leading-relaxed">{policy}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             ))}
           </div>
     
           {/* Summary Footer */}
           <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
             <div className="flex items-center justify-between">
               <div>
                 <h3 className="text-xl font-semibold">Need Help?</h3>
                 <p className="text-blue-100 mt-1">Contact HR for personalized leave planning assistance</p>
               </div>
               <div className="text-right">
                 <div className="text-3xl font-bold">{filteredLeaves.length}</div>
                 <div className="text-blue-100">Available Leave Types</div>
               </div>
             </div>
           </div>
         </div>
      <LeaveType isOpen={isModalOpen}  onClose={handleCloseModal} />
    </div>
  );
}