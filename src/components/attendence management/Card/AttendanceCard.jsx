import { GiUmbrella } from "react-icons/gi";
import { BsPersonFillX } from "react-icons/bs";
import { TbClockHour3Filled } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";
import { FaUsers} from "react-icons/fa";
import { motion } from "framer-motion";

const AttendanceCards = ({attendanceData = {}, data=''}) => {
   const {
    totalSubordinates  = 0,
    presentCount     = 0,
    absentCount      = 0,
    onLeaveCount     = 0,
    lateCount        = 0,
    totalEmployees  = 0,
  } = attendanceData;

    const cards = [
      {
        title: data === 'team' ? 'My Team' :"Our Employees",
        count: totalSubordinates || totalEmployees,
        gradient: "bg-[linear-gradient(57deg,_#56AB2F_5.45%,_#A8E063_85.58%)]",
        icon: <FaUsers className="text-3xl text-[#6CC947]" />,
      },
      {
        title: "Checked In",
        count: presentCount,
        gradient: "bg-[linear-gradient(57deg,_#36D1DC_9.92%,_#5B86E5_90.08%)]",
        icon: <IoMdCheckmark className="text-3xl text-[#32B1F4]" />,
      },
      {
        title: "Absent",
        count: absentCount,
        gradient: "bg-[linear-gradient(90deg,_#848A96_1.76%,_#5C5C5C_100%)]",
        icon: <GiUmbrella className="text-3xl text-[#5C5C5C]" />,
      },
      {
        title: "On Leave",
        count: onLeaveCount,
        gradient: "bg-[linear-gradient(90deg,_#F76363_1.76%,_#F88484_100%)]",
        icon: <BsPersonFillX className="text-3xl text-[#F06464]" />,
      },
      {
        title: "Late In",
        count: lateCount,
        gradient: "bg-[linear-gradient(56deg,_#F68F54_8.67%,_#FFA962_92.17%)]",
        icon: <TbClockHour3Filled className="text-3xl text-[#FFA654]" />,
      },
    ];
    
  return (
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
  )
}

export default AttendanceCards