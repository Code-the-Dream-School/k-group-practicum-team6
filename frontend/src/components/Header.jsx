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
      <div className="flex flex-row justify-between px-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-center mb-6 bg-gradient-to-r from-sky-700 to-cyan-500 dark:from-sky-600 dark:to-cyan-400 bg-clip-text text-transparent">
          BrainLog
        </h2>
        <Button
          onClick={handleLogout}
          className="gap-2 h-10 px-5 rounded-xl text-sm font-medium
bg-primary-600/15 text-primary-900 border border-primary-600/35
hover:bg-primary-600/20 hover:border-primary-600/45
transition-colors duration-300
focus:outline-none focus:ring-2 focus:ring-primary-500/35
dark:bg-primary-400/10 dark:text-primary-200 dark:border-primary-300/25
dark:hover:bg-primary-300/15 dark:hover:border-primary-200/35 cursor-pointer"
        >
          <LogOut />
          Log Out
        </Button>
      </div>
      <h1 className="text-xl text-center">{`Welcome, ${user.name}!`}</h1>
    </>
  );
}
