import EntryForm from "./EntryForm";
import { X } from "lucide-react";

const EntryModal = ({ mode, entry, persistEntry, onClose }) => {
  let titleText = "New Entry";
  if (mode === "edit") titleText = "Edit Entry";

  return (
    <div className="relative bg-white p-6 space-y-4 w-lg rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">{titleText}</h1>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 group"
        >
          <X
            size={25}
            className="text-gray-400 group-hover:text-red-500 transition-colors"
          />
        </button>
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
