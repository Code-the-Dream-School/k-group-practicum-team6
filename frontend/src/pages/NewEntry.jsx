import EntryForm from "../components/EntryForm";

const NewEntry = ({ setNewEntriesModal }) => {
  return (
    <>
      <div className="master-cont-2">
        <div className="entry-cont-style">
          <div>
            <button className="x-btn" onClick={() => setNewEntriesModal(false)}>
              X{" "}
            </button>
            <h1 className="new-entry-title-style m-0">New Entry</h1>
            <EntryForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default NewEntry;
