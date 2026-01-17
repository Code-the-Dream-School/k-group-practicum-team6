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
      <div className="dash-cont">
        {/* change to `Welcome ${name}`! */}

        <Header setNewEntriesModal={setNewEntriesModal} />
        <div className="flex m-2">
           <h2 className="relative top-[30px]">Recent Entries</h2>
           <button className="btn-style relative left-[647px]" 
           onClick={() => setNewEntriesModal(true)}>+ New Entry</button>
        </div>
        
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
            <NewEntry setNewEntriesModal={setNewEntriesModal}/>
          </ModalBody>
        </Modal>

        {/* user entries */}
          <Entries entriesModal={entriesModal} setEntriesModal={setEntriesModal}/>
        <Footer />
      </div>
    </>
  );
};
export default DashBoard;
