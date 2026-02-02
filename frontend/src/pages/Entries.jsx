import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  CircleArrowLeft,
  CircleArrowRight,
  SquarePen,
  Trash,
  CalendarDays,
  Hourglass,
} from "lucide-react";
import { Modal, ModalBody } from "flowbite-react";
import EntryModal from "../components/EntryModal";
import { useEntries } from "../hooks/useEntries";
import ConfirmModal from "../components/ConfirmModal";

const Entries = () => {
  const { entries, loading, deleteEntry, updateEntry } = useEntries();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  //delete state for confirm modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 5;

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const indexOfFirstEntry = (currentPage - 1) * itemsPerPage;
  const indexOfLastEntry = indexOfFirstEntry + itemsPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  // may need a handler for selecting entries
  // another handler(s) for  deleting entries

  const handlePreviousPage = (page) => {
    if (page > 1) setSearchParams({ page: currentPage - 1 });
  };

  const handleNextPage = (page) => {
    if (page < totalPages) setSearchParams({ page: currentPage + 1 });
  };

  useEffect(() => {
    if (currentEntries.length === 0 && currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  }, [currentEntries.length, currentPage, setSearchParams]);

  const handleEditClick = (entry) => {
    setSelectedEntry(entry);
    setEditModalOpen(true);
  };

  const handleDelete = (entry) => {
    setEntryToDelete(entry);
    setIsDeleteModalOpen(true);
  };

  // delete confirmation
  const handleConfirmDelete = async () => {
    if (!entryToDelete) return;
    setIsDeleting(true);
    try {
      await deleteEntry(entryToDelete._id || entryToDelete.id);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleting(false);
      setEntryToDelete(null);
    }
  };

  const handleSaveEdit = async (formData) => {
    if (!selectedEntry) return;
    await updateEntry(selectedEntry._id || selectedEntry.id, formData);
  };

  if (loading && entries.length === 0) return <div>Loading Entries...</div>;

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
                          onClick={() => handleEditClick(item)}
                        >
                          <SquarePen />
                        </button>

                        <button
                          className="delete-style"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash />
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-1 mb-1">
                      <CalendarDays />
                      <p className="text-lg">{item.date}</p>
                      <Hourglass />
                      <p className="text-lg">{item.duration}m</p>
                    </div>
                    <p className="text-lg">{item.details}</p>
                  </div>
                </li>
              </div>
            ))}
          </ul>
          {editModalOpen && selectedEntry && (
            <Modal
              show={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              size="md"
              theme={{
                content: { base: "main-modal" },
                body: { base: "p-0 pt-0 pb-0" },
              }}
              className=" bg-black/40"
            >
              <ModalBody>
                <EntryModal
                  mode="edit"
                  entry={selectedEntry}
                  onClose={() => setEditModalOpen(false)}
                  onSubmit={handleSaveEdit}
                />
              </ModalBody>
            </Modal>
          )}
          {isDeleteModalOpen && (
            <Modal
              show={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              size="md"
              theme={{ content: { base: "main-modal" }, body: { base: "p-0" } }}
              className="bg-black/40"
            >
              <ModalBody>
                <ConfirmModal
                  title="Delete Entry?"
                  message={`Are you sure you want to delete "${entryToDelete?.subject}"? This action cannot be undone.`}
                  onConfirm={handleConfirmDelete}
                  onCancel={() => setIsDeleteModalOpen(false)}
                  isLoading={isDeleting}
                />
              </ModalBody>
            </Modal>
          )}
        </div>
        <div
          className=" flex relative right-[12px] bottom-[22px] items-center justify-center space-x-3 
             bg-blue-500 w-225 text-white footer-style"
        >
          <button
            className="cursor-pointer"
            onClick={() => handlePreviousPage(currentPage)}
            disabled={currentPage === 1}
          >
            <CircleArrowLeft />
          </button>

          <span>
            Page {currentPage} of {totalPages}{" "}
          </span>

          <button
            className="cursor-pointer"
            onClick={() => handleNextPage(currentPage)}
            disabled={currentPage === totalPages}
          >
            <CircleArrowRight />
          </button>
          {/* Not working with footer right now */}
          {/* <Footer/> */}
        </div>
      </div>
    </>
  );
};
export default Entries;
