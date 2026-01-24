import Model from './Modal';
import EntryForm from './EntryForm';
import { FaTimes } from 'react-icons/fa';

const EntryModel = ({ mode = "new", entry, onClose, onSave }) => {
  // 3-й вариант: переменная для заголовка
  let titleText = "New Entry";
  if (mode === "edit") titleText = "Edit Entry";

  const handleSubmit = (formData) => {
    onSave(formData);
    onClose();
  };

  return (
    <Model onClose={onClose}>
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
        />
      </div>
    </Model>
  );
};

export default EntryModel;
