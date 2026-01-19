import Modal from './Modal';
import EntryForm from './EntryForm';


const NewEntryModal = ({ onClose, onSave }) => {
  const handleSubmit = (formData) => {
    onSave(formData);   
    onClose();          
  };

  return (
    <Modal onClose={onClose}>
      <EntryForm
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default NewEntryModal;


