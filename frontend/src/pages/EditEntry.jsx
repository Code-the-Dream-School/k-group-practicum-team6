import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const EditEntry = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.removeToken();
    authService.removeUsername();
    navigate("/"); // redirect to login page after logout
  };

  return (
    <>
      <div className="master-cont-2">
        {/* placeholder entries */}
        <h1 className="title-style">New Entry</h1>
        <div className="header-style">
          <button className="btn-style">+ New Entry</button>
          <button className="btn-style">View</button>
          <button className="btn-style" onClick={handleLogout}>
            Log out
          </button>
        </div>
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
        <div className="footer-style">
          <select className="dropdown-style">
            <option value="default">Sort</option>
            <option value="Date">Date</option>
            <option value="Subject">Subject</option>
            <option value="Duration">Duration</option>
            <option value="Mood">Mood</option>
          </select>
          <button className="btn-style">Search</button>
          <button className="btn-style">Pagination</button>
        </div>
      </div>
    </>
  );
};
export default EditEntry;
