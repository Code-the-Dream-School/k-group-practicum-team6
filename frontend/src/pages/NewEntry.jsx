import { useUser } from "../hooks/useUser";
import useRouter from "../utils/useRouter";
import EntryForm from "../components/EntryForm";
import authApi from "../utils/authApi";



const NewEntry = () => {
  
  const handleCreateEntry = (entryData) => {
    console.log("Creating entry with data: ", entryData);
    
  };


  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    await authApi.logout();
    logout();
    router.toLogin(); // redirect to login page after logout
  };

  

  

  return (
    <>
      <div className="master-cont">
        {/* change to `Welcome ${name}`! */}
        <h1 className="new-entry-title-style">New Entry</h1>
        {/* placeholder entries */}
        <div className="master-cont">
          <div>
            <EntryForm onSubmit={handleCreateEntry} />

          </div>
        </div>

      </div>
    </>
  );
};
export default NewEntry;
