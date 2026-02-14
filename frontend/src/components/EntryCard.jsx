import { Button, Card } from "flowbite-react";
import { SquarePen, Trash, CalendarDays, Hourglass } from "lucide-react";

function formatDuration(totalMinutes) {
  const mins = Number(totalMinutes) || 0;
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function EntryCard({ entry, onEdit, onDelete }) {
  return (
    <Card className="bg-gray-50 m-2">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-medium">{entry.subject}</h1>

            <Button
              pill
              outline
              className="bg-primary-600/15 text-primary-900 border-primary-600/35
dark:bg-primary-400/2 dark:text-primary-200 dark:border-primary-300/35 transition-colors duration-800"
            >
              {entry.mood}
            </Button>
            <Button
              pill
              outline
              className="bg-primary-600/15 text-primary-900 border-primary-600/35
dark:bg-primary-400/2 dark:text-primary-200 dark:border-primary-300/35 transition-colors duration-800"
            >
              {entry.focus}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => onEdit(entry)}
              className="h-10 px-3 rounded-xl text-sm font-medium
bg-primary-600/15 text-primary-900 border border-primary-600/35
hover:bg-primary-600/20 hover:border-primary-600/45
transition-colors duration-300
focus:outline-none focus:ring-2 focus:ring-primary-500/35
dark:bg-primary-400/10 dark:text-primary-200 dark:border-primary-300/25
dark:hover:bg-primary-300/15 dark:hover:border-primary-200/35 cursor-pointer"
            >
              <SquarePen />
            </Button>

            <Button
              size="sm"
              onClick={() => onDelete(entry)}
              className="h-10 px-3 rounded-xl text-sm font-medium
bg-primary-600/15 text-primary-900 border border-primary-600/35
hover:bg-primary-600/20 hover:border-primary-600/45
transition-colors duration-300
focus:outline-none focus:ring-2 focus:ring-primary-500/35
dark:bg-primary-400/10 dark:text-primary-200 dark:border-primary-300/25
dark:hover:bg-primary-300/15 dark:hover:border-primary-200/35 cursor-pointer"
            >
              <Trash />
            </Button>
          </div>
        </div>

        <div className="flex space-x-3 py-4">
          <CalendarDays />
          <p className="text-lg font-light">
            {new Date(entry.createdAt).toLocaleDateString()}
          </p>

          <Hourglass />
          <p className="text-lg font-light">{formatDuration(entry.duration)}</p>
        </div>

        <p className="text-base font-normal whitespace-pre-wrap break-words line-clamp-2">
          {entry.details}
        </p>
      </div>
    </Card>
  );
}

export default EntryCard;
