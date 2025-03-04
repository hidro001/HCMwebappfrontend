const availablePermission = [
  // ------------------------------ Dashboard Permissions ------------------------------
  { name: "Super Admin Dashboard", permission: "SuperDashboard" },
  { name: "Employee Dashboard", permission: "employeeDashboard" },

  // ------------------------------ Announcement Management Permissions ------------------------------

  { name: "Post Announcement", permission: "AddAnnouncement" },
  { name: "View Announcements", permission: "ViewAnnouncement" },

  // ------------------------------ Engagement Management Permissions ------------------------------

  { name: "View Engagement Dashboard", permission: "engagement" },
  { name: "Engagement Permission Dashboard", permission: "engagementManager" },

  // ------------------------------ Employee Management Permissions ------------------------------

  {
    name: "Employee Management Main Dashboard",
    permission: "mainmanageemployees",
  },
  {
    name: "Super Admin Add Employee Have AlL Permission",
    permission: "addEmployeeAdmin",
  },

  {
    name: "Manager Add Employee Have Limited Permisiions ",
    permission: "addEmployeeManager",
  },
  { name: "See All Subordinate Employess ", permission: "updateEmployeeAdmin" },

  {
    name: "Give Permission To Change Subordinate Employeee Status (active/inactive)",
    permission: "active/InactiveEmployeeAdmin",
  },
  {
    name: "Give Permission To View Subordinate Employee ",
    permission: "OnlyEmployeeView",
  },
  {
    name: "Give Permission To Update Subordinate Employee",
    permission: "updateEmployeeManager",
  },
  {
    name: "Give Permission To Delete Subordinate Employeee",
    permission: "deleteEmployeeAdmin",
  },
  {
    name: "Super Admin See All Employess and Update,delete,change status,delete of any employee",
    permission: "updateEmployeeSuperAdmin",
  },

  // ------------------------------ Asset Management Permissions ------------------------------
  { name: "Asset Management", permission: "assignAssets" },

  //Disciplinary Actions Permissions
  { name: "Take Disciplinary actions", permission: "takeDisciplinaryAction" },
  { name: "All disciplinary actions", permission: "viewDisciplinaryAction" },

  // ------------------------------ Attendance ------------------------------
  {
    name: "Attendance Management Main Dashboard",
    permission: "MainAttendance",
  },
  {
    name: "View Subordinates Employess Attendance",
    permission: "viewAttendance",
  },
  { name: "View Own Attendance", permission: "myAttendance" },
  {
    name: "Superadmin View All Employee Attendance",
    permission: "viewallAttendance",
  },
  {
    name: "Employee Can Request Hike, Advance, Loan, Reimbursement",
    permission: "requestHikeAdvanceReimbursement",
  },

  // ------------------------------ Issue Management Permissions ------------------------------
  {
    name: "Managed Raised Ticket Own Department",
    permission: "manageIssuesAdmin",
  },
  { name: "Raise Ticket Permission", permission: "getSupport" },
  {
    name: "SuperAdmin View All Raised Tickets Any Department",
    permission: "IssueManagementSuperAdmin",
  },
  { name: "Managed Raised POSH Tickets", permission: "poshManager" },
  { name: "Permission To File POSH ", permission: "poshEmployee" },

  // ------------------------------ Payroll Management Permissions ------------------------------
  { name: "Payroll Management", permission: "payrollMain" },
  { name: "Manage Payroll", permission: "payrollManage" },
  { name: "Manage Claims", permission: "payrollManageClaims" },

  //----------------------------- Task Management Permissions ------------------------------
  { name: "Main Task Dashboard", permission: "ViewTaskManager" },
  { name: "Update Daily Task", permission: "updateTask" },
  { name: "Task Assignment Manager", permission: "ActionTrackerManager" },
  { name: "Assigned Task", permission: "ViewTaskManagerEmployee" },
  { name: "Daily Task", permission: "ActionTrackerManagerDaily" },

  //----------------------------- Recruit Management Permissions ------------------------------
  {
    name: "Recruit Management Main Dashboard",
    permission: "MainRecruitManagement",
  },
  {
    name: "View All Created Vacancies For All Employess and Also Can Reffer",
    permission: "viewVacancies",
  },
  { name: "Create Job Posting", permission: "jobPostingAdmin" },
  { name: "HR View All Referral Vancies", permission: "HRreferralDashboard" },
  {
    name: "HR View All Created Vancies And Assign Budget Update Statues Etc",
    permission: "HRDashboardVacancies",
  },



  //----------------------------- Performance Management Permissions ------------------------------
  {
    name: "Performance Management Main Dashboard",
    permission: "MainPerformanceManagement",
  },
  { name: "Post Top Performer Employee", permission: "postTopPerformer" },
  {
    name: "View Top Performers Employes",
    permission: "viewTopPerformers",
  },
  { name: "Set KPIs For Performance", permission: "setKPIs" },
  { name: "Rate Subordinate Employess According to Performance ", permission: "rateSubordinate" },
  { name: "SuperAdmin View All Employee Ratings", permission: "viewAllEmployeeRatings" },


  //----------------------------- RACI Management Permissions ------------------------------
  { name: "RACI Management Main Dashboard", permission: "RaciMain" },
  { name: "RACI Business", permission: "Raci2" },
  { name: "RACI Operations", permission: "superAdminRaci" },



  { name: "Add Company Info (Address,Branch,logo,p.no etc )", permission: "companyInfo" },
  { name: "Add Company Settings (Attendance Plocies,shift timing,Holiday,Payroll Cycle etc )", permission: "CompanySettings" },
  { name: "Add Hierarchy (", permission: "addRole" },
  { name: "Update Policies", permission: "PolicySystem" },
  { name: "Update Induction", permission: "postInduction" },
  { name: "Break Settings", permission: "addBreak" },
  { name: "Chats", permission: "useChats" },
  { name: "Leave History", permission: "viewLeaves" },
  { name: "Manage Leaves", permission: "acceptandrejectleave" },
  { name: "Resignation History", permission: "viewAllResignation" },
  { name: "Submit Resignation", permission: "employeeResignationDashboard" },
  { name: "Resignation Approvals", permission: "hrResignationDashboard" },
  { name: "HR FNF Approvals", permission: "FNFAprroval" },
  { name: "Training Material", permission: "trainingMaterial" },
  { name: "User Profile", permission: "viewProfile" },
  { name: "Induction PPT's", permission: "inductionPPT" },
  { name: "Company Policies", permission: "companyPolicies" },
  { name: "Admin Panel Training", permission: "adminPanelTraining" },

  { name: "Organization Chart", permission: "organizationChart" },
  { name: "Vacancies List", permission: "HRDashboardVacancies" },

  // -- Newly added items (12) from availablePermissionManager that weren't in availablePermission --
  {
    name: "Manager Dashboard",
    permission: "managerDashboard",
  },
  {
    name: "View Policies",
    permission: "viewPolicies",
  },
  {
    name: "View Orientation",
    permission: "viewInduction",
  },

  {
    name: "View Employee",
    permission: "viewEmployeeAdmin",
  },
  {
    name: "Job Management",
    permission: "jobVacancyAdmin",
  },
  {
    name: "View Task Assigned",
    permission: "actionTracker",
  },
  {
    name: "Apply Leave Employee",
    permission: "applyLeaves",
  },
  {
    name: "View Subordinate Ratings",
    permission: "viewSubordinateRatings",
  },

  {
    name: "Submit Resignation",
    permission: "submitResignation",
  },
  {
    name: "Employee Referral Dashboard",
    permission: "EmployeereferralDashboard",
  },
  {
    name: "All Dashlets",
    permission: "superAdminRaciAllDashlets",
  },
  {
    name: "Only Employee View",
    permission: "OnlyEmployeeView",
  },
];

