import { Clock, Target, Smile } from "lucide-react";
import { StatCard } from "./StatCard";
import { useContext } from "react";
import { StatsContext } from "../../contexts/StatsContext.jsx";

const COLOR_MAP = {
  timeSpent: { icon: "text-green-500", bg: "#ECFDF5" },
  averageFocus: { icon: "text-blue-500", bg: "#EFF6FF" },
  overallMood: { icon: "text-purple-500", bg: "#F5F3FF" },
};

const ICONS_MAP = {
  timeSpent: Clock,
  averageFocus: Target,
  overallMood: Smile,
};

export default function Stats() {
  const { stats } = useContext(StatsContext);

  const displayStats = [
    {
      key: "timeSpent",
      label: "Time Spent",
      value: stats
        ? `${stats.timeSpent.hours}h ${stats.timeSpent.minutes}m`
        : null,
      sub: "Total study time",
    },
    {
      key: "averageFocus",
      label: "Average Focus",
      value: stats?.averageFocus ?? "no stats",
      sub: "Across all sessions",
    },
    {
      key: "overallMood",
      label: "Overall Mood",
      value: stats?.overallMood || "no stats",
      sub: "Most common this week",
    },
  ];

  return (
    <>
      {displayStats.map(({ key, label, value, sub }) => (
        <StatCard
          key={key}
          label={label}
          value={value}
          sub={sub}
          icon={ICONS_MAP[key]}
          color={COLOR_MAP[key]}
        />
      ))}
    </>
  );
}
