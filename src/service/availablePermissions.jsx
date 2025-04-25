const availablePermission = [
  // ------------------------------ Dashboard Permissions ------------------------------
  { name: "Super Admin Dashboard", permission: "dashboard-super" },
  { name: "Employee Dashboard", permission: "dashboard-employee" },
  {
    name: "All Dashlets Chart Permission",
    permission: "dashboard-all-dashlets",
  },

  // ------------------------------ Announcement Management Permissions ------------------------------
  { name: "Post Announcement", permission: "announcement-create" },
  { name: "View Announcements", permission: "announcement-view" },

  // ------------------------------ Engagement Management Permissions ------------------------------
  { name: "View Engagement Dashboard", permission: "engagement-view" },
  { name: "Engagement Permission Dashboard", permission: "engagement-manage" },

  // ------------------------------ Employee Management Permissions ------------------------------
  { name: "Employee Management Main Dashboard", permission: "employee-main" },
  {
    name: "Super Admin Add Employee (All Permissions)",
    permission: "employee-create-super",
  },
  {
    name: "Manager Add Employee (Limited Permissions)",
    permission: "employee-create-manager",
  },
  {
    name: "See All Subordinate Employees",
    permission: "employee-view-subordinate",
  },
  {
    name: "Change Subordinate Employee Status (Active/Inactive)",
    permission: "employee-status-subordinate",
  },
  { name: "View Subordinate Employee", permission: "employee-view-only" },
  {
    name: "Update Subordinate Employee",
    permission: "employee-update-subordinate",
  },
  {
    name: "Delete Subordinate Employee",
    permission: "employee-delete-subordinate",
  },
  {
    name: "Super Admin Manage Any Employee (View, Update, Delete, Status)",
    permission: "employee-manage-super",
  },

  // ------------------------------ Asset Management Permissions ------------------------------
  { name: "Asset Management", permission: "asset-manage" },

  // ------------------------------ Disciplinary Actions Permissions ------------------------------
  { name: "Take Disciplinary Actions", permission: "disciplinary-create" },
  { name: "View Disciplinary Actions", permission: "disciplinary-view" },

  // ------------------------------ Attendance ------------------------------
  {
    name: "Attendance Management Main Dashboard",
    permission: "attendance-main",
  },
  {
    name: "View Subordinates' Attendance",
    permission: "attendance-view-subordinate",
  },
  { name: "View Own Attendance", permission: "attendance-view-own" },
  {
    name: "SuperAdmin View All Employee Attendance",
    permission: "attendance-view-all",
  },
  {
    name: "Request Hike, Advance, Loan, Reimbursement",
    permission: "employee-request-financial",
  },

  // ------------------------------ Ticket Management Permissions ------------------------------
  {
    name: "Manage Tickets Within Own Department",
    permission: "ticket-manage-department",
  },
  { name: "Raise Ticket", permission: "ticket-create" },
  {
    name: "SuperAdmin Manage Tickets (Any Department)",
    permission: "ticket-manage-all",
  },
  { name: "Manage POSH Tickets", permission: "ticket-manage-posh" },
  { name: "File POSH Tickets", permission: "ticket-create-posh" },

  // ------------------------------ Payroll Management Permissions ------------------------------
  { name: "Payroll Management Main Dashboard", permission: "payroll-main" },
  {
    name: "Manage Payroll Calculations ",
    permission: "payroll-manage-calculations",
  },
  {
    name: "Manage Claims Request like Hike Advance Reimbursement loan etc",
    permission: "payroll-manage-claims",
  },

  // ------------------------------ Task Management Permissions ------------------------------
  { name: "Main Task Dashboard", permission: "task-main" },
  {
    name: "Update Own Assigned Daily Task Created By TL/Manager",
    permission: "update-own-task-daily",
  },
  {
    name: "Task Assignment Manager assign Task to Subordinates",
    permission: "task-assign-subordinates",
  },
  { name: "View Own Assigned Task ", permission: "view-own-assigned-task" },
  {
    name: "View Daily All Assigned Task To Subordinates",
    permission: "view-daily-subordinates-task",
  },

  // ------------------------------ Recruit Management Permissions ------------------------------
  { name: "Recruit Management Main Dashboard", permission: "recruit-main" },
  { name: "View/Refer All Vacancies", permission: "recruit-view-vacancies" },
  { name: "Create Job Posting", permission: "recruit-create-job" },
  { name: "HR View All Referrals", permission: "recruit-view-referrals" },
  {
    name: "HR Manage Vacancies (Budget, Status, etc.)",
    permission: "recruit-manage-vacancies",
  },

  // ------------------------------ Performance Management Permissions ------------------------------
  {
    name: "Performance Management Main Dashboard",
    permission: "performance-main",
  },
  { name: "Post Top Performer", permission: "post-top-performer" },
  { name: "View Top Performers", permission: "view-top-performers" },
  { name: "Set KPIs", permission: "performance-set-kpis" },
  {
    name: "Rate Subordinate Employees",
    permission: "performance-rate-subordinate",
  },
  {
    name: "SuperAdmin View All Employee Ratings",
    permission: "view-all-employee-rating",
  },

  // ------------------------------ Performance Management & KPI quantitative-qualitative Permissions ------------------------------

  {
    name: "Set KPIs Quantitative-Qualitative",
    permission: "set-kpis-quantitative-qualitative",
  },
  {
    name: "Rate Team Members Quantitative-Qualitative & Bulk Upload",
    permission: "rate-team-members-quantitative-qualitative",
  },
  {
    name: "Team Members Performance Dashboard According To Quantitative-Qualitative",
    permission: "team-members-performance-quantitative-qualitative",
  },
  {
    name: "Employee Can See Own Performance Dashboard According To Quantitative-Qualitative",
    permission: "own-performance-quantitative-qualitative",
  },
  {
    name: "All Employes Ratings Dashboard According To Quantitative-Qualitative",
    permission: "view-all-employee-rating-quantitative-qualitative",
  },

  // ------------------------------ RACI Management Permissions ------------------------------
  { name: "RACI Management Main Dashboard", permission: "raci-main" },
  { name: "RACI Business", permission: "raci-business" },
  { name: "RACI Operations", permission: "raci-operations" },

  // ------------------------------ Company Settings Management Permissions ------------------------------
  { name: "Add/Update Company Info", permission: "company-info" },
  {
    name: "Add/Update Company Settings (Policies, Shifts, etc.)",
    permission: "company-settings",
  },
  {
    name: "Add Hierarchy (Department, Designation, Role)",
    permission: "company-hierarchy",
  },
  { name: "Add/Update Company Policies", permission: "company-policies" },
  { name: "Add/Update Induction", permission: "company-induction" },
  { name: "Add/Update Break Settings", permission: "company-break-settings" },

  // ------------------------------ Productivity Lenses ------------------------------
  {
    name: "Productivity Lenses Main Dashboard",
    permission: "productivity-main",
  },
  { name: "Productivity Dashboard", permission: "productivity-dashboard" },
  { name: "Team Productivity", permission: "productivity-team" },

  // ------------------------------ Chat Management Permissions ------------------------------
  { name: "Chats", permission: "chat-user" },

  // ------------------------------ Leave Management Permissions ------------------------------
  { name: "Apply Leave and Track Status", permission: "leave-apply" },
  { name: "Manage Subordinate Leaves", permission: "leave-manage-subordinate" },
  { name: "SuperAdmin View All Employee Leaves", permission: "leave-view-all" },

  // ------------------------------ Resignation & FNF ------------------------------
  {
    name: "Resignation Management Main Dashboard",
    permission: "resignation-main",
  },
  {
    name: "Submit Own Resignation & Track Status",
    permission: "resignation-submit",
  },
  {
    name: "Approve/Reject Employee Resignations",
    permission: "resignation-manage",
  },
  {
    name: "HR Approve FNF After Resignation",
    permission: "resignation-fnf-approve",
  },

  // ------------------------------ Training & Policies ------------------------------
  { name: "Manage Training Materials", permission: "training-manage" },
  { name: "View Training Material", permission: "training-view" },
  { name: "View Induction PPTs", permission: "induction-view" },
  { name: "View Company Policies", permission: "policies-view" },
  { name: "User Profile", permission: "profile-view" },

  // ------------------------------ Organization Chart ------------------------------
  { name: "Organization Chart", permission: "organization-chart" },
];

