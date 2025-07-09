// import { createBrowserRouter } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";

// import {
//   Login,
//   Dashboard,
//   Page404,
//   AddEmployeePage,
//   UpdateEmployeePage,
//   ViewEmployeePage,
//   SubordinatesEmployessPage,
//   AssignAssetsPage,
//   AllEmployessPage,
//   ManageTicketsPage,
//   RaiseTicketsPage,
//   AllTicketsPage,
//   FilePoshPage,
//   PoshManagePage,
//   FeedPage,
//   EngPermissionDashboardPage,
//   EmployessMainPage,
//   AttendanceDashboardPage,
//   SubordinatesAttendancePage,
//   EmployeeFullAttendancePage,
//   OwmFullAttendancePage,
//   AllEmployeeAttendancePage,
//   RecruitDashboardPage,
//   AllVacanciesPage,
//   CreateVacancyPage,
//   ReferralListPage,
//   VacanciesListPage,
//   EmployeeResignationHistoryPage,
//   CompanyInfoPage,
//   CompanySettingPage,
//   MainPage,
//   ManagePayrollPage,
//   ManageClaimsPage,
//   //
//   TaskMainPage,
//   ViewDailyTaskPage,
//   AssignedTaskPage,
//   AddHierarchyPage,
//   CompanyPoliciesPage,
//   CompanyInductionPage,
//   BreakSettingsPage,
//   PerformanceManagementDashboardPage,
//   // PostAndViewPerformersPage,
//   SetKpiForDesignationPage,
//   TeamsPerformancePage,
//   AllEmpRatingsPage,
//   RaciDashboardPage,
//   RaciBusinessPage,
//   RaciOperationsPage,
//   SuperAdminDashboardPage,
//   EmployeeDashboardPage,
//   ChatPage,
//   EmployeeLeaveHistoryPage,
//   AssignedTaskEmployeePage,
//   ManageLeavesPage,
//   AllLeavePage,
//   SubmitResignationPage,
//   FNFApprovalPage,
//   ResignationApprovalPage,
//   AllDashletsPage,
//   MyProfilePage,
//   ProductivityDashboardPage,
//   MainDashboardPage,
//   TeamProductivityPage,
//   AllDisciplinaryActionsPage,
//   UsersListForDisciplinaryPage,
//   UpdateEmployeeManagerPage,
//   AddEmployeeManagerPage,
//   CompanyPoliciesViewPage,
//   CompanyInductionViewPage,
//   TrainingMaterialsPage,
//   AdminPanelTrainingPage,
//   EmployeeTreemapPage,
//   RequestDashboardPage,
//   PostPerformerPage,
//   ViewPerformerPage,
//   SetKpisNewPage,
//   RatingDashboardPage,
//   EmployeeRatingAdvancedPage,
//   MyPerformanceAdvancedPage,
//   TeamRatingsAdvancedPage,
//   AllEmployeeRatingsPage,
//   SetKpisNewPageRazor,
//   RatingDashboardPageRazor,
//   EmployeeRatingAdvancedPageRazor,
//   MyPerformanceAdvancedPageRazor,
//   TeamRatingsAdvancedPageRazor,
//   AllEmployeeRatingsPageRazor,
//   ManagerDashboardPage,
//   SuperAdminDashboardAnlyticsPage,
// } from "../pages";
// import EmployeeFullStatisticsPage from "../pages/attendence management/EmployeeFullStatisticsPage";
// import MainLayout from "./MainLayout";
// import { helpConfigs } from "../config/HelpConfig";

// import {
//   Footer,
//   ResetPassword,
//   MakeAnnouncement,
//   ViewAnnouncements,
//   NotificationsPage,
// } from "../components";
// import DailyTaskPage from "../pages/task/DailyTaskPage";
// import EmployeeDailyStats from "../components/attendence management/EmployeeDailyStats";
// import GeolocationPage from "../pages/geolocation/GeolocationPage";
// import FiledworkerPage from "../pages/geolocation/FiledworkerPage";
// import ProductivityLensAll from "../components/product-lense/ProductivityLensAll";
// import SubordinateProductivityLens from "../components/product-lense/SubordinateProductivityLens";
// import EmployeeTicketsPage from "../components/tickets Management/EmployeeTicketsPage";
// import IndividualAssignedTasks from "../components/task/assigned-task/IndividualAssignedTasks";
// import EmployeeDailyTaskDetail from "../components/task/daily-task/EmployeeDailyTaskDetail";
// import EmployeeDetails from "../components/payroll/manage-payroll/EmployeePayrollDetails";
// import EmployeeIndividualRatings from "../components/performance management new/EmployeeIndividualRating";
// import AddNewEmployeePage from "../pages/emp-registration/add-new-employee/AddNewEmployeePage";
// import SetPassword from "../pages/emp-registration/SetPassword";
// import EditRestDetailPage from "../pages/emp-registration/edit-rest-detail/EditRestDetailPage";
// import ReviewEmployeePage from "../pages/emp-registration/emp-review/ReviewEmployeePage";
// import ManagerTabOverview from "../pages/emp-registration/emp-review/manager-tabs/ManagerTabOverview";
// import SuperAdminRegistration from "../components/SuperAdminRegistration/SuperAdminRegistration";
// import RegistrationLogin from "../pages/emp-registration/RegistrationLogin";

