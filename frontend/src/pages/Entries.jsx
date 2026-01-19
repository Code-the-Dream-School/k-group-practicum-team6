
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Button, Modal, ModalHeader, ModalBody } from "flowbite-react";

import EditEntries from "./EditEntry";
import jsonData from "../utils/entries";
import Footer from "../components/Footer";

const Entries = ({ entriesModal, setEntriesModal }) => {
  const [entries, setEntries] = useState(jsonData);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemsPerPage = 5;

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstEntry = (currentPage - 1) * itemsPerPage;
  const indexOfLastEntry = indexOfFirstEntry + itemsPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  // may need a handler for selecting entries
  // another handler(s) for  deleting entries

  const handlePreviousPage = (page) => {
     if (page > 1) setSearchParams({ page: currentPage - 1 })
  }

  const handleNextPage = (page) => {
    if (page < totalPages) setSearchParams({ page: currentPage + 1 })
  }

  useEffect(() => {
    if (totalPages > 0) {
       if (currentPage < 1 || currentPage > totalPages) {
          navigate("/");
       }
    }
  },[currentPage, totalPages, navigate]);

  return (
    <>
      <div>
        
          <div>
            <ul>
             {/* placeholder entries */}
             {currentEntries.map((item, index) => (
              <div key={item._id || index}>
                <li className="solo-entry-style">
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
          <div className=" flex items-center justify-center space-x-3 
          bg-blue-700 text-white footer-style">
             <button className="cursor-pointer" 
             onClick={() => handlePreviousPage(currentPage)} 
             disabled={currentPage === 1}>Previous</button>
             <span>Page {currentPage} of {totalPages} </span>
              <button className="cursor-pointer" 
              onClick={() => handleNextPage(currentPage)}
              disabled={currentPage === totalPages}>Next</button>
              {/* Not working with footer right now */}
              {/* <Footer/> */}
          </div>
         
      </div>
    </>
  );
};
export default Entries;