const availablePermissionManager = [
  { name: "Manager Dashboard", permission: "managerDashboard" },
  { name: "Employee Dashboard", permission: "employeeDashboard" },
  { name: "View Policies", permission: "viewPolicies" },
  { name: "Update Policies", permission: "PolicySystem" },
  { name: "Post Orientation", permission: "postInduction" },
  { name: "View Orientation", permission: "viewInduction" },
  { name: "Manager Add Employee", permission: "addEmployeeManager" },
  { name: "Manager Update Employee", permission: "updateEmployeeManager" },
  { name: "View Employee", permission: "viewEmployeeAdmin" },
  {
    name: "Active/Inactive Employee",
    permission: "active/InactiveEmployeeAdmin",
  },
  { name: "Organization Chart", permission: "organizationChart" },
  { name: "View Daily Tasks", permission: "ViewTaskManager" },
  { name: "Update Daily Tasks", permission: "updateTask" },
  { name: "Job Posting", permission: "jobPostingAdmin" },
  { name: "Job Management", permission: "jobVacancyAdmin" },
  { name: "View Job Vacanies", permission: "viewVacancies" },
  { name: "Raise A Issue", permission: "getSupport" },
  { name: "Issues Management", permission: "manageIssuesAdmin" },
  { name: "Assign Task", permission: "ActionTrackerManager" },
  { name: "View Task Assigned", permission: "actionTracker" },
  { name: "RACI Business", permission: "Raci2" },
  { name: "RACI OPS", permission: "superAdminRaci" },
  { name: "Payroll Management", permission: "payroll" },
  { name: "View My Profile", permission: "viewProfile" },
  { name: "Post Announcement", permission: "AddAnnouncement" },
  { name: "View Attendance & Payroll", permission: "myAttendance" },
  { name: "Training Material", permission: "trainingMaterial" },
  { name: "Apply Leave Employee", permission: "applyLeaves" },
  { name: "Apply Leave Manager", permission: "acceptandrejectleave" },
  { name: "Employee Leave History", permission: "viewLeaves" },
  { name: "Attendance View", permission: "viewAttendance" },
  // { name: "All Employes", permission: "updateEmployeeSuperAdmin" },
  { name: "Rate Subordinate", permission: "rateSubordinate" },
  { name: "View Subordinate Ratings", permission: "viewSubordinateRatings" },
  { name: "All Employes Rating", permission: "viewAllEmployeeRatings" },
  { name: "Post Top Performer", permission: "postTopPerformer" },
  { name: "View Top Performers Employes", permission: "viewTopPerformers" },
  { name: "Set KPIs", permission: "setKPIs" },
  { name: "Asset", permission: "assignAssets" },
  { name: "Submit Resignation", permission: "submitResignation" },
  { name: "Resignation Dashboard", permission: "employeeResignationDashboard" },
  { name: "Resignation Approvals", permission: "hrResignationDashboard" },
  { name: "HR FNF Approvals", permission: "FNFAprroval" },
  { name: "All Resignation History", permission: "viewAllResignation" },
  { name: "POSH Employee", permission: "poshEmployee" },
  { name: "POSH Manager", permission: "poshManager" },
  { name: "HR Referral Dashboard", permission: "HRreferralDashboard" },
  {
    name: "Employee Referral Dashboard",
    permission: "EmployeereferralDashboard",
  },
];

export { availablePermission, availablePermissionManager };
