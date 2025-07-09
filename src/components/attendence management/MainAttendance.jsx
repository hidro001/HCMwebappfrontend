import {useState, useEffect, useRef} from 'react';
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const Dashboard = () => {

  const [departmentId, setDepartmentId] = useState("");
  const [activeTab, setActiveTab] = useState("All Departments");
  const [attendanceData, setAttendanceData] = useState('');
  const [date, setDate] = useState(
    () => new Date().toISOString().substring(0, 10) 
  );

  const {todayLateIn, todayAttendance, fetchTodaysPunchTimes, fetchTodaysLateIn, fetchTodaysAttendanceStatus } = useAttendanceStore();

  const { departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments } = useDepartmentStore();

  useEffect(() => {
     fetchTodaysPunchTimes();
      fetchTodaysLateIn();
      fetchTodaysAttendanceStatus()
      fetchHolidayData();
  }, [fetchTodaysPunchTimes, fetchTodaysLateIn, fetchTodaysAttendanceStatus]);
  
  const departmentTabs = [
    { department : "All Departments", _id : 'all'},
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
        login : late.login,
        managerName: late.managerName
   }))
    : [];

    console.log(attendanceData,'ad')

    const {totalEmployees, presentCount, absentCount} = attendanceData

    console.log(presentCount, 'presentCount ')

    const percentageCount = (total, data) => {
      console.log(total, data)
      return ((data / total) * 100).toFixed(2);

    }

    useEffect(() => {
      handleDapertmentAttendance()
    }, [date, departmentId])

    const handleDapertmentAttendance = async (e) => {  
        try {
          const res  = await axiosInstance.get(`/attendance/department-attendance?department=${encodeURIComponent(departmentId)}&date=${date}`);
          setAttendanceData(res.data.data);
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to Get Department Attendance.");
        } finally {    
        }
    };

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

    const data = [
      { label: "Total Checked In",     value: 200, gradient: "from-lime-500 to-green-500" },
      { label: "Biometric Checked-in", value: 200, gradient: "from-indigo-400 to-pink-300" },
      { label: "App Check-in",         value: 200, gradient: "from-sky-400   to-cyan-500" },
      { label: "Manual Check-in",      value: 200, gradient: "from-rose-300  to-rose-500" },
    ];
 
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <AttendanceCards attendanceData={todayAttendance} />

      {/* 2nd Section */}
      <div className='w-full flex justify-between mt-4 mb-6'>
        
        {/* Attendance Graph */}
        <div className="w-[45%] bg-white dark:bg-gray-800 px-4 pt-4 rounded-xl  shadow-[0px_5px_24px_0px_#BABABA] dark:shadow-sm">
          <div className='flex flex-wrap justify-between items-center gap-1 mb-4'>
            <h2 className="font-semibold text-md "> Department Attendance</h2>
            <div className="flex gap-1">
                  <select
                    className="border border-gray-300 dark:bg-gray-800 rounded-md py-1 text-sm
                              focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                              focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
            </div>
          </div>
          <AttendanceChart attendanceData={attendanceData} />
        </div>
       
       {/* Attendance Card */}
        <div className="w-[26%] max-w-sm p-4 bg-white dark:bg-gray-800 rounded-xl shadow-[0px_5px_24px_0px_#BABABA] dark:shadow-sm">
      
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-md font-semibold">Attendance Sources</h2>
              <select className="border border-gray-300 dark:bg-gray-800 rounded-md px-1 py-1 text-sm focus:outline-none">
                <option>Date</option>
                <option>Today</option>
                <option>Yesterday</option>
                <option>This week</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.map(({ label, value, gradient }) => (
                <Card key={label} label={label} value={value} gradient={gradient} />
              ))}
            </div>
      
        </div>
        
        {/* Festival Card */}
        <div className="w-[27%] max-w-sm p-4 bg-white dark:bg-gray-800 rounded-xl shadow-[0px_5px_24px_0px_#BABABA] dark:shadow-sm">
            <h2 className="text-md font-semibold mb-2">Festival In June 2025</h2>

            <ul className="space-y-6">
              {festivals.map((f, idx) => (
                <li key={idx}>
                  <FestivalRow {...f} />
                </li>
              ))}
            </ul>
          
        </div>
      </div>

      {/* 3rd Section */} 
      <div className='w-full flex justify-center gap-2 mt-4 mb-6'>
        <div className='w-full'>
          <GaugeCard title="Attendance Percentage" value={percentageCount(totalEmployees, presentCount)} scheme="blue"  label1='present'/>
        </div> 
        <div className='w-full'>
          <GaugeCard title="Absent Percentage" value={percentageCount(totalEmployees, absentCount)} scheme="greyOnBlue" label1='absent' />
        </div> 
        <div className='w-full'>
          <LineCard /> 
        </div>
      </div>

      {/* 4th section Table */}
      <div className="bg-white dark:bg-gray-800  rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Late In Today</h2>
        <div className="flex gap-2 mb-6 overflow-x-auto">
          { departmentTabs?.length > 0 && departmentTabs.map((tab) => (
            <button
              key={tab._id}
              onClick={() => setActiveTab(tab.department)}
              className={`relative px-4 py-2 rounded transition
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
        <LateInToday data={TodaylateIn} activeTab={activeTab} />
      </div>
    </div>
  );
};

function Card({ label, value, gradient }) {
  return (
    <div
      className={`
        h-28 flex flex-col items-center justify-center text-center
        rounded-lg shadow-inner
        bg-gradient-to-br ${gradient}
      `}
    >
      <span className="text-sm font-medium text-white/90">{label}</span>
      <span className="text-2xl font-semibold text-white">{value}</span>
    </div>
  );
}

function FestivalRow({ name, date, barColor }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-300 bg-white dark:bg-gray-600 shadow-sm">
      <div className={`${barColor} w-3 self-stretch rounded-l-xl`} />
      <div className="flex-1 flex items-center justify-between px-2 py-4">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-semibold">{date}</span>
      </div>
    </div>
  );
}

export default Dashboard;
