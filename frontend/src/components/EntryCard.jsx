import { Button, Card } from "flowbite-react";
import { SquarePen, Trash, CalendarDays, Hourglass } from "lucide-react";

function EntryCard({ entry, onEdit, onDelete }) {
  return (
    <Card className="bg-gray-50 m-2">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold">{entry.subject}</h1>

            <Button pill outline>
              {entry.mood}
            </Button>
            <Button pill outline>
              {entry.focus}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={() => onEdit(entry)}>
              <SquarePen />
            </Button>

            <Button size="sm" onClick={() => onDelete(entry)}>
              <Trash />
            </Button>
          </div>
        </div>

        <div className="flex space-x-3 py-4">
          <CalendarDays />
          <p className="text-lg">{entry.date}</p>

          <Hourglass />
          <p className="text-lg">{entry.duration}m</p>
        </div>

        <p className="text-base whitespace-pre-wrap break-words line-clamp-2">
          {entry.details}
        </p>
      </div>
    </Card>
  );
}

export default EntryCard;
