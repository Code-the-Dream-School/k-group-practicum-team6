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
      <div className="flex font-bold">
      <h1 className="relative left-[25px] top-[20px] text-2xl">Welcome, Team 6!</h1>
      <h1 className="title-style relative left-[175px]">Brain Log</h1>
     <button className="btn-style relative left-[390px]" onClick={handleLogout}>
      Log out
     </button>
  </div>
    </>
  )

}
