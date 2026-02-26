import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Blockquote, Modal, ModalBody } from "flowbite-react";
import { useEntries } from "../hooks/useEntries";
import EntryModal from "../components/EntryModal";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import EntryCard from "./EntryCard";

const Entries = () => {
  // PAGINATION LOGIC
  const [searchParams, setSearchParams] = useSearchParams();
  const entriesPerPage = 5;

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const { entries, count, loading, deleteEntry, updateEntry } = useEntries(currentPage, entriesPerPage);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  //delete state for confirm modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  
  // const indexOfFirstEntry = (currentPage - 1) * entriesPerPage;
  // const indexOfLastEntry = indexOfFirstEntry + entriesPerPage;
  //backend already paginated slice no longer needed
  const currentEntries = entries;
  const totalPages = Math.ceil(count / entriesPerPage);

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

  const handleSaveEdit = useCallback(
    async (formData) => {
      if (!selectedEntry) return;
      await updateEntry(selectedEntry._id || selectedEntry.id, formData);
    },
    [selectedEntry, updateEntry],
  );

  if (loading && count === 0) return <div>Loading Entries...</div>;

  if (!loading && count === 0) {
    return (
      <Blockquote className="text-3xl text-center mt-20">
        Welcome to BrainLog! Please add your first entry.
      </Blockquote>
    );
  }

  return (
    <>
      <div>
        <div>
          <ul>
            {currentEntries.map((entry, index) => (
              <li key={entry._id || entry.id || index}>
                <EntryCard
                  entry={entry}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
          {editModalOpen && selectedEntry && (
            <Modal
              show={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              theme={{
                content: { base: "main-modal w-fit h-fit" },
                body: { base: "p-0 pt-0 pb-0" },
              }}
              className=" bg-black/40"
            >
              <ModalBody>
                <EntryModal
                  mode="edit"
                  entry={selectedEntry}
                  onClose={() => setEditModalOpen(false)}
                  persistEntry={handleSaveEdit}
                />
              </ModalBody>
            </Modal>
          )}
          {isDeleteModalOpen && (
            <Modal
              show={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              theme={{
                content: { base: "main-modal w-fit" },
                body: { base: "p-0" },
              }}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => handlePreviousPage(currentPage)}
          onNext={() => handleNextPage(currentPage)}
          disabled={loading}
        />
      </div>
    </>
  );
};
export default Entries;
