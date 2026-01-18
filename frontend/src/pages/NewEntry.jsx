import { useUser } from "../hooks/useUser";
import useRouter from "../utils/useRouter";
import EntryForm from "../components/EntryForm";
import authApi from "../utils/authApi";



const NewEntry = () => {
  


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
        <h1 className="title-style">New Entry</h1>
        <div className="header-style">
          <button className="btn-style">+ New Entry</button>
          <button className="btn-style">View</button>
          <button className="btn-style" onClick={handleLogout}>
            Log out
          </button>
        </div>
        {/* placeholder entries */}
        <div className="entry-cont-style">
          <div>
            <h1 className="new-entry-title-style">New Entry</h1>
            <EntryForm />

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
export default NewEntry;
