import React, {useEffect, useRef} from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';
import { FaCheck } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { GiUmbrella } from "react-icons/gi";
import { BsPersonFillX } from "react-icons/bs";
import { TbClockHour3Filled } from "react-icons/tb";
import { motion, useAnimation } from "framer-motion";
import DonutChart from './DonutChart';
import { IoMdCheckmark } from "react-icons/io";
import { FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";
import { borderRadius } from '@mui/system';
import ChartComponent from './extra';
import AttendanceChart from './extra';
ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const Dashboard = () => {
 const chartRef = useRef();

const cards = [
  {
    title: "Our Employees",
    count: 200,
    gradient: "bg-[linear-gradient(57deg,_#56AB2F_5.45%,_#A8E063_85.58%)]",
    icon: <FaUsers className="text-3xl text-[#6CC947]" />,
  },
  {
    title: "Checked In",
    count: 200,
    gradient: "bg-[linear-gradient(57deg,_#36D1DC_9.92%,_#5B86E5_90.08%)]",
    icon: <IoMdCheckmark className="text-3xl text-[#32B1F4]" />,
  },
  {
    title: "Absent",
    count: 200,
    gradient: "bg-[linear-gradient(90deg,_#848A96_1.76%,_#5C5C5C_100%)]",
    icon: <GiUmbrella className="text-3xl text-[#5C5C5C]" />,
  },
  {
    title: "On Leave",
    count: 200,
    gradient: "bg-[linear-gradient(90deg,_#F76363_1.76%,_#F88484_100%)]",
    icon: <BsPersonFillX className="text-3xl text-[#F06464]" />,
  },
  {
    title: "Late In",
    count: 200,
    gradient: "bg-[linear-gradient(56deg,_#F68F54_8.67%,_#FFA962_92.17%)]",
    icon: <TbClockHour3Filled className="text-3xl text-[#FFA654]" />,
  },
];

  const stats = [
   {title:'Total Employees', data: 200, icon: MdPeopleAlt, color: 'bg-gradient-to-r from-[#10B981] via-[#0FAF7A] to-[#0CA975]', iconColor : 'green-600'},
   {title:'Checked In', data: 174, icon: FaCheck, color: 'bg-gradient-to-r from-[#3B82F6] to-[#3D90F8]', iconColor: 'blue-500'},
   {title:'On Leave', data: 10, icon: GiUmbrella, color: 'bg-gradient-to-r from-[#E74644] to-[#FF6666]', iconColor: 'red-500'},
   {title:'Absent', data: 6, icon: BsPersonFillX, color: 'bg-gradient-to-r from-[#444444] to-[#3F3D3D]', iconColor: 'gray-500'},
   {title:'Late In', data: 200, icon: TbClockHour3Filled, color: 'bg-gradient-to-r from-[#F59E0B] to-[#FAAC67]', iconColor: 'orange-500'}
  ];

  
   const data = {
    labels: ['IT', 'HR', 'React', 'On Time', 'BPO'],
    datasets: [
      // {
      //   label: 'TOTAL EMPLOYEES',
      //   data: [100, 100, 100, 100, 100],
      //   backgroundColor: '#00C49F',
      //   borderRadius: 15,
      // },
      {
        label: 'CHECKED IN',
        data: [100, 89, 100, 60, 92],
        backgroundColor: '#3B82F6',
        borderRadius: 15,
        barThickness: 10,
      },
      {
        label: 'LATE IN',
        data: [49, 30, 49, 79, 49],
        backgroundColor: '#F59E0B',
        borderRadius: 15,
        barThickness: 10,
      },
      {
        label: 'ON LEAVE',
        data: [28, 28, 28, 28, 28],
        backgroundColor: '#E74644',
        borderRadius: 15,
         barThickness: 10,
      },
      
      {
        label: 'ABSENT',
        data: [20, 20, 20, 20, 20],
        backgroundColor: '#444444',
        borderRadius: 15,
         barThickness: 10,
      }
    ]
  };

  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 12,
        padding: 16,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 12,
          weight: '500',
        }
      }
    }
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        callback: function(value) {
          return value + '%';
        },
        font: {
          size: 12
        }
      },
      grid: {
        drawBorder: false,
      }
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12
        }
      }
    }
  }
};

  const totalEmployees = stats.find(stat => stat.title === 'Total Employees')?.data || 0;
