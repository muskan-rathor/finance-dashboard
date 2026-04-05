import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Wallet, BarChart, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${collapsed ? "w-20" : "w-64"} fixed top-0 left-0 h-screen bg-white border-r border-gray-100 p-4 transition-all duration-300 flex flex-col justify-between overflow-y-auto`}>

      {/* TOP */}
      <div>
        <h1 className="text-xl font-bold mb-6">
          {collapsed ? "A" : "ACRU"}
        </h1>

        <div className="space-y-2">

          {/* Dashboard */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition ${
                isActive ? "bg-gray-200 font-semibold" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Home size={18} />
            {!collapsed && "Dashboard"}
          </NavLink>

          {/* Accounts */}
          <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Wallet size={18} />
            {!collapsed && "Accounts"}
          </div>

          {/* Budget */}
          <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <BarChart size={18} />
            {!collapsed && "Budget"}
          </div>

          {/* Transactions */}
          <div>
            <div
              onClick={() => setOpen(!open)}
              className="flex justify-between items-center p-2 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <CreditCard size={18} />
                {!collapsed && "Transactions"}
              </div>

              {!collapsed && <span className="text-xs">{open ? "▲" : "▼"}</span>}
            </div>

            {open && !collapsed && (
              <div className="ml-8 mt-2 text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>History</span>
                  <span className="bg-black text-white px-2 rounded-full text-xs">19</span>
                </div>
                <div>Integration</div>
                <div>Reports</div>
              </div>
            )}
          </div>

          {/* Other */}
          <div className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            {!collapsed && "Cash flow"}
          </div>

          <div className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            {!collapsed && "Budget"}
          </div>

          <div className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            {!collapsed && "Investments"}
          </div>

          {!collapsed && (
            <>
              <div className="mt-6 text-gray-500 text-sm">Learning center</div>
              <div className="text-gray-500 text-sm">Support</div>
            </>
          )}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="space-y-3">

        {!collapsed && (
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="font-semibold">Upgrade to Pro!</p>
            <p className="text-sm text-gray-600 mt-1">
              Full financial insights with analytics
            </p>

            <button className="mt-3 bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition">
              Upgrade now
            </button>
          </div>
        )}

        {/* Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

      </div>
    </div>
  );
}