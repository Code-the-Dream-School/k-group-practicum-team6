import EntryForm from "./EntryForm";
import { Button } from "flowbite-react";
import { X } from "lucide-react";

const EntryModal = ({ mode, entry, persistEntry, onClose }) => {
  let titleText = "New Entry";
  if (mode === "edit") titleText = "Edit Entry";

  return (
    <div className="relative p-6 space-y-4 w-lg rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">
          {titleText}
        </h1>
        <Button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 group bg-transparent hover:bg-transparent focus:ring-0 dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-0 cursor-pointer"
        >
          <X
            size={25}
            className="text-gray-400 group-hover:text-red-500 transition-colors"
          />
        </Button>
      </div>
      <EntryForm
        initialData={entry}
        persistEntry={persistEntry}
        onClose={onClose}
      />
    </div>
  );
};

export default EntryModal;
