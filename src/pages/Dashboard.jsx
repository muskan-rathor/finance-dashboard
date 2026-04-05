// pages/Dashboard.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import ChartSection from "../components/ChartSection";
import CategoryChart from "../components/CategoryChart";
import TransactionList from "../components/TransactionList";
import { useApp } from "../context/AppContext";

export default function Dashboard() {

  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);
  const { addTransaction , transactions,setIncome,income} = useApp();

  const totalExpenses = transactions
  .filter(t => t.amount < 0)
  .reduce((acc, t) => acc + t.amount, 0);

const totalCredits = transactions
  .filter(t => t.amount > 0)
  .reduce((acc, t) => acc + t.amount, 0);

const balance = income + totalCredits + totalExpenses;

const savings = balance - Math.abs(totalExpenses);



// 📊 CATEGORY CALCULATION
const categoryMap = {};

transactions.forEach(t => {
  if (t.amount < 0) {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + Math.abs(t.amount);
  }
});

// 🏆 TOP CATEGORY
const topCategory = Object.keys(categoryMap).length
  ? Object.keys(categoryMap).reduce((a, b) =>
      categoryMap[a] > categoryMap[b] ? a : b
    )
  : "None";

// 💰 HIGHEST EXPENSE
const highestExpense = Math.max(
  ...transactions.filter(t => t.amount < 0).map(t => Math.abs(t.amount)),
  0
);

// 📈 TOTAL TRANSACTIONS
const totalTransactions = transactions.length;

// 💵 SAVINGS %
const savingsRate = balance > 0
  ? Math.round((savings / balance) * 100)
  : 0;
  return (
        

<div className={`${darkMode ? "dark" : ""} flex min-h-screen bg-[#f8fafc] dark:bg-gray-900`}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 ml-64">
        <Navbar role={role} setRole={setRole} darkMode={darkMode} setDarkMode={setDarkMode} />

  <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-8">


           {/* Role Switch */}
          <div className="flex gap-3 justify-end mb-4">

           {role === "admin" && (
  <div className="flex gap-3 justify-end mb-4">

    <input
      type="number"
      placeholder="Enter total income"
      onChange={(e) => setIncome(Number(e.target.value))}
      className="border px-3 py-2 rounded-lg"
    />

    <button
      onClick={() =>
        addTransaction({
          id: Date.now(),
          name: "Expense",
          amount: -300,
          category: "Food",
        })
      }
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      + Add Expense
    </button>

  </div>
)}

</div>



          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <SummaryCard title="Balance" amount={balance} />
            <SummaryCard title="Income" amount={income} />
            <SummaryCard title="Expenses" amount={Math.abs(totalExpenses)}/>
            <SummaryCard title="Saved" amount={savings} />
          </div>




 {/* 🔥 MAIN DASHBOARD GRID */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

  {/* ================= LEFT SIDE ================= */}
  <div className="xl:col-span-2 space-y-6">

  {/* Big Chart */}
  <ChartSection />

  {/* NEW SMALL CARDS (PASTE HERE 👇) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    <div className="bg-white  p-5 rounded-2xl shadow-sm border">
      <h3 className="text-sm text-gray-500 mb-2">Monthly spending limit</h3>
      <div className="h-2 bg-gray-200 rounded-full">
        <div className="h-2 w-2/3 bg-green-400 rounded-full"></div>
      </div>
      <p className="text-xs text-gray-400 mt-2">$6,400 / $10,000</p>
    </div>

    <div className="bg-white  p-5 rounded-2xl shadow-sm border">
      <h3 className="font-medium mb-2">Optimize your budget</h3>
      <p className="text-sm text-gray-500">
        Start preparing for savings with tips.
      </p>
    </div>

  </div>

  {/* Category Chart */}
  <CategoryChart />

</div>


  {/* ================= RIGHT SIDE ================= */}
  <div className="space-y-6">

    {/* My Card */}
    <div className="bg-white  p-5 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="font-semibold mb-4">My Card</h2>

      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-5 rounded-xl">
        <p className="text-sm opacity-80">Debit Card</p>
        <p className="mt-4 text-lg tracking-widest">**** 7890</p>
        <p className="mt-2 text-sm">Michael Johnson</p>
      </div>
    </div>

    {/* Quick Payment */}
   {/* QUICK ACTIONS */}
<div className="bg-white  p-5 rounded-2xl shadow-sm border">
  <div className="grid grid-cols-4 gap-3 text-center text-xs">
    {["Top up", "Send", "Request", "More"].map((item, i) => (
      <div key={i} className="bg-gray-100 p-3 rounded-lg">
        {item}
      </div>
    ))}
  </div>
</div>

{/* AVATAR PAYMENTS */}
<div className="bg-white  p-5 rounded-2xl shadow-sm border">
  <h3 className="text-sm mb-3">Quick payment</h3>
  <div className="flex gap-2">
    {[1,2,3,4,5].map((i) => (
      <img
        key={i}
        src={`https://i.pravatar.cc/40?img=${i}`}
        className="w-8 h-8 rounded-full"
      />
    ))}
  </div>
</div>

    {/*Insights */}
   <div className="bg-white  p-5 rounded-2xl shadow-sm border">
  <h2 className="font-semibold mb-4">Insights</h2>

  <div className="space-y-3 text-sm text-gray-600">

    <div className="flex justify-between">
      <span>💸 Highest spending</span>
      <span className="font-medium text-gray-800">{topCategory}</span>
    </div>

    <div className="flex justify-between">
      <span>📈 Income growth</span>
      <span className="text-green-500 font-medium">+12%</span>
    </div>

    <div className="flex justify-between">
      <span>🧾 Total transactions</span>
      <span className="font-medium">{totalTransactions}</span>
    </div>

    <div className="flex justify-between">
      <span>💰 Savings rate</span>
      <span className="text-blue-500 font-medium">{savingsRate}%</span>
    </div>

    <div className="flex justify-between">
      <span>⚠️ Highest expense</span>
      <span className="text-red-500 font-medium">₹{highestExpense}</span>
    </div>

  </div>
</div>

 </div>  {/* END GRID */}

{/* ✅ NOW PASTE INSIGHTS HERE */}


</div>
        

          {/* Transactions */}
          <div className="mt-6">
            <TransactionList role={role}/>
          </div>

        </div>
  </div>
</div>
    
  );
}