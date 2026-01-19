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
      <div className="flex">
      <h1 className="relative left-[25px] top-[20px] text-2xl">Welcome, Team 6!</h1>
      <h1 className="title-style relative left-[175px]">Brain Log</h1>
     <button className="btn-style relative left-[427px]" onClick={handleLogout}>
      Log out
     </button>
  </div>
    </>
  )

}
