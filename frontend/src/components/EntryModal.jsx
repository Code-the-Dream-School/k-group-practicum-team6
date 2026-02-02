import { useState } from "react";
//import Modal from "./Modal";
import EntryForm from "./EntryForm";
import { FaTimes } from "react-icons/fa";

const EntryModal = ({ mode, entry, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  let titleText = "New Entry";
  if (mode === "edit") titleText = "Edit Entry";

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.log("error while saving:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="relative bg-white p-6 space-y-4 w-[550px] rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">{titleText}</h1>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 group"
          >
            <FaTimes
              size={20}
              className="text-gray-400 group-hover:text-red-500 transition-colors"
            />
          </button>
        </div>

        <EntryForm
          initialData={entry}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isSubmitting}
        />
      </div>
  );
};

export default EntryModal;
