import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "flowbite-react";
import Header from "../Hooks/Header";
import Footer from "../Hooks/Footer";
import Entries from "./Entries";
import NewEntry from "./NewEntry";

const DashBoard = () => {
  const [newEntriesModal, setNewEntriesModal] = useState(false);
  const [entriesModal, setEntriesModal] = useState(false);

  return (
    <>
    
      <div className="master-cont-2">
        {/* change to `Welcome ${name}`! */}
       
        {/* + New Entry */}
        <Header setNewEntriesModal={setNewEntriesModal} />
        <Modal
          show={newEntriesModal}
          onClose={() => setNewEntriesModal(false)}
          size="md"
          theme={{
            content: { base: "main-modal" },
            body: { base: "p-0 pt-0 pb-0" },
          }}
        >
          <ModalBody>
            <Button
              className="absolute btn-style x-btn"
              onClick={() => setNewEntriesModal(false)}
            >
              X
            </Button>
            <NewEntry />
          </ModalBody>
        </Modal>

        {/* existing entries */}
        <div>
          <div className="entry-cont-style">
            <Button
              onClick={() => setEntriesModal(true)}
              className="btn-style text-xl"
            >
              View Entries
            </Button>
          </div>
          {/* User entries */}
          <Modal
            show={entriesModal}
            onClose={() => setEntriesModal(false)}
            size="md"
            theme={{
              content: { base: "main-modal-2" },
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
                onClick={() => setEntriesModal(false)}
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