// const router = createBrowserRouter([
//   {
//     path: "/super-admin-registration",
//     element: <SuperAdminRegistration />,
//   },
//   {
//     path: "/reset-password/:resetToken",
//     element: <ResetPassword />,
//   },
//   {
//     path: "/registration/set-password/v2/:token",
//     element: <SetPassword />,
//   },
//    {
//     path: "/registration/login",
//     element: <RegistrationLogin />,
//   },

//    {
//         path: "registration/edit-rest-detail",
//         element: <EditRestDetailPage />,
//       },
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <MainLayout>
//         <PrivateRoute requiredPermissions={[]} />
//       </MainLayout>
//     ),
//     children: [
//       {
//         path: "super-employee-dashboard",
//         element: <SuperAdminDashboardPage />,
//       },
//       {
//         path: "employee",
//         element: <EmployeeDashboardPage />,
//       },
//       {
//         path: "notifications",
//         element: <NotificationsPage />,
//       },
//       {
//         path: "add-announcement",
//         element: <MakeAnnouncement />,
//       },
//       {
//         path: "view-announcement",
//         element: <ViewAnnouncements />,
//       },
//       {
//         path: "employee-particular-tasks/:employeeId",
//         element: <EmployeeDailyTaskDetail />,
//       },

//       {
//         path: "engagement-feed",
//         element: <FeedPage />,
//       },
//       {
//         path: "engagement-permission-dashboard",
//         element: <EngPermissionDashboardPage />,
//       },
//       {
//         path: "payroll/employee/:employeeId",
//         element: <EmployeeDetails />,
//       },

//       {
//         path: "manage-tickets",
//         element: <ManageTicketsPage />,
//         handle: { helpKey: "ManageTickets" },
//       },
//       {
//         path: "all-tickets",
//         element: <AllTicketsPage />,
//         handle: { helpKey: "AllTickets" },
//       },
//       {
//         path: "raise-ticket",
//         element: <RaiseTicketsPage />,
//         handle: { helpKey: "RaiseTickets" },
//       },
//       {
//         path: "posh-manage",
//         element: <PoshManagePage />,
//       },
//       {
//         path: "File-Posh",
//         element: <FilePoshPage />,
//       },
//       {
//         path: "employees/management",
//         element: <EmployessMainPage />,
//       },
//       {
//         path: "add-employee",
//         element: <AddEmployeePage />,
//       },
//       {
//         path: "add-employee-manager",
//         element: <AddEmployeeManagerPage />,
//       },
//       {
//         path: "supordinates-employees",
//         element: <SubordinatesEmployessPage />,
//       },
//       {
//         path: "update-employee/:id",
//         element: <UpdateEmployeePage />,
//       },
//       {
//         path: "update-employee-manager/:id",
//         element: <UpdateEmployeeManagerPage />,
//       },
//       {
//         path: "employees/details/:id",
//         element: <ViewEmployeePage />,
//       },
//       {
//         path: "assign-assets",
//         element: <AssignAssetsPage />,
//       },
//       {
//         path: "all-employess",
//         element: <AllEmployessPage />,
//       },
//       {
//          path: "payroll-main",
//         element: <MainPage />,
//       },
//       {
//         path: "manage-payroll",
//         element: <ManagePayrollPage />,
//       },
//       {
//         path: "manage-claims",
//         element: <ManageClaimsPage />,
//       },

//       {
//         path: "attendance-dashboard",
//         element: <AttendanceDashboardPage />,
//       },
//       {
//         path: "subordinates-attendance",
//         element: <SubordinatesAttendancePage />,
//       },
//       {
//         path: "attendance/:empID",
//         element: <EmployeeFullAttendancePage />,
//       },
//       {
//         path: "statistics/:empID",
//         element: <EmployeeFullStatisticsPage />,
//       },
//       {
//         path: "all-employee-productivity",
//         element: <ProductivityLensAll />,
//       },
//       {
//         path: "subordinate-productivity",
//         element: <SubordinateProductivityLens />,
//       },

