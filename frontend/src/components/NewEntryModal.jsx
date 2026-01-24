import Modal from './Model';
import EntryForm from './EntryForm';
import { FaTimes } from "react-icons/fa"; 


const NewEntryModal = ({ onClose, onSave }) => {
  const handleSubmit = (formData) => {
    onSave(formData);   
    onClose();          
  };

  return (
    <Modal onClose={onClose}>
      <div className="relative bg-white p-6 space-y-4 w-[550px] rounded-xl">

        <h1 className="text-xl font-semibold text-gray-800">
          New Entry
        </h1>

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
        
        
      <EntryForm
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
      </div>
    </Modal>
 );
};

export default NewEntryModal;


