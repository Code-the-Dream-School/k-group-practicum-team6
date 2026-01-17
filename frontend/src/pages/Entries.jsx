
import { Button, Modal, ModalHeader, ModalBody } from "flowbite-react";
import EditEntries from "./EditEntry";

const Entries = ({ entriesModal,setEntriesModal }) => {

  // may need a handler for selecting entries or mapping user entries

  // another handler(s) for  deleting entries
  return (
    <>
      <div className="">
        {/* placeholder entries */}
          <div className="solo-entry-style">
            <div className="">
              <h1 className="text-black">Entry 1</h1>
              <p className="text-black text-lg">Content here</p> 
              
            </div>
 <button className="edit-style" onClick={() => setEntriesModal(true)}>Edit</button>
            <button className="delete-style">Delete</button> 
                 <Modal
          show={entriesModal}
          onClose={() => setEntriesModal(false)}
          size="md"
          theme={{
            content: { base: "main-modal" },
            body: { base: "p-0 pt-0 pb-0" },
          }}
        >
          <ModalBody>
              <button
              className="x-btn relative top-[45px] left-[330px]"
              onClick={() => setEntriesModal(false)}>
              X </button> 
            <EditEntries/>
          </ModalBody>
        </Modal>
                   
          </div>
      </div>
    </>
  );
};
export default Entries;