//       {
//         // NEW ROUTE to handle /dashboard/statistics/EMP_ID/DATE
//         path: "statistics/:empID/:date",
//         element: <EmployeeDailyStats />,
//       },
//       {
//         path: "view-attendance",
//         element: <OwmFullAttendancePage />,
//       },
//       {
//         path: "all-employee-attendance",
//         element: <AllEmployeeAttendancePage />,
//       },
//       {
//         path: "recruitment-main",
//         element: <RecruitDashboardPage />,
//       },
//       {
//         path: "all-vacancies",
//         element: <AllVacanciesPage />,
//       },
//       {
//         path: "create-vacancies",
//         element: <CreateVacancyPage />,
//       },
//       {
//         path: "referral-list",
//         element: <ReferralListPage />,
//       },
//       {
//         path: "employee-tickets/:employeeId",
//         element: <EmployeeTicketsPage />,
//       },

//       {
//         path: "vancancies-list",
//         element: <VacanciesListPage />,
//       },
//       {
//         path: "employee-resignation-history",
//         element: <EmployeeResignationHistoryPage />,
//       },
//       // asdasfsfdsdsf
//       {
//         path: "submit-resignation",
//         element: <SubmitResignationPage />,
//       },
//       {
//         path: "resignation-approvals",
//         element: <ResignationApprovalPage />,
//       },
//       {
//         path: "fnf-request-hr",
//         element: <FNFApprovalPage />,
//       },

//       // sdgdfgdfgdfhdfhdh
//       {
//         path: "company-info",
//         element: <CompanyInfoPage />,
//       },

//       // task route

//       {
//         path: "main-task",
//         element: <TaskMainPage />,
//       },
//       {
//         path: "view-daily-task",
//         element: <ViewDailyTaskPage />,
//       },
//       {
//         path: "assigned-task",
//         element: <AssignedTaskPage />,
//       },
//       {
//         path: "employee-tasks/:employeeId",
//         element: <IndividualAssignedTasks />,
//       },
//       {
//         path: "assigned-task/employee",
//         element: <AssignedTaskEmployeePage />,
//       },
//       {
//         path: "employee/:employeeId/ratings",
//         element: <EmployeeIndividualRatings />,
//       },

//       {
//         path: "daily-task",
//         element: <DailyTaskPage />,
//       },
//       {
//         path: "company-settings",
//         element: <CompanySettingPage />,
//       },
//       {
//         path: "add-hierarchy",
//         element: <AddHierarchyPage />,
//       },
//       {
//         path: "update-policies",
//         element: <CompanyPoliciesPage />,
//       },
//       {
//         path: "post-induction",
//         element: <CompanyInductionPage />,
//       },
//       {
//         path: "break-settings",
//         element: <BreakSettingsPage />,
//       },
//       {
//         path: "performance-dashboard",
//         element: <PerformanceManagementDashboardPage />,
//       },
//       {
//         path: "top-performers",
//         element: <ViewPerformerPage />,
//       },
//       {
//         path: "set-kpis",
//         element: <SetKpiForDesignationPage />,
//       },
//       {
//         path: "team-performance",
//         element: <TeamsPerformancePage />,
//       },
//       {
//         path: "post-top-performers",
//         element: <PostPerformerPage />,
//       },
//       {
//         path: "all-emp-ratings",
//         element: <AllEmpRatingsPage />,
//       },
//       {
//         path: "raci-dashboard",
//         element: <RaciDashboardPage />,
//       },
//       {
//         path: "raci-business",
//         element: <RaciBusinessPage />,
//       },
//       {
//         path: "raci-operations",
//         element: <RaciOperationsPage />,
//         // chat
//       },
//       {
//         path: "chats",
//         element: <ChatPage />,
//       },
//       {
//         path: "leave-history",
//         element: <EmployeeLeaveHistoryPage />,
//       },
//       {
//         path: "manage-leave-history",
//         element: <ManageLeavesPage />,
//       },
//       {
//         path: "all-leave-history",
//         element: <AllLeavePage />,
//       },
//       {
//         path: "all-dashlets",
//         element: <AllDashletsPage />,
//       },
//       // product lense
//       {
//         path: "main-dashboard",
//         element: <MainDashboardPage />,
//       },
//       {
//         path: "productivity-dashboard",
//         element: <ProductivityDashboardPage />,
//       },
//       {
//         path: "team-productivity",
//         element: <TeamProductivityPage />,
//       },
//       // myprofile
//       {
//         path: "my-profile",
//         element: <MyProfilePage />,
//       },
//       {
//         path: "disciplinary-actions/all-users",
//         element: <UsersListForDisciplinaryPage />,
//       },
//       {
//         path: "disciplinary-actions",
//         element: <AllDisciplinaryActionsPage />,
//       },
//       {
//         path: "induction-ppt",
//         element: <CompanyInductionViewPage />,
//       },
//       {
//         path: "company-policies",
//         element: <CompanyPoliciesViewPage />,
//       },
//       {
//         path: "training-material",
//         element: <TrainingMaterialsPage />,
//       },
//       {
//         path: "admin-panel-training",
//         element: <AdminPanelTrainingPage />,
//       },
//       {
//         path: "organization-chart",
//         element: <EmployeeTreemapPage />,
//       },
//       {
//         path: "request-hike-advance-reimbursement",
//         element: <RequestDashboardPage />,
//       },

