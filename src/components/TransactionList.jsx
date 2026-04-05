import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function TransactionList({ role }) {
  const { transactions, deleteTransaction } = useApp(); // ✅ add delete

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const filtered = transactions
    .filter((tx) =>
      tx.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "latest") return b.id - a.id;
      if (sort === "amount") return b.amount - a.amount;
      return 0;
    });

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

      {/* HEADER */}
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      {/* SEARCH + SORT */}
      <div className="flex justify-between mb-4 gap-4 flex-wrap">

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm w-60 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm outline-none"
        >
          <option value="latest">Latest</option>
          <option value="amount">Amount</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">

          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Name</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Amount</th>
              {role === "admin" && <th className="text-center">Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3">{t.name}</td>
                  <td>{t.date}</td>
                  <td>{t.category}</td>

                  <td
                    className={
                      t.amount < 0
                        ? "text-red-500 font-medium"
                        : "text-green-500 font-medium"
                    }
                  >
                    {t.amount > 0 ? `+${t.amount}` : t.amount}
                  </td>

                  {/* ACTION */}
                  {role === "admin" && (
                    <td className="text-center space-x-3">

                      {/* Edit */}
                      <button className="text-blue-500 hover:underline text-sm">
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>

                    </td>
                  )}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}