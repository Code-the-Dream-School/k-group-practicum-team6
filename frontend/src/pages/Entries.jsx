import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Entries = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.removeToken();
    authService.removeUsername();
    navigate("/"); // redirect to login page after logout
  };

  return (
    <>
      <div className="master-cont">
        {/* change to `Welcome ${name}`! */}
        <h1 className="title-style">User Entries</h1>
        <div className="header-style">
          <button className="btn-style">+ New Entry</button>
          <button className="btn-style">View</button>
          <button className="btn-style" onClick={handleLogout}>
            Log out
          </button>
        </div>
        {/* placeholder entries */}
        <div
          className="bg-blue-500
         rounded-lg m-1 mt-2 p-5 border-2 border-solid border-[black]"
        >
          {/* Change to `${}'s entries` */}
          <h1 className="title-style">User Entries</h1>
          <div className="entry-cont-style">
            <button className="btn-style">Entry 1</button>
            <button className="btn-style">Entry 2</button>
          </div>
        </div>
        <div className="footer-style">
          <select
            className="dropdown-style">
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
export default Entries;
