import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.removeToken();
    authService.removeUsername();
    navigate("/"); // redirect to login page after logout
  };

  const handleModal = () => {
    if (!openModal) {
      setOpenModal(true);
    console.log("Modal opened!!");
    }
    else {
      setOpenModal(false);
      console.log("Modal closed!!")
    }
  }

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
            <Button
              onClick={handleModal}
              className="btn-style"
            >
              View Entries
            </Button>
            {/* <button className="edit-style">Edit</button>
            <button className="delete-style">Delete</button> */}
          </div>

          {/* <div className="entry-cont-style">
            <p className="entry-title-style">Entry 2</p>
            <button className="edit-style">Edit</button>
            <button className="delete-style">Delete</button>
          </div> */}
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
export default DashBoard;
