import React,{useRef} from 'react';
import { Line } from 'react-chartjs-2';
import { motion,useInView } from 'framer-motion';

export default function LineCard(){
  const ref=useRef(null); const iv=useInView(ref,{once:true});
  const labels=['1 Week','2 Week','3 Week','4 Week'];
  const present=[30,45,65,50], absent=[18,30,48,40];

  const data = {
  labels,
  datasets: [
    {
      label                : 'Present',
      data                 : present,
      tension              : 0,          
      fill                 : true,
      pointRadius          : 6,
      borderWidth          : 2,

      borderColor          : '#B8E2F7',

      pointBackgroundColor : '#0284c7',  

      backgroundColor      : ctx => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        g.addColorStop(0, 'rgba(184,226,247,.45)');  // 35 % opacity of #B8E2F7
        g.addColorStop(1, 'rgba(184,226,247,.06)');  //   6 %
        return g;
      }
    },

    {
      label                : 'Absent',
      data                 : absent,
      tension              : 0,
      fill                 : true,
      pointRadius          : 6,
      borderWidth          : 2,

      borderColor          : '#CDF8EA',

      pointBackgroundColor : '#22c55e',  

      backgroundColor      : ctx => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        g.addColorStop(0, 'rgba(205,248,234,.80)'); 
        g.addColorStop(1, 'rgba(205,248,234,.04)');  
        return g;
      }
    }
  ]
};


  const opts={plugins:{legend:{display:false},tooltip:{enabled:false}},
              scales:{y:{min:0,max:100,ticks:{stepSize:20},
                         grid:{color:'#e2e8f0',borderDash:[4,4]}},
                      x:{grid:{display:false}}},animation:{duration:900}};

  return(
    <motion.div ref={ref}
      initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.45}}
      className="flex-1 w-full h-full bg-white rounded-[14px] shadow-card p-4"
    >
      <div className="flex justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Monthly Attendance Graphs</h3>
        <select className="border text-xs rounded px-2 py-1"><option>Months</option></select>
      </div>
      <Line data={data} options={opts} height={165}/>
    </motion.div>
  );
}
