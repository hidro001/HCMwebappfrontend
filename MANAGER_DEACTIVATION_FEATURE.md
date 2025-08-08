# Manager Deactivation Feature

## Overview
When a manager is deactivated, their team members are automatically reassigned to the manager's manager (i.e., the deactivated manager's superior).

## Implementation Details

### Backend API Endpoint
- **Endpoint**: `POST /user-management/reassign-team-members/{managerId}`
- **Purpose**: Reassigns all subordinates of a deactivated manager to the manager's manager
- **Response**: `{ success: boolean, message?: string }`

### Frontend Changes

#### 1. API Service (`getAllEmployeesApi.js`)
- Added `reassignTeamMembersApi()` function to call the backend endpoint

#### 2. Store Updates (`useAllEmployeesStore.js`)
- Enhanced `toggleEmployeeStatus()` function to:
  - Check if the employee being deactivated is a manager (has subordinates)
  - If yes, call the reassignment API
  - Show appropriate success/warning messages
  - Refresh the organization chart

#### 3. UI Components
- **EmployeeList.jsx**: Updated confirmation dialog to show special message for manager deactivation
- **SupordinatesEmployess.jsx**: Same updates as EmployeeList.jsx

### User Experience

#### When Deactivating a Regular Employee:
- Standard confirmation dialog: "Are you sure you want to deactivate this employee?"
- Simple status toggle

#### When Deactivating a Manager:
- Enhanced confirmation dialog: "Are you sure you want to deactivate this manager? Their team members will be automatically reassigned to their manager's manager."
- Automatic team reassignment
- Success message: "Manager deactivated and team members reassigned successfully!"

### Error Handling
- If reassignment fails, shows warning: "Manager deactivated but team reassignment failed. Please check manually."
- The manager is still deactivated even if reassignment fails
- Users are prompted to check the hierarchy manually if needed

### Organization Chart Updates
- The `orgStore.js` includes logic to filter out inactive users from the hierarchy
- When a manager is deactivated, their subordinates are moved up in the hierarchy
- The chart automatically refreshes after status changes

## Usage

1. Navigate to "All Employees" or "Subordinates" page
2. Find a manager (employee with subordinates)
3. Toggle their status to "Inactive"
4. Confirm the action in the dialog
5. The system will automatically reassign their team members

## Technical Notes

- The feature works with the existing permission system
- Only users with appropriate permissions can deactivate employees
- The reassignment logic is handled on the backend to ensure data consistency
- The frontend provides user feedback and handles edge cases gracefully
