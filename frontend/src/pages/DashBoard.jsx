import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "flowbite-react";
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
      <div className="master-cont">
        {/* change to `Welcome ${name}`! */}
        <h1 className="title-style">Welcome to the Dashboard</h1>
        <Header />
        {/* + New Entry */}

        {/* existing entries */}
        <div>
          <div className="entry-cont-style">
            <Button onClick={handleModal} className="btn-style">
              View Entries
            </Button>
          </div>
          {/* User entries */}
          <Modal
            show={openModal}
            onClose={handleModal}
            size="md"
            theme={{
              // override default bg
              content: { base: "bg-transparent shadow-none" },
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
              className="px-1 !pt-0 !pb-0 !mt-0"
            >
              <Entries/>
            </ModalBody>
            <ModalFooter>
              <Button
                className="btn-style absolute top-1 right-2 pt-0.25 pb-0.25 pr-1 pl-1 bg-transparent text-xl text-white rounded"
                onClick={handleModal}
              >
                X
              </Button>
            </ModalFooter>
          </Modal>

        </div>
        <Footer />
      </div>
    </>
  );
};
export default DashBoard;
