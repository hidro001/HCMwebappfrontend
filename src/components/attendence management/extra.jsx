import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";



const TOTAL_EMPLOYEES = 200;

const rawData = [
  { name: "Checked In", value: 110 },
  { name: "Late In", value: 40 },
  { name: "Absent", value: 20 },
  { name: "On Leave", value: 30 },
];

const PALETTE = {
  "Checked In": {
    solid: { start: "#5B86E5", end: "#36D1DC" },
    light: { start: "#DDEAFF", end: "#DDEAFF" },
  },
  "Late In": {
    solid: { start: "#F7971E", end: "#FFD200" },
    light: { start: "#FFE6C5", end: "#FFE6C5" },
  },
  Absent: {
    solid: { start: "#D0D0D0", end: "#A8A8A8" },
    light: { start: "#E8E8E8", end: "#E8E8E8" },
  },
  "On Leave": {
    solid: { start: "#F86565", end: "#E19692" },
    light: { start: "#FFDADA", end: "#FFDADA" },
  },
};

// Build data with running remainder caps
let cumulative = 0;
const data = rawData.map((d) => {
  const capCount = Math.max(0, TOTAL_EMPLOYEES - (cumulative + d.value));
  cumulative += d.value;
  return {
    name: d.name,
    valueCount: d.value,
    capCount,
    value: (d.value / TOTAL_EMPLOYEES) * 100,
    cap: (capCount / TOTAL_EMPLOYEES) * 100,
  };
});

// ── Striped bar – rounds top if no cap ─────────────────────
const StripedBar = ({ x, y, width, height, payload }) => {
  if (height <= 0 || width <= 0) return null;
  const base = payload.name.replace(/\s+/g, "");
  const r = 8;
  const hasCap = payload.cap > 0; // % value from processed data

  // Case A: there **is** a cap → square top, rounded bottom
  if (hasCap) {
    const d = [
      `M${x},${y}`,
      `h${width}`,
      `v${height - r}`,
      `q0,${r} -${r},${r}`,
      `h-${width - 2 * r}`,
      `q-${r},0 -${r}-${r}`,
      `Z`,
    ].join(" ");
    return (
      <g>
        <path d={d} fill={`url(#${base}Solid)`} />
        <path d={d} fill={`url(#${base}Stripes)`} />
      </g>
    );
  }

  // Case B: cap == 0 → fully rounded rectangle
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={`url(#${base}Solid)`} />
      <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={`url(#${base}Stripes)`} />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const entry = payload.find((p) => p.dataKey === "value");
  if (!entry) return null;
  return (
    <div className="rounded-lg bg-white/95 backdrop-blur shadow p-3 text-sm font-medium text-gray-800">
      <p className="mb-1">{label}</p>
      <p>
        count : {entry.payload.valueCount} / {TOTAL_EMPLOYEES}
      </p>
    </div>
  );
};

const AttendanceChart = () => (
  <div className="w-full max-w-5xl mx-auto">
    {/* Legend */}
    <div className="flex justify-end gap-2 mb-3 ">
      {Object.keys(PALETTE).map((key) => (
        <div key={key} className="flex items-center gap-2">
          <span
            className="w-5 h-3 rounded-full"
            style={{ background: `linear-gradient(90deg, ${PALETTE[key].solid.start}, ${PALETTE[key].solid.end})` }}
          />
          <span className="text-xs font-medium text-gray-700 tracking-wide">{key.toUpperCase()}</span>
        </div>
      ))}
    </div>

    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barCategoryGap={60} barSize={50}>
        <defs>
          {data.map((d) => {
            const base = d.name.replace(/\s+/g, "");
            const solidId = `${base}Solid`;
            const lightId = `${base}Light`;
            const stripeId = `${base}Stripes`;
            const shadowId = `${base}Shadow`;
            const {
              solid: { start: sStart, end: sEnd },
              light: { end: lEnd },
            } = PALETTE[d.name];
            return (
              <React.Fragment key={d.name}>
                <linearGradient id={solidId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sStart} />
                  <stop offset="100%" stopColor={sEnd} />
                </linearGradient>
                <linearGradient id={lightId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PALETTE[d.name].light.start} />
                  <stop offset="100%" stopColor={PALETTE[d.name].light.end} />
                </linearGradient>
                <pattern id={stripeId} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                </pattern>
                <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={lEnd} floodOpacity="0.35" />
                </filter>
              </React.Fragment>
            );
          })}
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#6b7280" }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12, fill: "#6b7280" }} domain={[0, 100]} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

        <Bar dataKey="value" stackId="a" shape={StripedBar} isAnimationActive={false} />
        <Bar dataKey="cap" stackId="a" radius={[8, 8, 0, 0]} isAnimationActive={false}>
          {data.map((d, i) => {
            const base = d.name.replace(/\s+/g, "");
            return <Cell key={i} fill={`url(#${base}Light)`} filter={`url(#${base}Shadow)`} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AttendanceChart;
