
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Button, Modal, ModalHeader, ModalBody } from "flowbite-react";
import { CircleArrowLeft, CircleArrowRight, SquarePen, Trash, CalendarDays, Hourglass } from "lucide-react"; 
import EntryModal from "../components/EntryModal";
import jsonData from "../utils/entries";
import Footer from "../components/Footer";

const Entries = ({}) => {
  const [entries, setEntries] = useState(jsonData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

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

    const handleEditClick = (entry) => {
    setSelectedEntry(entry);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedEntry) => {
    console.log("Updated Entry:", updatedEntry);
    setEditModalOpen(false);
  };

  return (
    <>
      <div>
        
          <div>
            <ul>
             {/* placeholder entries */}
             {currentEntries.map((item, index) => (
              <div key={item._id || index}>
                <li className="solo-entry-style relative bottom-[25px]">
                  <div className="text-black m-1">
                    <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <h1 className="font-bold">{item.subject}</h1>
                      <h2 className="mood-focus">{item.mood}</h2>
                      <h2 className="mood-focus">{item.focus}</h2>
                    </div>
                    <div className="flex items-center space-x-3">

                    <button
                      className="edit-style"
                      onClick={() => 
                        handleEditClick(item)}
                    >
                      <SquarePen />
                    </button> 

                    <button className="delete-style"><Trash/></button>
                    </div>
                </div>
                    <div className="flex space-x-3 mt-1 mb-1">
                      <CalendarDays/>
                      <p className="text-lg">{item.date}</p>
                      <Hourglass/>
                      <p className="text-lg">{item.duration}m</p>
                    </div>
                    <p className="text-lg">{item.details}</p>
                  </div> 
                </li>
              </div> 
            ))}
          </ul>
          {editModalOpen && selectedEntry && (
           <EntryModal
            mode="edit"
            entry={selectedEntry}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveEdit}
           />
         )}
             
          </div>
          <div className=" flex relative right-[12px] bottom-[22px] items-center justify-center space-x-3 
             bg-blue-500 w-225 text-white footer-style">
             <button className="cursor-pointer" 
             onClick={() => handlePreviousPage(currentPage)} 
             disabled={currentPage === 1}><CircleArrowLeft/></button>

             <span>Page {currentPage} of {totalPages} </span>

              <button className="cursor-pointer" 
              onClick={() => handleNextPage(currentPage)}
              disabled={currentPage === totalPages}><CircleArrowRight/></button>
              {/* Not working with footer right now */}
              {/* <Footer/> */}
          </div>
         
      </div>
    </>
  );
};
export default Entries;
