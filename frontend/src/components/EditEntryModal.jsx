import Modal from './Model';
import EntryForm from '../components/EntryForm';
import { FaTimes } from 'react-icons/fa';

const EditEntryModal = ({ entry, onClose, onSave }) => {
  const handleUpdateEntry = (updatedData) => {
    onSave(updatedData); 
    onClose();          
  };

  return (
    <Modal onClose={onClose}>
      <div className="relative bg-white p-6 space-y-4 w-[550px] rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Edit Entry</h1>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 group"
          >
            <FaTimes
              size={20}
              className="text-gray-400 group-hover:text-red-500 transition-colors pointer-events-none"
            />
          </button>
        </div>

        <EntryForm
          initialData={entry}
          onSubmit={handleUpdateEntry}
          onCancel={onClose}
        />
      </div>
    </Modal>
  );
};

export default EditEntryModal;

