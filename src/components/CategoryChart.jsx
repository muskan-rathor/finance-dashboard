// components/CategoryChart.jsx
import { useApp } from "../context/AppContext";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444", "#a855f7"];

export default function CategoryChart() {
  const { transactions } = useApp();

  const dataMap = {};

  transactions.forEach((t) => {
    if (t.amount < 0) {
      dataMap[t.category] =
        (dataMap[t.category] || 0) + Math.abs(t.amount);
    }
  });

  let chartData = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  // ✅ DEFAULT DATA (NO EMPTY UI)
  if (chartData.length === 0) {
    chartData = [
      { name: "Food", value: 400 },
      { name: "Shopping", value: 300 },
      { name: "Bills", value: 200 },
      { name: "Other", value: 100 },
    ];
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border">
      <h2 className="font-semibold mb-4">Spending Breakdown</h2>

      <div className="flex justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}