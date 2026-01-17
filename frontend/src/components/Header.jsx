import { useUser } from "../hooks/useUser";
import useRouter from "../utils/useRouter";
import authApi from "../utils/authApi";

export default function Header({setNewEntriesModal}) {
    const router = useRouter();
    const { logout } = useUser();

  const handleLogout = async () => {
    await authApi.logout();
    logout();
    router.toLogin(); // redirect to login page after logout
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
