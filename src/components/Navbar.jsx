import { Bell, Settings } from "lucide-react";

export default function Navbar({ role, setRole ,darkMode,setDarkMode}) {
  return (
    <div className="px-6 pt-4">

      <div className="max-w-[1400px] mx-auto bg-white rounded-xl px-6 py-3 flex items-center justify-between shadow-sm border border-gray-100">

        {/* LEFT */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-72">
          <input
            type="text"
            placeholder="Quick search"
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <button
  onClick={() => setDarkMode(!darkMode)}
  className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm"
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

          {/* ROLE SWITCH */}
         <div className="flex bg-gray-100 rounded-lg p-1">

  <button
    onClick={() => setRole("viewer")}
    className={`px-3 py-1 rounded text-sm transition ${
      role === "viewer"
        ? "bg-white shadow font-medium"
        : "text-gray-500"
    }`}
  >
    Viewer
  </button>

  <button
    onClick={() => setRole("admin")}
    className={`px-3 py-1 rounded text-sm transition ${
      role === "admin"
        ? "bg-white shadow font-medium"
        : "text-gray-500"
    }`}
  >
    Admin
  </button>

</div>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium">Michael Johnson</p>
              <p className="text-gray-500 text-xs">
                m.johnson@finexo.com
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}