// src/store/useCompanySettingsStore.js

import { create } from 'zustand'
import axiosInstance from '../service/axiosInstance'
import { toast } from 'react-hot-toast'

const useCompanySettingsStore = create((set, get) => ({
  // -----------------------------
  // Attendance Policies
  // -----------------------------
  attendancePolicies: {
    // default fallback if needed
    fullDayHours: 9,
    halfDayHours: 5,
    minimumWorkingHours: 4.5,
    gracePeriodMinutes: 15,
    regularizationCriteria: {
      minHours: 7,
      maxHours: 9,
    },
    regularizationApprovalRequired: false,
    overtimeEligibilityHours: 10,
    overtimeRate: 1.5,
    maximumLeaveCarryover: 30,
    autoAbsenceThreshold: 3,
    enableOvertime: false,
    enableLateComing: false,
    lateComingGraceMinutes: 0,
    lateComingPenaltyType: 'fixed',
    lateComingPenaltyValue: 0,
    maxMonthlyLatenessAllowed: 0,
    calcSalaryBasedOn: 'WORKING_DAYS',
  },
  monthsBetweenHikesOrAdvances: 12,

  fetchAttendancePolicies: async () => {
    try {
      // Fetch company settings
      const res = await axiosInstance.get('/superadmin/companysettings/settings')
      if (res.data?.success && res.data?.data) {
        const settingsData = res.data.data
        set({
          attendancePolicies: settingsData.attendancePolicies || {},
          monthsBetweenHikesOrAdvances: settingsData.monthsBetweenHikesOrAdvances ?? 12,
        })
      } else {
        toast.error('Failed to fetch attendance policies.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch attendance policies.')
    }
  },

  updateAttendancePolicies: async (updatedSettings) => {
    try {
      await axiosInstance.post(
        '/superadmin/companysettings/update-policies',
        updatedSettings
      )
      toast.success('Attendance Policies updated successfully.')
      // Re-fetch to refresh local state
      get().fetchAttendancePolicies()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update Attendance Policies.')
    }
  },

  // -----------------------------
  // Shift Timings
  // -----------------------------
  shiftTimings: [],

  fetchShiftTimings: async () => {
    try {
      const res = await axiosInstance.get('/superadmin/companysettings/shift-timings')
      set({ shiftTimings: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Shift Timings.')
    }
  },

  addOrUpdateShiftTiming: async (shiftData) => {
    try {
      // If shiftData contains an id, we do an update
      if (shiftData.id) {
        await axiosInstance.post('/superadmin/companysettings/shift-timings', shiftData)
        toast.success('Shift Timing updated successfully.')
      } else {
        // Otherwise, add new
        await axiosInstance.post('/superadmin/companysettings/shift-timings', shiftData)
        toast.success('Shift Timing added successfully.')
      }
      get().fetchShiftTimings()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save Shift Timing.')
    }
  },

  deleteShiftTiming: async (id) => {
    try {
      await axiosInstance.delete(`/superadmin/companysettings/shift-timings/${id}`)
      toast.success('Shift Timing deleted successfully.')
      get().fetchShiftTimings()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Shift Timing.')
    }
  },

  // -----------------------------
  // Holidays
  // -----------------------------
  holidays: [],

  fetchHolidays: async () => {
    try {
      const res = await axiosInstance.get('/superadmin/companysettings/holidays')
      set({ holidays: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Holidays.')
    }
  },

  addOrUpdateHoliday: async (holidayData) => {
    try {
      if (holidayData.id) {
        await axiosInstance.post('/superadmin/companysettings/holidays', holidayData)
        toast.success('Holiday updated successfully.')
      } else {
        await axiosInstance.post('/superadmin/companysettings/holidays', holidayData)
        toast.success('Holiday declared successfully.')
      }
      get().fetchHolidays()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save Holiday.')
    }
  },

  deleteHoliday: async (id) => {
    try {
      await axiosInstance.delete(`/superadmin/companysettings/holidays/${id}`)
      toast.success('Holiday deleted successfully.')
      get().fetchHolidays()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Holiday.')
    }
  },

  // -----------------------------
  // Deductions
  // -----------------------------
  deductions: [],

  fetchDeductions: async () => {
    try {
      const res = await axiosInstance.get('/superadmin/companysettings/deductions')
      set({ deductions: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Deductions.')
    }
  },

  addOrUpdateDeduction: async (deductionData) => {
    try {
      if (deductionData.id) {
        await axiosInstance.post('/superadmin/companysettings/deductions', deductionData)
        toast.success('Deduction updated successfully.')
      } else {
        await axiosInstance.post('/superadmin/companysettings/deductions', deductionData)
        toast.success('Deduction added successfully.')
      }
      get().fetchDeductions()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save Deduction.')
    }
  },

  deleteDeduction: async (id) => {
    try {
      await axiosInstance.delete(`/superadmin/companysettings/deductions/${id}`)
      toast.success('Deduction deleted successfully.')
      get().fetchDeductions()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Deduction.')
    }
  },

  // -----------------------------
  // Payroll Cycles
  // -----------------------------
  payrollCycles: [],

  fetchPayrollCycles: async () => {
    try {
      const res = await axiosInstance.get('/superadmin/companysettings/payroll-cycles')
      set({ payrollCycles: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Payroll Cycles.')
    }
  },

  addOrUpdatePayrollCycle: async (cycleData) => {
    try {
      if (cycleData.id) {
        await axiosInstance.post('/superadmin/companysettings/payroll-cycles', cycleData)
        toast.success('Payroll Cycle updated successfully.')
      } else {
        await axiosInstance.post('/superadmin/companysettings/payroll-cycles', cycleData)
        toast.success('Payroll Cycle added successfully.')
      }
      get().fetchPayrollCycles()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save Payroll Cycle.')
    }
  },

  deletePayrollCycle: async (id) => {
    try {
      await axiosInstance.delete(`/superadmin/companysettings/payroll-cycles/${id}`)
      toast.success('Payroll Cycle deleted successfully.')
      get().fetchPayrollCycles()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Payroll Cycle.')
    }
  },

  // -----------------------------
  // Leave Systems
  // -----------------------------
  leaveSystems: [],

  fetchLeaveSystems: async () => {
    try {
      const res = await axiosInstance.get('/superadmin/companysettings/leave-systems')
      set({ leaveSystems: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Leave Systems.')
    }
  },

  addOrUpdateLeaveSystem: async (leaveData) => {
    try {
      if (leaveData.id) {
        await axiosInstance.post('/superadmin/companysettings/leave-systems', leaveData)
        toast.success('Leave System updated successfully.')
      } else {
        await axiosInstance.post('/superadmin/companysettings/leave-systems', leaveData)
        toast.success('Leave System added successfully.')
      }
      get().fetchLeaveSystems()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save Leave System.')
    }
  },

  deleteLeaveSystem: async (id) => {
    try {
      await axiosInstance.delete(`/superadmin/companysettings/leave-systems/${id}`)
      toast.success('Leave System deleted successfully.')
      get().fetchLeaveSystems()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Leave System.')
    }
  },

  // -----------------------------
  // Employment Types
  // -----------------------------
  employmentTypes: [],

  fetchEmploymentTypes: async () => {
    try {
      const res = await axiosInstance.get('/superadmin/companysettings/employment-types')
      set({ employmentTypes: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Employment Types.')
    }
  },

  addOrUpdateEmploymentType: async (empData) => {
    try {
      if (empData.id) {
        await axiosInstance.post('/superadmin/companysettings/employment-types', empData)
        toast.success('Employment Type updated successfully.')
      } else {
        await axiosInstance.post('/superadmin/companysettings/employment-types', empData)
        toast.success('Employment Type added successfully.')
      }
      get().fetchEmploymentTypes()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save Employment Type.')
    }
  },

  deleteEmploymentType: async (id) => {
    try {
      await axiosInstance.delete(`/superadmin/companysettings/employment-types/${id}`)
      toast.success('Employment Type deleted successfully.')
      get().fetchEmploymentTypes()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Employment Type.')
    }
  },
}))

export default useCompanySettingsStore
