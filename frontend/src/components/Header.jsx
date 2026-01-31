import { useUser } from "../hooks/useUser";
import useRouter from "../utils/useRouter";
import authApi from "../utils/authApi";
import { Button } from "flowbite-react";
import { LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { user, loading, logout } = useUser();

  if (loading) return null;
  if (!user) return null;

  const handleLogout = async () => {
    await authApi.logout();
    logout();
    router.toLogin(); // redirect to login page after logout
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl">Brain Log</h2>
        {/* change to `Welcome ${name}`! */}
        <h1 className="text-lg">{`Welcome, ${user.name}!`}</h1>
        <Button onClick={handleLogout}>
          <LogOut />
          Log Out
        </Button>
      </div>
    </>
  );
}
