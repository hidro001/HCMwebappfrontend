// src/store/useCompanySettingsStore.js

import { create } from 'zustand'
import axiosInstance from '../service/axiosInstance'
import { toast } from 'react-hot-toast'

const useCompanySettingsStore = create((set, get) => ({

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
      const res = await axiosInstance.get('/company-settings/settings')
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
        '/company-settings/settings',
        updatedSettings
      )
      toast.success('Attendance Policies updated successfully.')
      get().fetchAttendancePolicies()
    } catch (error) {
      console.error(error)
      toast.error('Failed to update Attendance Policies.')
    }
  },

  shiftTimings: [],

  fetchShiftTimings: async () => {
    try {
      const res = await axiosInstance.get('/company-settings/shift-timings')
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
        await axiosInstance.post('/company-settings/shift-timings', shiftData)
        toast.success('Shift Timing updated successfully.')
      } else {
        // Otherwise, add new
        await axiosInstance.post('/company-settings/shift-timings', shiftData)
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
      await axiosInstance.delete(`/company-settings/shift-timings/${id}`)
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
      const res = await axiosInstance.get('/company-settings/holidays')
      set({ holidays: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Holidays.')
    }
  },

  addOrUpdateHoliday: async (holidayData) => {
    try {
      if (holidayData.id) {
        await axiosInstance.post('/company-settings/holidays', holidayData)
        toast.success('Holiday updated successfully.')
      } else {
        await axiosInstance.post('/company-settings/holidays', holidayData)
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
      await axiosInstance.delete(`/company-settings/holidays/${id}`)
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
      const res = await axiosInstance.get('/company-settings/deductions')
      set({ deductions: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Deductions.')
    }
  },

  addOrUpdateDeduction: async (deductionData) => {
    try {
      if (deductionData.id) {
        await axiosInstance.post('/company-settings/deductions', deductionData)
        toast.success('Deduction updated successfully.')
      } else {
        await axiosInstance.post('/company-settings/deductions', deductionData)
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
      await axiosInstance.delete(`/company-settings/deductions/${id}`)
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
      const res = await axiosInstance.get('/company-settings/payroll-cycles')
      set({ payrollCycles: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Payroll Cycles.')
    }
  },

  addOrUpdatePayrollCycle: async (cycleData) => {
    try {
      if (cycleData.id) {
        await axiosInstance.post('/company-settings/payroll-cycles', cycleData)
        toast.success('Payroll Cycle updated successfully.')
      } else {
        await axiosInstance.post('/company-settings/payroll-cycles', cycleData)
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
      await axiosInstance.delete(`/company-settings/payroll-cycles/${id}`)
      toast.success('Payroll Cycle deleted successfully.')
      get().fetchPayrollCycles()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Payroll Cycle.')
    }
  },

  // -----------------------------
  // Working Day Systems
  // -----------------------------
  workingDaySystem: [],

  fetchWorkingDaySystems: async () => {
    try {
      const res = await axiosInstance.get('/company-settings/workingDay-systems')
      set({ workingDaySystem: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Working Days System.')
    }
  },

  addOrUpdateWorkingDaySystem: async (workindDayData) => {
    try {
      if (workindDayData.id) {
        await axiosInstance.post('/company-settings/workingDay-systems', workindDayData)
        toast.success('Working Day System updated successfully.')
      } else {
        await axiosInstance.post('/company-settings/workingDay-systems', workindDayData)
        toast.success('Working Days System added successfully.')
      }
      get().fetchworkingDaySystem()
    } catch (error) {
      console.error(error)
      toast.error('Failed to save Working Days System.')
    }
  },

  deleteWorkingDaySystem: async (id) => {
    try {
      await axiosInstance.delete(`/company-settings/workingDay-systems/${id}`)
      toast.success('Working Days System deleted successfully.')
      get().fetchworkingDaySystem()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Working Days System.')
    }
  },

  // -----------------------------
  // Employment Types
  // -----------------------------
  employmentTypes: [],

  fetchEmploymentTypes: async () => {
    try {
      const res = await axiosInstance.get('/company-settings/employment-types')
      set({ employmentTypes: res.data?.data || [] })
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch Employment Types.')
    }
  },

  addOrUpdateEmploymentType: async (empData) => {
    try {
      if (empData.id) {
        await axiosInstance.post('/company-settings/employment-types', empData)
        toast.success('Employment Type updated successfully.')
      } else {
        await axiosInstance.post('/company-settings/employment-types', empData)
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
      await axiosInstance.delete(`/company-settings/employment-types/${id}`)
      toast.success('Employment Type deleted successfully.')
      get().fetchEmploymentTypes()
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete Employment Type.')
    }
  },
}))

export default useCompanySettingsStore
