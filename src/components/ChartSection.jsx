import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartSection() {
  const data = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 50 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 100 },
    { day: "Sun", value: 120 },
  ];

  return (
    <div className="bg-white  rounded-2xl p-6 shadow-sm border border-gray-100 ">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-lg dark:text-white">
          Balance overview
        </h2>
        <span className="text-sm text-gray-400 dark:text-gray-300">
          7d
        </span>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <defs>
              <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            <XAxis 
              dataKey="day" 
              stroke="#9ca3af"  // better in dark mode
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                borderRadius: "8px",
                color: "#fff",
                border: "none",
              }}
              formatter={(value) => [`₹${value}`, "Balance"]}
            />

            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}