//       {
//         path: "/dashboard/geo-location",
//         element: <GeolocationPage />,
//       },

//       {
//         path: "/dashboard/field-worker",
//         element: <FiledworkerPage />,
//       },

//       {
//         path: "set-kpis-new",
//         element: <SetKpisNewPage />,
//       },
//       {
//         path: "rate-team-members",
//         element: <RatingDashboardPage />,
//       },
//       {
//         path: "employee-advanced/:employeeId",
//         element: <EmployeeRatingAdvancedPage />,
//       },
//       {
//         path: "my-performance",
//         element: <MyPerformanceAdvancedPage />,
//       },
//       {
//         path: "team-members-performance",
//         element: <TeamRatingsAdvancedPage />,
//       },
//       {
//         path: "all-employess-ratings",
//         element: <AllEmployeeRatingsPage />,
//       },

//       {
//         path: "set-kpis-daily",
//         element: <SetKpisNewPageRazor />,
//       },
//       {
//         path: "rate-team-members-daily",
//         element: <RatingDashboardPageRazor />,
//       },
//       {
//         path: "employee-advanced-aggregate/:employeeId",
//         element: <EmployeeRatingAdvancedPageRazor />,
//       },
//       {
//         path: "my-performance-aggregate",
//         element: <MyPerformanceAdvancedPageRazor />,
//       },
//       {
//         path: "team-members-performance-aggregate",
//         element: <TeamRatingsAdvancedPageRazor />,
//       },
//       {
//         path: "all-employess-ratings-aggregate",
//         element: <AllEmployeeRatingsPageRazor />,
//       },
//       {
//         path: "all-performance-analytics",
//         element: <SuperAdminDashboardAnlyticsPage />,
//         handle: { helpKey: " " },
//       },

//       //registration

//       {
//         path: "registration/add-new-employee",
//         element: <AddNewEmployeePage />,
//       },

//       {
//         path: "registration/review-employee",
//         element: <ReviewEmployeePage />,
//       },
//       {
//         path: "registration/review-employee/:empid",
//         element: <ManagerTabOverview />,
//       },
//       {
//         path: "performance-analytics",
//         element: <ManagerDashboardPage />,
//         handle: { helpKey: " " },
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <Page404 />, // Fallback for undefined routes
//   },
//   // <Footer />,
// ]);

