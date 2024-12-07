export const login = (
  accessToken,
  userRole,
  userName,
  employeeId,
  department,
  workingEmail,
  phoneNumber,
  designation,
  teams
) => ({
  type: "LOGIN",
  payload: {
    accessToken,
    userRole,
    userName,
    employeeId,
    department,
    workingEmail,
    phoneNumber,
    designation,
    teams,
  },
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setSelectedMenu = (menu) => ({
  type: "SET_SELECTED_MENU",
  payload: menu,
});
