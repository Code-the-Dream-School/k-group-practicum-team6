import { useNavigate } from "react-router-dom";

function NavBar () {
    const navigate = useNavigate();
    function handleLogout () {
        
    }
    return (
        <>
            <div style={{ display: "flex", gap: "20px",
                position: "relative", left: "50px",
                fontSize: "26px"
            }}>
                <button>+ New Entry</button>
                <button>View</button>
                <button>Log out</button>
            </div>
        </>
    )
}

export default NavBar;