// export default router;

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import {
  Login,
  Dashboard,
  Page404,
  AddEmployeePage,
  UpdateEmployeePage,
  ViewEmployeePage,
  SubordinatesEmployessPage,
  AssignAssetsPage,
  AllEmployessPage,
  ManageTicketsPage,
  RaiseTicketsPage,
  AllTicketsPage,
  FilePoshPage,
  PoshManagePage,
  FeedPage,
  EngPermissionDashboardPage,
  EmployessMainPage,
  AttendanceDashboardPage,
  SubordinatesAttendancePage,
  EmployeeFullAttendancePage,
  OwmFullAttendancePage,
  AllEmployeeAttendancePage,
  RecruitDashboardPage,
  AllVacanciesPage,
  CreateVacancyPage,
  ReferralListPage,
  VacanciesListPage,
  EmployeeResignationHistoryPage,
  CompanyInfoPage,
  CompanySettingPage,
  MainPage,
  ManagePayrollPage,
  ManageClaimsPage,
  //
  TaskMainPage,
  ViewDailyTaskPage,
  AssignedTaskPage,
  AddHierarchyPage,
  CompanyPoliciesPage,
  CompanyInductionPage,
  BreakSettingsPage,
  PerformanceManagementDashboardPage,
  // PostAndViewPerformersPage,
  SetKpiForDesignationPage,
  TeamsPerformancePage,
  AllEmpRatingsPage,
  RaciDashboardPage,
  RaciBusinessPage,
  RaciOperationsPage,
  SuperAdminDashboardPage,
  EmployeeDashboardPage,
  ChatPage,
  EmployeeLeaveHistoryPage,
  AssignedTaskEmployeePage,
  ManageLeavesPage,
  AllLeavePage,
  SubmitResignationPage,
  FNFApprovalPage,
  ResignationApprovalPage,
  AllDashletsPage,
  MyProfilePage,
  ProductivityDashboardPage,
  MainDashboardPage,
  TeamProductivityPage,
  AllDisciplinaryActionsPage,
  UsersListForDisciplinaryPage,
  UpdateEmployeeManagerPage,
  AddEmployeeManagerPage,
  CompanyPoliciesViewPage,
  CompanyInductionViewPage,
  TrainingMaterialsPage,
  AdminPanelTrainingPage,
  EmployeeTreemapPage,
  RequestDashboardPage,
  PostPerformerPage,
  ViewPerformerPage,
  SetKpisNewPage,
  RatingDashboardPage,
  EmployeeRatingAdvancedPage,
  MyPerformanceAdvancedPage,
  TeamRatingsAdvancedPage,
  AllEmployeeRatingsPage,
  SetKpisNewPageRazor,
  RatingDashboardPageRazor,
  EmployeeRatingAdvancedPageRazor,
  MyPerformanceAdvancedPageRazor,
  TeamRatingsAdvancedPageRazor,
  AllEmployeeRatingsPageRazor,
  ManagerDashboardPage,
  SuperAdminDashboardAnlyticsPage,
} from "../pages";
import EmployeeFullStatisticsPage from "../pages/attendence management/EmployeeFullStatisticsPage";
import MainLayout from "./MainLayout";

import {
  Footer,
  ResetPassword,
  MakeAnnouncement,
  ViewAnnouncements,
  NotificationsPage,
} from "../components";
import DailyTaskPage from "../pages/task/DailyTaskPage";
import EmployeeDailyStats from "../components/attendence management/EmployeeDailyStats";
import GeolocationPage from "../pages/geolocation/GeolocationPage";
import FiledworkerPage from "../pages/geolocation/FiledworkerPage";
import ProductivityLensAll from "../components/product-lense/ProductivityLensAll";
import SubordinateProductivityLens from "../components/product-lense/SubordinateProductivityLens";
import EmployeeTicketsPage from "../components/tickets Management/EmployeeTicketsPage";
import IndividualAssignedTasks from "../components/task/assigned-task/IndividualAssignedTasks";
import EmployeeDailyTaskDetail from "../components/task/daily-task/EmployeeDailyTaskDetail";
import EmployeeDetails from "../components/payroll/manage-payroll/EmployeePayrollDetails";
import EmployeeIndividualRatings from "../components/performance management new/EmployeeIndividualRating";
import AddNewEmployeePage from "../pages/emp-registration/add-new-employee/AddNewEmployeePage";
import SetPassword from "../pages/emp-registration/SetPassword";
import EditRestDetailPage from "../pages/emp-registration/edit-rest-detail/EditRestDetailPage";
import ReviewEmployeePage from "../pages/emp-registration/emp-review/ReviewEmployeePage";
import ManagerTabOverview from "../pages/emp-registration/emp-review/manager-tabs/ManagerTabOverview";
import SuperAdminRegistration from "../components/SuperAdminRegistration/SuperAdminRegistration";
import RegistrationLogin from "../pages/emp-registration/RegistrationLogin";

