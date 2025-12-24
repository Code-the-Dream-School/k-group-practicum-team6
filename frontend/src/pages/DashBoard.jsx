import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
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
        <h1 className="title-style">Welcome to the Dashboard</h1>
        <div className="header-style">
          <button className="btn-style">+ New Entry</button>
          <button className="btn-style">View</button>
          <button className="btn-style" onClick={handleLogout}>
            Log out
          </button>
        </div>
        {/* placeholder entries */}
        <div>
          <div className="entry-cont-style">
            <p className="entry-title-style">Entry 1</p>
            <button className="edit-style">Edit</button>
            <button className="delete-style">Delete</button>
          </div>

          <div className="entry-cont-style">
            <p className="entry-title-style">Entry 2</p>
            <button className="edit-style">Edit</button>
            <button className="delete-style">Delete</button>
          </div>
        </div>
        <div className="footer-style">
          <button className="btn-style">Sort</button>
          <button className="btn-style">Search</button>
          <button className="btn-style">Pagination</button>
        </div>
      </div>
    </>
  );
};
export default DashBoard;
