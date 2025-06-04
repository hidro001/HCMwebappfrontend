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

/**
 * AttendanceChart – refined shadow + optional fixed‑height cap
 * -----------------------------------------------------------
 *   • Uses colour‑tinted drop‑shadow (no more black halo)
 *   • Top cap can be either
 *        – dynamic (100 – value)  👉 default
 *        – or a fixed N % height  👉 set `FIXED_CAP = X` below
 */

// ────────────────────────────────────────────────────────────
// CONFIG
// Set to a percentage (0‑100) if you want **constant** cap height.
// Leave `null` to keep the dynamic (100 – value) behaviour.
const FIXED_CAP = null; // e.g. 15  → every bar gets a 15 % pale cap
// ────────────────────────────────────────────────────────────

const rawData = [
  { name: "Checked In", value: 85 },
  { name: "Late In", value: 40 },
  { name: "Absent", value: 35 },
  { name: "On Leave", value: 55 },
];

// Gradient palettes
const PALETTE = {
  "Checked In": {
    solid: { start: "#36D1DC", end: "#5B86E5" },
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

// Assemble dataset with a cap field (dynamic or fixed)
const data = rawData.map((d) => {
  const cap = FIXED_CAP != null ? FIXED_CAP : 100 - d.value;
  return { ...d, cap };
});

// Custom striped bar shape (gradient base + stripe overlay)
const StripedBar = (props) => {
  const { x, y, width, height, payload, radius = [0, 0, 8, 8] } = props;
  if (height <= 0 || width <= 0) return null;
  const base = payload.name.replace(/\s+/g, "");
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius[0]}
        ry={radius[0]}
        fill={`url(#${base}Solid)`}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius[0]}
        ry={radius[0]}
        fill={`url(#${base}Stripes)`}
      />
    </g>
  );
};

const AttendanceChart = () => (
  <div className="w-full max-w-4xl mx-auto">
    {/* Legend */}
    <div className="flex justify-center gap-8 mb-6 flex-wrap">
      {Object.keys(PALETTE).map((key) => (
        <div key={key} className="flex items-center gap-2">
          <span
            className="w-6 h-3 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${PALETTE[key].solid.start}, ${PALETTE[key].solid.end})`,
            }}
          />
          <span className="text-sm font-semibold text-gray-700 tracking-wide">
            {key.toUpperCase()}
          </span>
        </div>
      ))}
    </div>

    {/* Chart */}
    <ResponsiveContainer width="80%" height="80%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        barCategoryGap={60}
        barSize={45}
      >
        {/* Gradients, stripes, tinted shadows */}
        <defs>
          {data.map((d) => {
            const base = d.name.replace(/\s+/g, "");
            const solidId = `${base}Solid`;
            const lightId = `${base}Light`;
            const stripeId = `${base}Stripes`;
            const shadowId = `${base}Shadow`;

            const {
              solid: { start: sStart, end: sEnd },
              light: { start: lStart, end: lEnd },
            } = PALETTE[d.name];

            return (
              <React.Fragment key={d.name}>
                {/* Primary gradient */}
                <linearGradient id={solidId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sStart} />
                  <stop offset="100%" stopColor={sEnd} />
                </linearGradient>

                {/* Cap gradient */}
                <linearGradient id={lightId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lStart} />
                  <stop offset="100%" stopColor={lEnd} />
                </linearGradient>

                {/* Stripe pattern */}
                <pattern
                  id={stripeId}
                  patternUnits="userSpaceOnUse"
                  width="8"
                  height="8"
                  patternTransform="rotate(45)"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="4"
                  />
                </pattern>

                {/* Colour‑tinted shadow – uses light gradient end colour */}
                <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="4"
                    floodColor={lEnd}
                    floodOpacity="0.45"
                  />
                </filter>
              </React.Fragment>
            );
          })}
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 14, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 12, fill: "#6b7280" }}
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          formatter={(v, key) => (key === "value" ? `${v}%` : undefined)}
          contentStyle={{ borderRadius: "0.5rem" }}
        />

        {/* Bottom – value */}
        <Bar
          dataKey="value"
          stackId="a"
          shape={StripedBar}
          radius={[8, 0, 8, 8]}
          isAnimationActive={false}
        />

        {/* Top – cap with tinted shadow */}
        <Bar dataKey="cap" stackId="a" radius={[8, 8, 0, 0]} isAnimationActive={false}>
          {data.map((d, i) => {
            const base = d.name.replace(/\s+/g, "");
            return (
              <Cell
                key={i}
                fill={`url(#${base}Light)`}
                filter={`url(#${base}Shadow)`}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default AttendanceChart;
