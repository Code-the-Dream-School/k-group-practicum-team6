import EntryForm from "../components/EntryForm";

const EditEntryModal = ({ entry, onClose }) => {
  const handleUpdateEntry = (entryData) => {
    console.log("Updating entry:", entryData);
    onClose();
  };

  return (
    <div className="relative">
      <EntryForm
        initialData={entry}
        onSubmit={handleUpdateEntry}
        onCancel={onClose}
      />
    </div>
  );
};

export default EditEntryModal;