const availablePermissionManager = [
  // ------------------------------ Dashboard Permissions ------------------------------
  { name: "Employee Dashboard", permission: "dashboard-employee" },

  // ------------------------------ Announcement Management Permissions ------------------------------
  { name: "Post Announcement", permission: "announcement-create" },
  { name: "View Announcements", permission: "announcement-view" },

  // ------------------------------ Engagement Management Permissions ------------------------------
  { name: "View Engagement Dashboard", permission: "engagement-view" },
  { name: "Engagement Permission Dashboard", permission: "engagement-manage" },

  // ------------------------------ Employee Management Permissions ------------------------------
  { name: "Employee Management Main Dashboard", permission: "employee-main" },
  {
    name: "Super Admin Add Employee (All Permissions)",
    permission: "employee-create-super",
  },
  {
    name: "Manager Add Employee (Limited Permissions)",
    permission: "employee-create-manager",
  },
  {
    name: "See All Subordinate Employees",
    permission: "employee-view-subordinate",
  },
  { name: "View Subordinate Employee", permission: "employee-view-only" },

  // ------------------------------ Asset Management Permissions ------------------------------
  { name: "Asset Management", permission: "asset-manage" },

  // ------------------------------ Disciplinary Actions Permissions ------------------------------
  { name: "Take Disciplinary Actions", permission: "disciplinary-create" },
  { name: "View Disciplinary Actions", permission: "disciplinary-view" },

  // ------------------------------ Attendance ------------------------------
  {
    name: "Attendance Management Main Dashboard",
    permission: "attendance-main",
  },
  {
    name: "View Subordinates' Attendance",
    permission: "attendance-view-subordinate",
  },
  { name: "View Own Attendance", permission: "attendance-view-own" },
  {
    name: "SuperAdmin View All Employee Attendance",
    permission: "attendance-view-all",
  },
  {
    name: "Request Hike, Advance, Loan, Reimbursement",
    permission: "employee-request-financial",
  },

  // ------------------------------ Ticket Management Permissions ------------------------------
  {
    name: "Manage Tickets Within Own Department",
    permission: "ticket-manage-department",
  },
  { name: "Raise Ticket", permission: "ticket-create" },
  {
    name: "SuperAdmin Manage Tickets (Any Department)",
    permission: "ticket-manage-all",
  },
  { name: "Manage POSH Tickets", permission: "ticket-manage-posh" },
  { name: "File POSH Tickets", permission: "ticket-create-posh" },

  // ------------------------------ Payroll Management Permissions ------------------------------
  { name: "Payroll Management Main Dashboard", permission: "payroll-main" },
  {
    name: "Manage Payroll Calculations ",
    permission: "payroll-manage-calculations",
  },
  {
    name: "Manage Claims Request like Hike Advance Reimbursement loan etc",
    permission: "payroll-manage-claims",
  },

  // ------------------------------ Task Management Permissions ------------------------------
  { name: "Main Task Dashboard", permission: "task-main" },
  {
    name: "Update Own Assigned Daily Task Created By TL/Manager",
    permission: "update-own-task-daily",
  },
  {
    name: "Task Assignment Manager assign Task to Subordinates",
    permission: "task-assign-subordinates",
  },
  { name: "View Own Assigned Task ", permission: "view-own-assigned-task" },
  {
    name: "View Daily All Assigned Task To Subordinates",
    permission: "view-daily-subordinates-task",
  },

  // ------------------------------ Recruit Management Permissions ------------------------------
  { name: "Recruit Management Main Dashboard", permission: "recruit-main" },
  { name: "View/Refer All Vacancies", permission: "recruit-view-vacancies" },
  { name: "Create Job Posting", permission: "recruit-create-job" },
  { name: "HR View All Referrals", permission: "recruit-view-referrals" },
  {
    name: "HR Manage Vacancies (Budget, Status, etc.)",
    permission: "recruit-manage-vacancies",
  },

  // ------------------------------ Performance Management Permissions ------------------------------
  {
    name: "Performance Management Main Dashboard",
    permission: "performance-main",
  },
  { name: "Post Top Performer", permission: "post-top-performer" },
  { name: "View Top Performers", permission: "view-top-performers" },
  { name: "Set KPIs", permission: "performance-set-kpis" },
  {
    name: "Rate Subordinate Employees",
    permission: "performance-rate-subordinate",
  },
  {
    name: "SuperAdmin View All Employee Ratings",
    permission: "view-all-employee-rating",
  },

  // ------------------------------ Performance Management & KPI quantitative-qualitative Permissions ------------------------------

  {
    name: "Set KPIs Quantitative-Qualitative",
    permission: "set-kpis-quantitative-qualitative",
  },
  {
    name: "Rate Team Members Quantitative-Qualitative & Bulk Upload",
    permission: "rate-team-members-quantitative-qualitative",
  },
  {
    name: "Team Members Performance Dashboard According To Quantitative-Qualitative",
    permission: "team-members-performance-quantitative-qualitative",
  },
  {
    name: "Employee Can See Own Performance Dashboard According To Quantitative-Qualitative",
    permission: "own-performance-quantitative-qualitative",
  },
  
  // ------------------------------ RACI Management Permissions ------------------------------
  { name: "RACI Management Main Dashboard", permission: "raci-main" },
  { name: "RACI Business", permission: "raci-business" },
  { name: "RACI Operations", permission: "raci-operations" },

  // ------------------------------ Company Settings Management Permissions ------------------------------
  { name: "Add/Update Company Info", permission: "company-info" },
  {
    name: "Add/Update Company Settings (Policies, Shifts, etc.)",
    permission: "company-settings",
  },
  {
    name: "Add Hierarchy (Department, Designation, Role)",
    permission: "company-hierarchy",
  },
  { name: "Add/Update Company Policies", permission: "company-policies" },
  { name: "Add/Update Induction", permission: "company-induction" },
  { name: "Add/Update Break Settings", permission: "company-break-settings" },

  // ------------------------------ Productivity Lenses ------------------------------
  {
    name: "Productivity Lenses Main Dashboard",
    permission: "productivity-main",
  },
  { name: "Productivity Dashboard", permission: "productivity-dashboard" },
  { name: "Team Productivity", permission: "productivity-team" },

  // ------------------------------ Chat Management Permissions ------------------------------
  { name: "Chats", permission: "chat-user" },

  // ------------------------------ Leave Management Permissions ------------------------------
  { name: "Apply Leave and Track Status", permission: "leave-apply" },
  { name: "Manage Subordinate Leaves", permission: "leave-manage-subordinate" },
  { name: "SuperAdmin View All Employee Leaves", permission: "leave-view-all" },

  // ------------------------------ Resignation & FNF ------------------------------
  {
    name: "Resignation Management Main Dashboard",
    permission: "resignation-main",
  },
  {
    name: "Submit Own Resignation & Track Status",
    permission: "resignation-submit",
  },
  {
    name: "Approve/Reject Employee Resignations",
    permission: "resignation-manage",
  },
  {
    name: "HR Approve FNF After Resignation",
    permission: "resignation-fnf-approve",
  },

  // ------------------------------ Training & Policies ------------------------------
  { name: "Manage Training Materials", permission: "training-manage" },
  { name: "View Training Material", permission: "training-view" },
  { name: "View Induction PPTs", permission: "induction-view" },
  { name: "View Company Policies", permission: "policies-view" },
  { name: "User Profile", permission: "profile-view" },
  {name: "geo-location-all-worker", permission: "geo-location-all-worker"},
  {name: "geo-location-single-worker", permission: "geo-location-single-worker"},

  // ------------------------------ Organization Chart ------------------------------
  { name: "Organization Chart", permission: "organization-chart" },

  // ------------------------------ geolocation ------------------------------


  //  { name: "Geolocation Panel", permission: "access-geolocation-panel" },

   { name: "Geolocation Panel", permission: "geolocation-all-permission" },



];

export { availablePermission, availablePermissionManager };
