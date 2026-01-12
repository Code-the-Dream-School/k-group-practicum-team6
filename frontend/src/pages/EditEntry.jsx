import { useNavigate } from "react-router-dom";

const EditEntry = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="master-cont-2">
        {/* placeholder entries */}
        <div className="entry-cont-style">
          <div>
            <h1 className="new-entry-title-style">Edit Entry</h1>
            <input className="input-style" type="text" placeholder="Date" />
            <input
              className="input-style"
              type="text"
              placeholder="Entry subject(s)"
            />
            <input className="input-style" type="text" placeholder="Duration" />
            <input className="input-style" type="text" placeholder="Mood" />
            <input
              className="input-style"
              type="text"
              placeholder="Focus Level"
            />
            <input className="input-style" type="text" placeholder="Details" />
            <div className="flex relative left-[20px]">
              <button className="btn-style relative left-[-8px]">Update</button>
              <button className="btn-style">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditEntry;
