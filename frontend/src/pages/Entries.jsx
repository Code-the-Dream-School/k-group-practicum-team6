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
      <div className="">
        {/* placeholder entries */}
          <div className="solo-entry-style">
            <div className="">
              <h1 className="text-black">Entry 1</h1>
              <p className="text-black text-lg">Content here</p> 
            </div>
            <button className="edit-style" onClick={handleEdit}>Edit</button>
            <button className="delete-style">Delete</button>         
          </div>
      </div>
    </>
  );
};
export default Entries;
