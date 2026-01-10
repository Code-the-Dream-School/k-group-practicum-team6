import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import Header from "../Hooks/Header";
import Footer from "../Hooks/Footer";
import Entries from "./Entries";

const DashBoard = () => {
  const [openModal, setOpenModal] = useState(false);


  const handleModal = () => {
    if (!openModal) {
      setOpenModal(true);
      console.log("Modal opened!!");
    }
    else {
      setOpenModal(false);
      console.log("Modal closed!!");
    }
  }

  return (
    <>
      <div className="master-cont">
        {/* change to `Welcome ${name}`! */}
        <h1 className="title-style">Welcome to the Dashboard</h1>
        <Header/>
        {/* placeholder entries */}
        <div>
          <div className="entry-cont-style">
            <Button onClick={handleModal} className="btn-style">
              View Entries
            </Button>
            {/* <button className="edit-style">Edit</button>
            <button className="delete-style">Delete</button> */}
          </div>
          <Modal
            show={openModal}
            onClose={handleModal}
            className="flex relative justify-center items-center gap-2 text-xl bg-blue-500
         rounded-lg m-1 mt-2 p-5 border-2 border-solid border-[black]"
          >
            <ModalHeader>Open</ModalHeader>
            <ModalBody><Entries/></ModalBody>
            <ModalFooter>
              <Button className="btn-style" onClick={handleModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          {/* <div className="entry-cont-style">
            <p className="entry-title-style">Entry 2</p>
            <button className="edit-style">Edit</button>
            <button className="delete-style">Delete</button>
          </div> */}
         </div>
        <Footer/>
      </div>
    </>
  );
};
export default DashBoard;
