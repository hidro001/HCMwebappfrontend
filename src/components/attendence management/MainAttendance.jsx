import { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
import AttendanceChart from './DepartmentAttendance.jsx';
import useDepartmentStore from "../../store/departmentStore.js";
import AttendanceCards from './Card/AttendanceCard.jsx';
import LateInToday from './Table/AttendanceTable.jsx';
import useAttendanceStore from "../../store/useAttendanceStore.js";
import { motion } from "framer-motion";
import GaugeCard from "./Card/GaugeCard.jsx";
import LineCard from "./Card/LineCard.jsx";
import { toast } from "react-hot-toast";
import axiosInstance from "../../service/axiosInstance.js";
import { getMonthHolidays } from '../../service/holidayService.js';
import { use } from 'react';
import { set } from 'date-fns';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const Dashboard = () => {

  const [departmentId, setDepartmentId] = useState("");
  const [BiometricData, setBiometricData] = useState([]);
  const [holidayData, setHolidayData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Departments");
  const [attendanceData, setAttendanceData] = useState('');
  const [date, setDate] = useState(
    () => new Date().toISOString().substring(0, 10)
  );

  const { todayLateIn, todayAttendance, fetchTodaysPunchTimes, fetchTodaysLateIn, fetchTodaysAttendanceStatus } = useAttendanceStore();

  const { departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments } = useDepartmentStore();

  useEffect(() => {
    fetchTodaysPunchTimes();
    fetchTodaysLateIn();
    fetchTodaysAttendanceStatus()
    fetchHolidayData();
    fetchDepartments()
  }, [fetchTodaysPunchTimes, fetchTodaysLateIn, fetchTodaysAttendanceStatus, fetchDepartments]);

  const departmentTabs = [
    { department: "All Departments", _id: 'all' },
    ...departments
  ];

  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = async () => {
    try {
      const resData = await getMonthHolidays();
      if (resData.success) {
        getMonthHolidays(resData.data || []);
      } else {
        setErrorMsg(resData.message || "Failed to fetch holidays");
      }
    } catch (error) {
      setErrorMsg(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const TodaylateIn = todayLateIn
    ? todayLateIn.map((late, i) => ({
      id: late._id ?? i,
      empID: late.employee_Id,
      name: `${late.first_Name} ${late.last_Name}`,
      department: late.department,
      attendanceDate: late.attendanceDate || "",
      late: late.minutesLate,
      category: late.lateCategory,
      login: late.login,
      managerName: late.managerName
    }))
    : [];

  const { totalEmployees, presentCount, absentCount } = attendanceData

  const percentageCount = (total, data) => {
    return ((data / total) * 100).toFixed(2);

  }

  useEffect(() => {
    handleDapertmentAttendance();
  }, [date, departmentId])


  useEffect(() => {
    handlePunchInData();
    handleHolidayData();
  }, []);

  const handleDapertmentAttendance = async (e) => {
    try {
      const res = await axiosInstance.get(`/attendance/department-attendance?department=${encodeURIComponent(departmentId)}&date=${date}`);
      setAttendanceData(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Get Department Attendance.");
    } finally {
    }
  };

  const handlePunchInData = async () => {
    try {
      const response = await axiosInstance.get(`/attendance/punch-in-data`)
      setBiometricData(response.data.data);
    } catch (error) {
      console.error("Error fetching punch in data:", error);
      toast.error(error.response?.data?.message || "Failed to fetch punch in data.");
    }
  }


  const handleHolidayData = async () => {
    try {
      const response = await axiosInstance.get(`/attendance/holidays`);
      setHolidayData(response.data.holidays);

    } catch (error) {
      console.error("Error fetching holiday data:", error);
      toast.error(error.response?.data?.message || "Failed to fetch holiday data.");
    }
  }

  const festivals = [
    {
      name: "Jagannath Rathyatra",
      date: "27, June, Fri",
      barColor: "bg-green-400",
    },
    {
      name: "Jagannath Rathyatra",
      date: "27, June, Fri",
      barColor: "bg-rose-400",
    },
    {
      name: "Jagannath Rathyatra",
      date: "27, June, Fri",
      barColor: "bg-orange-400",
    },
    {
      name: "Jagannath Rathyatra",
      date: "27, June, Fri",
      barColor: "bg-green-400",
    },
  ];

  const biometricCount = BiometricData.filter(a => a.mode === "BiometricDevice").length;
  const appCount = BiometricData.filter(a => a.mode === "App").length;
  const webCount = BiometricData.filter(a => a.mode === "Web").length;

  const totalCount = BiometricData.length;



  const data = [
    { label: "Total Checked In", value: totalCount, gradient: "from-lime-500 to-green-500" },
    { label: "Biometric Checked-in", value: biometricCount, gradient: "from-indigo-400 to-pink-300" },
    { label: "App Check-in", value: appCount, gradient: "from-sky-400 to-cyan-500" },
    { label: "Web Check-in", value: webCount, gradient: "from-rose-300 to-rose-500" },
  ];


  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <AttendanceCards attendanceData={todayAttendance} />
      <div className='w-full grid grid-cols-1 xl:grid-cols-12 gap-4 mt-4 mb-6'>
        <div className="xl:col-span-5 bg-white dark:bg-gray-800 px-3 sm:px-4 pt-4 rounded-xl shadow-[0px_5px_24px_0px_#BABABA] dark:shadow-sm">
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4'>
            <h2 className="font-semibold text-md"> Department Attendance</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-1">
              <select
                className="border border-gray-300 dark:bg-gray-800 rounded-md py-1 px-2 text-sm
                              focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                value={departmentId}
                onChange={e => setDepartmentId(e.target.value)}
              >
                <option value="">Department</option>
                {departments.map(d => (
                  <option key={d._id} value={d.department}>
                    {d.department}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="border border-gray-300 dark:bg-gray-800 rounded-md px-2 py-1 text-sm
                              focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <AttendanceChart attendanceData={attendanceData} />
          </div>
        </div>

        <div className="xl:col-span-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-[0px_5px_24px_0px_#BABABA] dark:shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
            <h2 className="text-md font-semibold">Attendance Sources</h2>
            <select className="border border-gray-300 dark:bg-gray-800 rounded-md px-2 py-1 text-sm focus:outline-none w-full sm:w-auto">
              <option>Date</option>
              <option>Today</option>
              <option>Yesterday</option>
              <option>This week</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {data.map(({ label, value, gradient }) => (
              <Card key={label} label={label} value={value} gradient={gradient} />
            ))}
          </div>
        </div>

        <div className="xl:col-span-3 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-6 border-b pb-3 border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              🎉 Festivals
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
              {holidayData.length} Events
            </span>
          </div>

          <ul className="space-y-4">
            {holidayData.map((f, idx) => (
              <li key={idx}>
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02]">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-md">
                    {new Date(f.date).getDate()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 transition">
                      {f.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(f.date).toLocaleDateString("en-US", { weekday: "long" })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 3rd Section - Responsive Grid */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 mb-6'>
        <div className='w-full'>
          <GaugeCard title="Attendance Percentage" value={percentageCount(totalEmployees, presentCount)} scheme="blue" label1='present' />
        </div>
        <div className='w-full'>
          <GaugeCard title="Absent Percentage" value={percentageCount(totalEmployees, absentCount)} scheme="greyOnBlue" label1='absent' />
        </div>
        <div className='w-full md:col-span-2 xl:col-span-1'>
          <LineCard />
        </div>
      </div>

      {/* 4th section Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 lg:p-6">
        <h2 className="text-lg font-semibold mb-4">Late In Today</h2>
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
          {departmentTabs?.length > 0 && departmentTabs.map((tab) => (
            <button
              key={tab._id}
              onClick={() => setActiveTab(tab.department)}
              className={`relative px-3 sm:px-4 py-2 rounded transition whitespace-nowrap flex-shrink-0
                ${activeTab === tab.department
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-500"
                  : "text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
            >
              {tab.department}

              {activeTab === tab.department && (
                <motion.span
                  layoutId="pill"
                  className="absolute inset-0 rounded"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <LateInToday data={TodaylateIn} activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

function Card({ label, value, gradient }) {
  return (
    <div
      className={`
        h-24 sm:h-28 flex flex-col items-center justify-center text-center
        rounded-lg shadow-inner
        bg-gradient-to-br ${gradient}
      `}
    >
      <span className="text-xs sm:text-sm font-medium text-white/90 px-1 text-center leading-tight">{label}</span>
      <span className="text-lg sm:text-2xl font-semibold text-white">{value}</span>
    </div>
  );
}

function FestivalRow({ name, date, barColor }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white dark:bg-gray-600 shadow-sm">
      <div className={`${barColor} w-2 sm:w-3 self-stretch rounded-l-xl`} />
      <div className="flex-1 flex flex-col xs:flex-row xs:items-center xs:justify-between px-2 py-3 sm:py-4 gap-1">
        <span className="text-xs sm:text-sm font-medium text-center xs:text-left">{name}</span>
        <span className="text-xs sm:text-sm font-semibold text-center xs:text-right">{date}</span>
      </div>
    </div>
  );
}

export default Dashboard;