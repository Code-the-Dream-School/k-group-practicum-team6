import { Clock, Smile, Target } from "lucide-react";
import { StatCard } from "./StatCard";

//mocked stats
const stats = [
  {
    id: "time_spent",
    label: "Time Spent",
    value: "10h 0m",
    sub: "Total study time",
  },
  {
    id: "avg_focus",
    label: "Average Focus",
    value: "3.0 / 5",
    sub: "Across all sessions",
  },
  {
    id: "mood",
    label: "Overall Mood",
    value: "10x!",
    sub: "Most common mood",
  },
];

//color mock
const COLOR_MAP = {
  time_spent: {
    icon: "text-green-500",
    bg: "#ECFDF5",
  },
  avg_focus: {
    icon: "text-blue-500",
    bg: "#EFF6FF",
  },
  mood: {
    icon: "text-purple-500",
    bg: "#F5F3FF",
  },
};

// icons mock
const ICONS_MAP = {
  time_spent: Clock,
  avg_focus: Target,
  mood: Smile,
};

export default function Stats() {
  return (
    <>
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          sub={stat.sub}
          icon={ICONS_MAP[stat.id]}
          color={COLOR_MAP[stat.id]}
        />
      ))}
    </>
  );
}
