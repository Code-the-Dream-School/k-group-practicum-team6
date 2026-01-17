import { useNavigate } from "react-router-dom";

const Entries = () => {
  const navigate = useNavigate();

  // may need a handler for selecting entries or mapping user entries
  const handleEdit = () => {
     navigate("/editentry");
  }
  // another handler(s) for  deleting entries
  return (
    <>
      <div className="entry-master-cont">
        {/* Change to `${}'s entries` */}
        {/* placeholder entries */}
          <div className="solo-entry-style flex">
            {/* change to have each entry and edit and delete buttons */}
              <button className="btn-style" onClick={handleEdit}>Edit</button>
              <p className="relative top-[15px]">Entry 1</p>
              <button className="btn-style">Delete</button>
          
            
              <button className="btn-style" onClick={handleEdit}>Edit</button>
              <p className="relative top-[15px]">Entry 2</p>
              <button className="btn-style">Delete</button>
          </div>

      </div>
    </>
  );
};
export default Entries;
