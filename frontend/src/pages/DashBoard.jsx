import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "flowbite-react";
import Header from "../Hooks/Header";
import Footer from "../Hooks/Footer";
import Entries from "./Entries";

const DashBoard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    if (!openModal) {
      setOpenModal(true);
      console.log("Modal opened!!");
    } else {
      setOpenModal(false);
      console.log("Modal closed!!");
    }
  };

  return (
    <>
      <div className="master-cont-2">
        {/* change to `Welcome ${name}`! */}
        <h1 className="title-style">Welcome to the Dashboard</h1>
        <Header />
        {/* + New Entry */}

        {/* existing entries */}
        <div>
          <div className="entry-cont-style">
            <Button onClick={handleModal} className="btn-style text-xl">
              View Entries
            </Button>
          </div>
          {/* User entries */}
          <Modal
            show={openModal}
            onClose={handleModal}
            size="md"
            theme={{
              content: { base: "main-modal" },
              body: { base: "p-0 pt-0 pb-0" },
            }}
          >
            <ModalBody
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                padding: "0 0.25rem",
              }}
              className="modal-body"
            >
              <Button
                className="absolute btn-style x-btn"
                onClick={handleModal}
              >
                X
              </Button>
              <Entries />
            </ModalBody>
          </Modal>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default DashBoard;
