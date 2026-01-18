
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "flowbite-react";
import EditEntries from "./EditEntry";
import jsonData from "../utils/entries";

const Entries = ({ entriesModal, setEntriesModal }) => {
  const [entries, setEntries] = useState(jsonData);
  // may need a handler for selecting entries
  // another handler(s) for  deleting entries
  //add pagination here
  return (
    <>
      <div>
        
          <div>
            <ul>
             {/* placeholder entries */}
             {entries.map((item, index) => (
          /* Hints: 
            1. call json data using item (i.e item.subject) 
            2. key can be index or item._id
          */
              <div>
                <li key={item._id || index} className="solo-entry-style">
                  <div className="text-black">
                    <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <h1 className="font-bold">{item.subject}</h1>
                      <h2 className="mood-focus">{item.mood}</h2>
                      <h2 className="mood-focus">{item.focus}</h2>
                    </div>
                    <div className="flex items-center space-x-3">
                    <button className="edit-style" onClick={() => setEntriesModal(true)}>Edit</button>
                      <button className="delete-style">Delete</button>
                    </div>
                </div>
                    <div className="flex">
                      <p className="text-lg">{item.date}</p>
                      <p className="text-lg ml-3">{item.duration}m</p>
                    </div>
                    <p className="text-lg">{item.details}</p>
                  </div> 
                </li>
              </div> 
            ))}
          </ul>
        
          <Modal
          show={entriesModal}
          onClose={() => setEntriesModal(false)}
          size="md"
          theme={{
            content: { base: "main-modal" },
            body: { base: "p-0 pt-0 pb-0" },
          }}>
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
