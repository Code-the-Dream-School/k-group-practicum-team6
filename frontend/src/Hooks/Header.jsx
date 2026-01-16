import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Header({setNewEntriesModal}) {
    const navigate = useNavigate();

  const handleLogout = () => {
    authService.removeToken();
    authService.removeUsername();
    navigate("/"); // redirect to login page after logout
  };

  return (
    <>
      <div className="header-style">
    <button className="btn-style" onClick={() => setNewEntriesModal(true)}>+ New Entry</button>
    <button className="btn-style">View</button>
    <button className="btn-style" onClick={handleLogout}>
      Log out
    </button>
  </div>
    </>
  )

}