const router = createBrowserRouter([
  {
    path: "/super-admin-registration",
    element: <SuperAdminRegistration />,
  },
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "/registration/set-password/v2/:token",
    element: <SetPassword />,
  },
  {
    path: "/registration/login",
    element: <RegistrationLogin />,
  },

  {
    path: "registration/edit-rest-detail",
    element: <EditRestDetailPage />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <PrivateRoute requiredPermissions={[]} />
      </MainLayout>
    ),
    children: [
      // Dashboards
      {
        path: "super-employee",
        element: <SuperAdminDashboardPage />,
        handle: { helpKey: "dashboardSuperEmployee" },
      },
      {
        path: "all-dashlets",
        element: <AllDashletsPage />,
        handle: { helpKey: "dashboardAllDashlets" },
      },
      {
        path: "employee",
        element: <EmployeeDashboardPage />,
        handle: { helpKey: "dashboardEmployee" },
      },

      //notifications
      {
        path: "notifications",
        element: <NotificationsPage />,
        handle: { helpKey: " notifications" },
      },
      //Announcements

      {
        path: "add-announcement",
        element: <MakeAnnouncement />,
        handle: { helpKey: " addAnnouncement" },
      },
      {
        path: "view-announcement",
        element: <ViewAnnouncements />,
        handle: { helpKey: " viewAnnouncement" },
      },

      // Synergy
      {
        path: "engagement-feed",
        element: <FeedPage />,
        handle: { helpKey: " engagementFeed" },
      },
      {
        path: "engagement-permission-dashboard",
        element: <EngPermissionDashboardPage />,
        handle: { helpKey: " engagementPermissionDashboard" },
      },

      // Manage Employees
      {
        path: "employees/management",
        element: <EmployessMainPage />,
        handle: { helpKey: " employeesManagement" },
      },
      {
        path: "add-employee",
        element: <AddEmployeePage />,
        handle: { helpKey: " addEmployee" },
      },
      {
        path: "add-employee-manager",
        element: <AddEmployeeManagerPage />,
        handle: { helpKey: " addEmployeeManager" },
      },
      {
        path: "supordinates-employees",
        element: <SubordinatesEmployessPage />,
        handle: { helpKey: " subordinatesEmployees" },
      },
      {
        path: "all-employess",
        element: <AllEmployessPage />,
        handle: { helpKey: " allEmployees" },
      },
      {
        path: "update-employee/:id",
        element: <UpdateEmployeePage />,
        handle: { helpKey: " " },
      },
      {
        path: "update-employee-manager/:id",
        element: <UpdateEmployeeManagerPage />,
        handle: { helpKey: " " },
      },
      {
        path: "employees/details/:id",
        element: <ViewEmployeePage />,
        handle: { helpKey: " " },
      },
      {
        path: "assign-assets",
        element: <AssignAssetsPage />,
        handle: { helpKey: " assignAssets" },
      },

      {
        path: "disciplinary-actions",
        element: <AllDisciplinaryActionsPage />,
        handle: { helpKey: " disciplinaryActions" },
      },
      {
        path: "disciplinary-actions/all-users",
        element: <UsersListForDisciplinaryPage />,
        handle: { helpKey: " disciplinaryActionsAllUsers" },
      },

      // Ticket Management
      {
        path: "manage-tickets",
        element: <ManageTicketsPage />,
        handle: { helpKey: " AllTickets" },
      },
      {
        path: "raise-ticket",
        element: <RaiseTicketsPage />,
        handle: { helpKey: " AllTickets" },
      },
      {
        path: "all-tickets",
        element: <AllTicketsPage />,
        handle: { helpKey: " AllTickets" },
      },
      {
        path: "employee-tickets/:employeeId",
        element: <EmployeeTicketsPage />,
      },
      {
        path: "posh-manage",
        element: <PoshManagePage />,
        handle: { helpKey: " poshManage" },
      },
      {
        path: "file-posh",
        element: <FilePoshPage />,
        handle: { helpKey: " filePosh" },
      },

      //attendance management

      {
        path: "attendance-dashboard",
        element: <AttendanceDashboardPage />,
        handle: { helpKey: " attendanceDashboard" },
      },
      {
        path: "subordinates-attendance",
        element: <SubordinatesAttendancePage />,
        handle: { helpKey: " subordinatesAttendance" },
      },
      {
        path: "view-attendance",
        element: <OwmFullAttendancePage />,
        handle: { helpKey: " viewAttendance" },
      },
      {
        path: "all-employee-attendance",
        element: <AllEmployeeAttendancePage />,
        handle: { helpKey: " allEmployeeAttendance" },
      },
      {
        path: "attendance/:empID",
        element: <EmployeeFullAttendancePage />,
        handle: { helpKey: " " },
      },
      {
        path: "statistics/:empID",
        element: <EmployeeFullStatisticsPage />,
        handle: { helpKey: " " },
      },
      {
        path: "statistics/:empID/:date",
        element: <EmployeeDailyStats />,
        handle: { helpKey: " " },
      },
      {
        path: "request-hike-advance-reimbursement",
        element: <RequestDashboardPage />,
        handle: { helpKey: " requestHikeAdvanceReimbursement" },
      },
      // Payroll
      {
        path: "payroll-main",
        element: <MainPage />,
        handle: { helpKey: " payrollMain" },
      },
      {
        path: "manage-payroll",
        element: <ManagePayrollPage />,
        handle: { helpKey: " managePayroll" },
      },
      {
        path: "manage-claims",
        element: <ManageClaimsPage />,
        handle: { helpKey: " manageClaims" },
      },
      {
        path: "payroll/employee/:employeeId",
        element: <EmployeeDetails />,
        handle: { helpKey: " payrollEmployeeDetails" },
      },

      // Task Management
      {
        path: "main-task",
        element: <TaskMainPage />,
        handle: { helpKey: " taskMain" },
      },
      {
        path: "view-daily-task",
        element: <ViewDailyTaskPage />,
        handle: { helpKey: " viewDailyTask" },
      },
      {
        path: "assigned-task",
        element: <AssignedTaskPage />,
        handle: { helpKey: " assignedTask" },
      },
      {
        path: "assigned-task/employee",
        element: <AssignedTaskEmployeePage />,
        handle: { helpKey: " assignedTaskEmployee" },
      },
      {
        path: "employee-tasks/:employeeId",
        element: <IndividualAssignedTasks />,
        handle: { helpKey: " " },
      },
      {
        path: "daily-task",
        element: <DailyTaskPage />,
        handle: { helpKey: " " },
      },
      {
        path: "employee-particular-tasks/:employeeId",
        element: <EmployeeDailyTaskDetail />,
        handle: { helpKey: " " },
      },
      // Recruitment
      {
        path: "recruitment-main",
        element: <RecruitDashboardPage />,
        handle: { helpKey: " " },
      },
      {
        path: "all-vacancies",
        element: <AllVacanciesPage />,
        handle: { helpKey: " " },
      },
      {
        path: "create-vacancies",
        element: <CreateVacancyPage />,
        handle: { helpKey: " " },
      },
      {
        path: "referral-list",
        element: <ReferralListPage />,
        handle: { helpKey: " " },
      },
      {
        path: "vancancies-list",
        element: <VacanciesListPage />,
        handle: { helpKey: " " },
      },
      // Resignation & FNF
      {
        path: "employee-resignation-history",
        element: <EmployeeResignationHistoryPage />,
        handle: { helpKey: " " },
      },
      {
        path: "submit-resignation",
        element: <SubmitResignationPage />,
        handle: { helpKey: " " },
      },
      {
        path: "resignation-approvals",
        element: <ResignationApprovalPage />,
        handle: { helpKey: " " },
      },
      {
        path: "fnf-request-hr",
        element: <FNFApprovalPage />,
        handle: { helpKey: " " },
      },

      // Company Info & Settings
      {
        path: "company-info",
        element: <CompanyInfoPage />,
        handle: { helpKey: " " },
      },
      {
        path: "company-settings",
        element: <CompanySettingPage />,
        handle: { helpKey: " " },
      },
      {
        path: "add-hierarchy",
        element: <AddHierarchyPage />,
        handle: { helpKey: " " },
      },
      {
        path: "update-policies",
        element: <CompanyPoliciesPage />,
        handle: { helpKey: " " },
      },
      {
        path: "post-induction",
        element: <CompanyInductionPage />,
        handle: { helpKey: " " },
      },
      {
        path: "break-settings",
        element: <BreakSettingsPage />,
        handle: { helpKey: " " },
      },
      {
        path: "training-material",
        element: <TrainingMaterialsPage />,
        handle: { helpKey: " " },
      },
      {
        path: "admin-panel-training",
        element: <AdminPanelTrainingPage />,
        handle: { helpKey: " " },
      },
      {
        path: "induction-ppt",
        element: <CompanyInductionViewPage />,
        handle: { helpKey: " " },
      },
      {
        path: "company-policies",
        element: <CompanyPoliciesViewPage />,
        handle: { helpKey: " " },
      },

      // Performance Management old
      {
        path: "performance-dashboard",
        element: <PerformanceManagementDashboardPage />,
        handle: { helpKey: " " },
      },
      {
        path: "set-kpis",
        element: <SetKpiForDesignationPage />,
        handle: { helpKey: " " },
      },
      {
        path: "team-performance",
        element: <TeamsPerformancePage />,
        handle: { helpKey: " " },
      },
      {
        path: "post-top-performers",
        element: <PostPerformerPage />,
        handle: { helpKey: " " },
      },
      {
        path: "top-performers",
        element: <ViewPerformerPage />,
        handle: { helpKey: " " },
      },
      {
        path: "all-emp-ratings",
        element: <AllEmpRatingsPage />,
        handle: { helpKey: " " },
      },

      // KPI Quant-Qualitative and Performance Management  have to set kpis daily, weekely,monthly,yearly
      {
        path: "set-kpis-new",
        element: <SetKpisNewPage />,
        handle: { helpKey: " " },
      },
      {
        path: "rate-team-members",
        element: <RatingDashboardPage />,
        handle: { helpKey: " " },
      },
      {
        path: "team-members-performance",
        element: <TeamRatingsAdvancedPage />,
        handle: { helpKey: " " },
      },
      {
        path: "employee/:employeeId/ratings",
        element: <EmployeeIndividualRatings />,
      },
      {
        path: "my-performance",
        element: <MyPerformanceAdvancedPage />,
        handle: { helpKey: " " },
      },
      {
        path: "all-employess-ratings",
        element: <AllEmployeeRatingsPage />,
        handle: { helpKey: " " },
      },

      // KPI Quant-Qualitative according to Razor in this only set kpis daily and weekely,monthly yearly calculated automatically
      {
        path: "set-kpis-daily",
        element: <SetKpisNewPageRazor />,
        handle: { helpKey: " " },
      },
      {
        path: "rate-team-members-daily",
        element: <RatingDashboardPageRazor />,
        handle: { helpKey: " " },
      },
      {
        path: "employee-advanced/:employeeId",
        element: <EmployeeRatingAdvancedPage />,
        handle: { helpKey: " " },
      },
      {
        path: "employee-advanced-aggregate/:employeeId",
        element: <EmployeeRatingAdvancedPageRazor />,
        handle: { helpKey: " " },
      },
      {
        path: "my-performance-aggregate",
        element: <MyPerformanceAdvancedPageRazor />,
        handle: { helpKey: " " },
      },
      {
        path: "team-members-performance-aggregate",
        element: <TeamRatingsAdvancedPageRazor />,
        handle: { helpKey: " " },
      },
      {
        path: "all-employess-ratings-aggregate",
        element: <AllEmployeeRatingsPageRazor />,
        handle: { helpKey: " " },
      },

      {
        path: "performance-analytics",
        element: <ManagerDashboardPage />,
        handle: { helpKey: " " },
      },

      {
        path: "all-performance-analytics",
        element: <SuperAdminDashboardAnlyticsPage />,
        handle: { helpKey: " " },
      },

      // ------------------------------ Company Analytics RACI------------------------------

      {
        path: "raci-dashboard",
        element: <RaciDashboardPage />,
        handle: { helpKey: " " },
      },
      {
        path: "raci-business",
        element: <RaciBusinessPage />,
        handle: { helpKey: " " },
      },
      {
        path: "raci-operations",
        element: <RaciOperationsPage />,
        handle: { helpKey: " " },
      },

      // Productivity Lenses
      {
        path: "main-dashboard",
        element: <ProductivityLensAll />,
        handle: { helpKey: " " },
      },
      {
        path: "productivity-dashboard",
        element: <ProductivityDashboardPage />,
        handle: { helpKey: " " },
      },
      {
        path: "team-productivity",
        element: <TeamProductivityPage />,
        handle: { helpKey: " " },
      },
      {
        path: "all-employee-productivity",
        element: <ProductivityLensAll />,
        handle: { helpKey: " " },
      },
      {
        path: "subordinate-productivity",
        element: <SubordinateProductivityLens />,
        handle: { helpKey: " " },
      },

      // Leaves Management
      {
        path: "leave-history",
        element: <EmployeeLeaveHistoryPage />,
        handle: { helpKey: " " },
      },
      {
        path: "manage-leave-history",
        element: <ManageLeavesPage />,
        handle: { helpKey: " " },
      },
      {
        path: "all-leave-history",
        element: <AllLeavePage />,
        handle: { helpKey: " " },
      },

      // Organization Chart
      {
        path: "organization-chart",
        element: <EmployeeTreemapPage />,
        handle: { helpKey: " " },
      },
      // Profile
      {
        path: "my-profile",
        element: <MyProfilePage />,
        handle: { helpKey: " " },
      },

      // Chats
      { path: "chats", element: <ChatPage />, handle: { helpKey: " " } },

      // Geo Location
      {
        path: "field-worker",
        element: <FiledworkerPage />,
        handle: { helpKey: " " },
      },
      {
        path: "geo-location",
        element: <GeolocationPage />,
        handle: { helpKey: " " },
      },

      //registration

      {
        path: "registration/add-new-employee",
        element: <AddNewEmployeePage />,
      },

      {
        path: "registration/review-employee",
        element: <ReviewEmployeePage />,
      },
      {
        path: "registration/review-employee/:empid",
        element: <ManagerTabOverview />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />, // Fallback for undefined routes
  },
  // <Footer />,
]);

export default router;
