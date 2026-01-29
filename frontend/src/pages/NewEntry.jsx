import EntryForm from "../components/EntryForm";
import authApi from "../utils/authApi";

const NewEntry = ({ setNewEntriesModal }) => {
  return (
    <>
      <div className="master-cont">
        {/* change to `Welcome ${name}`! */}
        <h1 className="new-entry-title-style">New Entry</h1>
        {/* placeholder entries */}
        <div className="master-cont">
          <div>
            <EntryForm onSubmit={handleCreateEntry} />
          </div>
          </div>
        </div>
      {/* Brittany`s old modal UI */}
      {/* <div className="master-cont-2">
        <div className="entry-cont-style">
          <div>
            <button className="x-btn" onClick={() => setNewEntriesModal(false)}>
              X{" "}
            </button>
            <h1 className="new-entry-title-style m-0">New Entry</h1>
            <EntryForm />
          </div>
        </div>
      </div> */}
    </>
  );
};
export default NewEntry;
