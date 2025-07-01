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
import { helpConfigs } from "../config/HelpConfig";

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
      {
        path: "super-employee-dashboard",
        element: <SuperAdminDashboardPage />,
      },
      {
        path: "employee",
        element: <EmployeeDashboardPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "add-announcement",
        element: <MakeAnnouncement />,
      },
      {
        path: "view-announcement",
        element: <ViewAnnouncements />,
      },
      {
        path: "employee-particular-tasks/:employeeId",
        element: <EmployeeDailyTaskDetail />,
      },

      {
        path: "engagement-feed",
        element: <FeedPage />,
      },
      {
        path: "engagement-permission-dashboard",
        element: <EngPermissionDashboardPage />,
      },
      {
        path: "payroll/employee/:employeeId",
        element: <EmployeeDetails />,
      },

      {
        path: "manage-tickets",
        element: <ManageTicketsPage />,
        handle: { helpKey: "ManageTickets" },
      },
      {
        path: "all-tickets",
        element: <AllTicketsPage />,
        handle: { helpKey: "AllTickets" },
      },
      {
        path: "raise-ticket",
        element: <RaiseTicketsPage />,
        handle: { helpKey: "RaiseTickets" },
      },
      {
        path: "posh-manage",
        element: <PoshManagePage />,
      },
      {
        path: "File-Posh",
        element: <FilePoshPage />,
      },
      {
        path: "employees/management",
        element: <EmployessMainPage />,
      },
      {
        path: "add-employee",
        element: <AddEmployeePage />,
      },
      {
        path: "add-employee-manager",
        element: <AddEmployeeManagerPage />,
      },
      {
        path: "supordinates-employees",
        element: <SubordinatesEmployessPage />,
      },
      {
        path: "update-employee/:id",
        element: <UpdateEmployeePage />,
      },
      {
        path: "update-employee-manager/:id",
        element: <UpdateEmployeeManagerPage />,
      },
      {
        path: "employees/details/:id",
        element: <ViewEmployeePage />,
      },
      {
        path: "assign-assets",
        element: <AssignAssetsPage />,
      },
      {
        path: "all-employess",
        element: <AllEmployessPage />,
      },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "manage-payroll",
        element: <ManagePayrollPage />,
      },
      {
        path: "manage-claims",
        element: <ManageClaimsPage />,
      },

      {
        path: "attendance-dashboard",
        element: <AttendanceDashboardPage />,
      },
      {
        path: "subordinates-attendance",
        element: <SubordinatesAttendancePage />,
      },
      {
        path: "attendance/:empID",
        element: <EmployeeFullAttendancePage />,
      },
      {
        path: "statistics/:empID",
        element: <EmployeeFullStatisticsPage />,
      },
      {
        path: "all-employee-productivity",
        element: <ProductivityLensAll />,
      },
      {
        path: "subordinate-productivity",
        element: <SubordinateProductivityLens />,
      },

      {
        // NEW ROUTE to handle /dashboard/statistics/EMP_ID/DATE
        path: "statistics/:empID/:date",
        element: <EmployeeDailyStats />,
      },
      {
        path: "view-attendance",
        element: <OwmFullAttendancePage />,
      },
      {
        path: "all-employee-attendance",
        element: <AllEmployeeAttendancePage />,
      },
      {
        path: "recruitment-main",
        element: <RecruitDashboardPage />,
      },
      {
        path: "all-vacancies",
        element: <AllVacanciesPage />,
      },
      {
        path: "create-vacancies",
        element: <CreateVacancyPage />,
      },
      {
        path: "referral-list",
        element: <ReferralListPage />,
      },
      {
        path: "employee-tickets/:employeeId",
        element: <EmployeeTicketsPage />,
      },

      {
        path: "vancancies-list",
        element: <VacanciesListPage />,
      },
      {
        path: "employee-resignation-history",
        element: <EmployeeResignationHistoryPage />,
      },
      // asdasfsfdsdsf
      {
        path: "submit-resignation",
        element: <SubmitResignationPage />,
      },
      {
        path: "resignation-approvals",
        element: <ResignationApprovalPage />,
      },
      {
        path: "fnf-request-hr",
        element: <FNFApprovalPage />,
      },

      // sdgdfgdfgdfhdfhdh
      {
        path: "company-info",
        element: <CompanyInfoPage />,
      },

      // task route

      {
        path: "main-task",
        element: <TaskMainPage />,
      },
      {
        path: "view-daily-task",
        element: <ViewDailyTaskPage />,
      },
      {
        path: "assigned-task",
        element: <AssignedTaskPage />,
      },
      {
        path: "employee-tasks/:employeeId",
        element: <IndividualAssignedTasks />,
      },
      {
        path: "assigned-task/employee",
        element: <AssignedTaskEmployeePage />,
      },
      {
        path: "employee/:employeeId/ratings",
        element: <EmployeeIndividualRatings />,
      },

      {
        path: "daily-task",
        element: <DailyTaskPage />,
      },
      {
        path: "company-settings",
        element: <CompanySettingPage />,
      },
      {
        path: "add-hierarchy",
        element: <AddHierarchyPage />,
      },
      {
        path: "update-policies",
        element: <CompanyPoliciesPage />,
      },
      {
        path: "post-induction",
        element: <CompanyInductionPage />,
      },
      {
        path: "break-settings",
        element: <BreakSettingsPage />,
      },
      {
        path: "performance-dashboard",
        element: <PerformanceManagementDashboardPage />,
      },
      {
        path: "top-performers",
        element: <ViewPerformerPage />,
      },
      {
        path: "set-kpis",
        element: <SetKpiForDesignationPage />,
      },
      {
        path: "team-performance",
        element: <TeamsPerformancePage />,
      },
      {
        path: "post-top-performers",
        element: <PostPerformerPage />,
      },
      {
        path: "all-emp-ratings",
        element: <AllEmpRatingsPage />,
      },
      {
        path: "raci-dashboard",
        element: <RaciDashboardPage />,
      },
      {
        path: "raci-business",
        element: <RaciBusinessPage />,
      },
      {
        path: "raci-operations",
        element: <RaciOperationsPage />,
        // chat
      },
      {
        path: "chats",
        element: <ChatPage />,
      },
      {
        path: "leave-history",
        element: <EmployeeLeaveHistoryPage />,
      },
      {
        path: "manage-leave-history",
        element: <ManageLeavesPage />,
      },
      {
        path: "all-leave-history",
        element: <AllLeavePage />,
      },
      {
        path: "all-dashlets",
        element: <AllDashletsPage />,
      },
      // product lense
      {
        path: "main-dashboard",
        element: <MainDashboardPage />,
      },
      {
        path: "productivity-dashboard",
        element: <ProductivityDashboardPage />,
      },
      {
        path: "team-productivity",
        element: <TeamProductivityPage />,
      },
      // myprofile
      {
        path: "my-profile",
        element: <MyProfilePage />,
      },
      {
        path: "disciplinary-actions/all-users",
        element: <UsersListForDisciplinaryPage />,
      },
      {
        path: "disciplinary-actions",
        element: <AllDisciplinaryActionsPage />,
      },
      {
        path: "induction-ppt",
        element: <CompanyInductionViewPage />,
      },
      {
        path: "company-policies",
        element: <CompanyPoliciesViewPage />,
      },
      {
        path: "training-material",
        element: <TrainingMaterialsPage />,
      },
      {
        path: "admin-panel-training",
        element: <AdminPanelTrainingPage />,
      },
      {
        path: "organization-chart",
        element: <EmployeeTreemapPage />,
      },
      {
        path: "request-hike-advance-reimbursement",
        element: <RequestDashboardPage />,
      },

      {
        path: "/dashboard/geo-location",
        element: <GeolocationPage />,
      },

      {
        path: "/dashboard/field-worker",
        element: <FiledworkerPage />,
      },

      {
        path: "set-kpis-new",
        element: <SetKpisNewPage />,
      },
      {
        path: "rate-team-members",
        element: <RatingDashboardPage />,
      },
      {
        path: "employee-advanced/:employeeId",
        element: <EmployeeRatingAdvancedPage />,
      },
      {
        path: "my-performance",
        element: <MyPerformanceAdvancedPage />,
      },
      {
        path: "team-members-performance",
        element: <TeamRatingsAdvancedPage />,
      },
      {
        path: "all-employess-ratings",
        element: <AllEmployeeRatingsPage />,
      },

      {
        path: "set-kpis-daily",
        element: <SetKpisNewPageRazor />,
      },
      {
        path: "rate-team-members-daily",
        element: <RatingDashboardPageRazor />,
      },
      {
        path: "employee-advanced-aggregate/:employeeId",
        element: <EmployeeRatingAdvancedPageRazor />,
      },
      {
        path: "my-performance-aggregate",
        element: <MyPerformanceAdvancedPageRazor />,
      },
      {
        path: "team-members-performance-aggregate",
        element: <TeamRatingsAdvancedPageRazor />,
      },
      {
        path: "all-employess-ratings-aggregate",
        element: <AllEmployeeRatingsPageRazor />,
      },
      {
        path: "all-performance-analytics",
        element: <SuperAdminDashboardAnlyticsPage />,
        handle: { helpKey: " " },
      },

      //registration

      {
        path: "registration/add-new-employee",
        element: <AddNewEmployeePage />,
      },
      {
        path: "registration/edit-rest-detail",
        element: <EditRestDetailPage />,
      },

      {
        path: "registration/review-employee",
        element: <ReviewEmployeePage />,
      },
      {
        path: "registration/review-employee/:empid",
        element: <ManagerTabOverview />,
      },
      {
        path: "performance-analytics",
        element: <ManagerDashboardPage />,
        handle: { helpKey: " " },
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
