export function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 w-[200px] max-w-[100%]">
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <div
          className="flex items-center justify-center w-[25px] h-[25px] rounded-[5px]"
          style={{ backgroundColor: color.bg }}
        >
          {Icon && <Icon size={18} className={`${color?.icon}`} />}
        </div>
        <span>{label}</span>
      </div>

      <div className="text-2xl font-semibold mt-2">{value}</div>

      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  );
}