const checkedIn = stats.find(stat => stat.title === 'Checked In')?.data || 0;
const absent = stats.find(stat => stat.title === 'Absent')?.data || 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <div className="mr-4 ">
        <DonutChart totalEmployees={200} checkedIn={174} onLeave={10} absent={6} />
      </div> */}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 mb-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`relative py-6 px-3 rounded-xl shadow-md text-white overflow-hidden ${card.gradient} shadow-[0px_5px_24px_0px_#BABABA]`}
          >
          <div className="absolute bottom-0 right-0 w-44 h-44 z-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

                <circle cx="200" cy="200" r="45" fill="none" stroke="rgba(255, 255, 255, 0.09)" strokeWidth="17" filter="url(#softGlow)"/>
                <circle cx="145" cy="198" r="38" fill="none" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="17" filter="url(#softGlow)" />
                <circle cx="198" cy="145" r="36" fill="none" stroke="rgba(255, 255, 255, 0.065)" strokeWidth="17" filter="url(#softGlow)"/>
            </svg>
          </div>

            <div className="relative z-10 flex items-center gap-2">
              <div className='p-3 rounded-full bg-white/40 shadow-[0_0_60px_20px_rgba(255,255,255,0.3)]'>
                <div className="p-2 rounded-full bg-white/50 shadow-[0_0_60px_20px_rgba(255,255,255,0.3)]">
                  {card.icon}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold">{card.count}</div>
                <div className="text-mg mt-1">{card.title}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
       
       <div className='w-full flex justify-center'>
        
          <div className=" w-full bg-white mr-2 p-4 rounded shadow-md mb-6">
            <h2 className="font-semibold text-md mb-2">Today Department Attendance</h2>
            {/* <Bar data={data} options={options} /> */}
            {/* <ChartComponent /> */}
            <AttendanceChart />
          </div>

        
            
        <div className="w-full grid grid-cols-2 gap-2 mb-2">
          <Gauge title="Attendance Percentage" percentage={(checkedIn / totalEmployees) * 100} />
          <Gauge title="Absent Percentage" percentage={(absent / totalEmployees) * 100} />
        </div>
        {/* <div className="w-full bg-white p-3 rounded shadow-sm ">
                <p className='text-blue-500 font-semibold text-md mb-2'>Attendance Sources</p>
                <div className='grid grid-cols-3 gap-4'>
                <div className=" bg-blue-50 p-4 text-center rounded shadow-md">
                  <h3 className="text-sm font-semibold mb-1">Device Check-in</h3>
                  <p className="text-lg font-bold">200</p>
                </div>
                <div className="bg-red-50 p-4 text-center rounded shadow-md">
                  <h3 className="text-sm font-semibold mb-1">App Check-in</h3>
                  <p className="text-lg font-bold">200</p>
                </div>
                <div className="bg-orange-50 p-4 text-center rounded shadow-md">
                  <h3 className="text-sm font-semibold mb-1">Manual Check-in</h3>
                  <p className="text-lg font-bold">200</p>
                </div>
              </div>
        </div> */}
        
        

      </div>
    </div>
  );
};

const Gauge = ({ title, percentage }) => {
  const strokeWidth = 4;
  const radius = 15.9155;
  const dashArray = 100;
  const dashOffset = dashArray - percentage;

  const gradientId = title.includes("Attendance")
    ? "attendanceGradient"
    : title.includes("Absent")
    ? "absentGradient"
    : "defaultGradient";

  return (
    <div className="bg-white p-2 rounded-md shadow-lg flex flex-col items-center w-full">
      <h2 className="font-semibold text-sm mb-3 text-gray-700 text-center">{title}</h2>

      <div className="relative w-full aspect-square">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"  
            strokeWidth={strokeWidth}
          />
          <defs>
            <linearGradient id="attendanceGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" /> {/* green-400 */}
              <stop offset="100%" stopColor="#059669" /> {/* green-600 */}
            </linearGradient>
            <linearGradient id="absentGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FCA5A5" /> {/* red-300 */}
              <stop offset="100%" stopColor="#EF4444" /> {/* red-500 */}
            </linearGradient>
            <linearGradient id="defaultGradient" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93C5FD" /> {/* blue-300 */}
              <stop offset="100%" stopColor="#3B82F6" /> {/* blue-500 */}
            </linearGradient>
          </defs>

          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashArray}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 3px rgba(0,0,0,0.15))"
            }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-800">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

const Speedometer = ({ speed = 75 }) => {
  const angle = (speed / 180) * 270; // 0-180 km/h to 0-270 degrees

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Background circle */}
      <div className="absolute w-full h-full rounded-full border-8 border-gray-800" />

      {/* Dynamic arc */}
      <svg className="absolute w-full h-full rotate-[135deg]">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="#333"
          strokeWidth="10%"
          fill="transparent"
          strokeDasharray="565"
          strokeDashoffset="0"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          stroke="#facc15"
          strokeWidth="10%"
          fill="transparent"
          strokeDasharray="565"
          strokeDashoffset={565 - (565 * angle) / 270}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 565 }}
          animate={{ strokeDashoffset: 565 - (565 * angle) / 270 }}
          transition={{ duration: 1 }}
        />
      </svg>

      {/* Speed Text */}
      <div className="z-10 text-white text-5xl font-bold">
        {speed}
        <div className="text-sm text-gray-400">km/h</div>
      </div>
    </div>
  );
};

const SemiCircularProgressBar = ({ progress = 75, size = 200, strokeWidth = 15 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;

  const offset = circumference * ((100 - progress) / 100);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ strokeDashoffset: offset });
  }, [offset, controls]);

  return (
    <div className="flex justify-center items-center">
      <svg
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 2}`}
        className="rotate-180"
      >
        {/* Background arc */}
        <path
          d={describeArc(size / 2, size / 2, radius, 0, 180)}
          fill="none"
          stroke="#e5e7eb" // Tailwind gray-200
          strokeWidth={strokeWidth}
        />
        {/* Animated progress arc */}
        <motion.path
          d={describeArc(size / 2, size / 2, radius, 0, 180)}
          fill="none"
          stroke="#3b82f6" // Tailwind blue-500
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={controls}
          transition={{ duration: 1 }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}


export default Dashboard;
