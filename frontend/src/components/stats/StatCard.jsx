import { Card } from "flowbite-react";

export function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <Card className="bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 w-70 max-w-[100%]">
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <div
          className="flex items-center justify-center w-[25px] h-[25px] rounded-[5px]"
          style={{ backgroundColor: color.bg }}
        >
          {Icon && <Icon size={18} className={`${color?.icon}`} />}
        </div>
        <span>{label}</span>
      </div>

      <div className="text-2xl font-medium mt-2">{value}</div>

      <div className="text-xs text-gray-400">{sub}</div>
    </Card>
  );
}
