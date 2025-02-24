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
  PostAndViewPerformersPage,
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
} from "../pages";
import MainLayout from "./MainLayout";

import {
  Footer,
  ResetPassword,
  MakeAnnouncement,
  ViewAnnouncements,
  NotificationsPage,
} from "../components";
import DailyTaskPage from "../pages/task/DailyTaskPage";

const router = createBrowserRouter([
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <PrivateRoute />
      </MainLayout>
    ),
    children: [
      {
        index: true,
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
        path: "engagement-feed",
        element: <FeedPage />,
      },
      {
        path: "engagement-permission-dashboard",
        element: <EngPermissionDashboardPage />,
      },

      {
        path: "manage-tickets",
        element: <ManageTicketsPage />,
      },
      {
        path: "all-tickets",
        element: <AllTicketsPage />,
      },
      {
        path: "raise-ticket",
        element: <RaiseTicketsPage />,
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
        path: "assigned-task/employee",
        element: <AssignedTaskEmployeePage />,
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
        element: <PostAndViewPerformersPage />,
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
    ],
  },
  {
    path: "*",
    element: <Page404 />, // Fallback for undefined routes
  },
  // <Footer />,
]);

export default router;
