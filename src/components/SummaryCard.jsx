export default function SummaryCard({ title, amount }) {
  return (
    <div className="bg-white  p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{amount}</h2>
    </div>
  );
}