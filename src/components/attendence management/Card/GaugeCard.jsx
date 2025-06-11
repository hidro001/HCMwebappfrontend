/*
  GaugeCard – faithfully matches UI screenshot
  --------------------------------------------
  ➤ 270° dial, 18 px outer arc
  ➤ dashed guide ring + 10 white ticks
  ➤ 0 / 100 labels at ends
  ➤ sharp triangular needle + hub
  ➤ two colour schemes:  "blue"  or  "greyOnBlue"
  No runtime errors (scriptable ctx fix applied)
*/

import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion, useInView } from 'framer-motion';

/* plugin – draws guide, ticks, needle, labels */
const extras = {
  id: 'extras',
  afterDraw(chart, _a, opts) {
    const ctx   = chart.ctx;
    const meta  = chart.getDatasetMeta(0).data[0];
    const rIn   = meta.innerRadius;
    const rOut  = meta.outerRadius;
    const cx    = meta.x;
    const cy    = meta.y;
    const pct   = chart.data.datasets[0].current ?? 0;
    const start = 225, sweep = 270, rad = d=>d*Math.PI/180;

    ctx.save(); ctx.translate(cx,cy);

    /* dashed guide ring */
    ctx.setLineDash([6,6]);
    ctx.lineWidth   = 2;
    ctx.strokeStyle = '#d1d5db';
    ctx.beginPath();
    ctx.arc(0,0,(rIn+rOut)/2,rad(start),rad(start+sweep)); ctx.stroke();
    ctx.setLineDash([]);

    /* ticks */
    ctx.lineWidth=3; ctx.strokeStyle='#fff';
    for(let i=0;i<=10;i++){
      const a = rad(start + sweep/10*i);
      const r1=rIn*0.92, r2=rIn*0.985;
      ctx.beginPath();
      ctx.moveTo(r1*Math.cos(a),r1*Math.sin(a));
      ctx.lineTo(r2*Math.cos(a),r2*Math.sin(a));
      ctx.stroke();
    }

    /* needle */
    ctx.rotate(rad(start+sweep*pct/100));
    ctx.fillStyle = opts.pointerColor;
    const len=rIn*0.81, base=rIn*0.17;
    ctx.beginPath();
    ctx.moveTo(-base/2,0); ctx.lineTo(0,-len); ctx.lineTo(base/2,0); ctx.closePath(); ctx.fill();

    /* hub */
    ctx.beginPath(); ctx.fillStyle='#fff'; ctx.arc(0,0,base/3,0,Math.PI*2); ctx.fill();
    ctx.restore();

    /* 0 & 100 labels */
    ctx.font='12px Inter, sans-serif'; ctx.fillStyle='#475569'; ctx.textAlign='center';
    const y=cy+rOut*0.66;
    ctx.fillText('0',   cx-rOut*0.78, y);
    ctx.fillText('100', cx+rOut*0.78, y);
  }
};

/* colour palettes */
const schemes={
  blue:{
    arc: sctx=>{
      const g=sctx.chart.ctx.createLinearGradient(0,0,sctx.chart.width,sctx.chart.height);
      g.addColorStop(0,'#1d4ed8'); g.addColorStop(1,'#3b82f6'); return g;
    },
    empty:'#e5e7eb', pointer:'#1d4ed8'
  },
  greyOnBlue:{
    arc:'#6b7280',
    empty:sctx=>{
      const g=sctx.chart.ctx.createLinearGradient(0,0,sctx.chart.width,sctx.chart.height);
      g.addColorStop(0,'#93c5fd'); g.addColorStop(1,'#bfdbfe'); return g;
    },
    pointer:'#475569'
  }
};

export default function GaugeCard({ title, value=0, scheme='blue', label1 }){
  const {arc,empty,pointer}=schemes[scheme]??schemes.blue;
  const ref=useRef(null);
  const iv =useInView(ref,{once:true,amount:0.45});

  const data={
    labels:[label1,'empty'],
    datasets:[{
      data:[value,100-value],
      backgroundColor:sctx=>[
        typeof arc==='function'?arc(sctx):arc,
        typeof empty==='function'?empty(sctx):empty
      ],
      borderWidth:0, current:value
    }]
  };

  const opts={
    rotation:225, circumference:270, cutout:'62%',       // 18-20 px thick
    plugins:{ tooltip:{enabled:false} },
    animation:{ duration:900 },
    responsive:true, maintainAspectRatio:false,
    pointerColor:pointer
  };

  return(
    <motion.div ref={ref}
      initial={{opacity:0,y:30}} animate={iv?{opacity:1,y:0}:{}} transition={{duration:0.45}}
      className="w-full h-full bg-white dark:bg-gray-800 rounded-[14px] shadow-card p-4 flex flex-col"
    >
      <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-2">{title}</h3>

      <div className="relative flex-1">
        <Doughnut data={data} options={opts} plugins={[extras]}/>
        <motion.span
          initial={{opacity:0}} animate={iv?{opacity:1}:{}} transition={{delay:0.55}}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[18%]
                     text-lg font-bold text-gray-700 dark:text-white"
        >
          {value}%
        </motion.span>
      </div>
    </motion.div>
  );
}
