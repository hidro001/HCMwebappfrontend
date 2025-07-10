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
        handle: { helpKey: " superEmployeeDashboard" },
      },
      {
        path: "all-dashlets",
        element: <AllDashletsPage />,
        handle: { helpKey: " allDashlets" },
      },
      {
        path: "employee",
        element: <EmployeeDashboardPage />,
        handle: { helpKey: " employeeDashboard" },
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

