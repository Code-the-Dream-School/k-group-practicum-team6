import { useNavigate } from "react-router-dom";

const Entries = () => {
  const navigate = useNavigate();
  // handler for selecting entries
  const handleEdit = () => {
     navigate("/editentry");
  }
  // another handler(s) for  deleting entries
  return (
    <>
      <div className="entry-master-cont">
        {/* Change to `${}'s entries` */}
        <h1 className="user-title-style">User Entries</h1>

        {/* placeholder entries */}
        <div>
          <div className="solo-entry-style">
            {/* change to have each entry and edit and delete buttons */}
            <div className="solo-entry">
              <button className="btn-style" onClick={handleEdit}>Edit</button>
              <p className="relative top-[15px]">Entry 1</p>
              <button className="btn-style">Delete</button>
            </div>
            
            
          </div>
        </div>
      </div>
    </>
  );
};
export default Entries;
