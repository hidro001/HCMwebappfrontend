import { combineReducers } from "redux";

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  userRole: localStorage.getItem("userRole") || "",
  userName: localStorage.getItem("userName") || "",
  employeeId: localStorage.getItem("employeeId") || "",
  department: localStorage.getItem("department") || "",
  workingEmail: localStorage.getItem("workingEmail") || "",
  phoneNumber: localStorage.getItem("phoneNumber") || "",
  designation: localStorage.getItem("designation") || "",
  departmentAlocated:
    JSON.parse(localStorage.getItem("departmentAlocated")) || [],
  teams: JSON.parse(localStorage.getItem("teams")) || [], // Initialize teams from local storage
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userRole", action.payload.userRole);
      localStorage.setItem("userName", action.payload.userName);
      localStorage.setItem("employeeId", action.payload.employeeId);
      localStorage.setItem("department", action.payload.department);
      localStorage.setItem("workingEmail", action.payload.workingEmail);
      localStorage.setItem("phoneNumber", action.payload.phoneNumber);
      localStorage.setItem("designation", action.payload.designation);
      localStorage.setItem(
        "departmentAlocated",
        JSON.stringify(action.payload.departmentAlocated)
      );
      localStorage.setItem("teams", JSON.stringify(action.payload.teams)); // Save teams in local storage

      return {
        ...state,
        isAuthenticated: true,
        userRole: action.payload.userRole,
        userName: action.payload.userName,
        employeeId: action.payload.employeeId,
        department: action.payload.department,
        workingEmail: action.payload.workingEmail,
        phoneNumber: action.payload.phoneNumber,
        designation: action.payload.designation,
        departmentAlocated: action.payload.departmentAlocated, // Update state
        teams: action.payload.teams, // Update state with teams
      };
    case "LOGOUT":
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      localStorage.removeItem("employeeId");
      localStorage.removeItem("department");
      localStorage.removeItem("workingEmail");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("designation");
      localStorage.removeItem("departmentAlocated"); // Remove from localStorage
      localStorage.removeItem("teams"); // Remove teams from localStorage

      return {
        ...state,
        isAuthenticated: false,
        userRole: "",
        userName: "",
        employeeId: "",
        department: "",
        workingEmail: "",
        phoneNumber: "",
        designation: "",
        departmentAlocated: [], // Reset in state
        teams: [], // Reset teams in state
      };
    default:
      return state;
  }
};

const initialMenuState = {
  selectedMenu: "dashboard",
};

const menuReducer = (state = initialMenuState, action) => {
  switch (action.type) {
    case "SET_SELECTED_MENU":
      return {
        ...state,
        selectedMenu: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

export default rootReducer;
