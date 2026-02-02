import { useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import { FilePlusCorner } from "lucide-react";
import Header from "../components/Header";
import Entries from "./Entries";
import EntryModal from "../components/EntryModal";
import Stats from "../components/stats/Stats";
import { useEntries } from "../hooks/useEntries";

const DashBoard = () => {
  const [newEntriesModal, setNewEntriesModal] = useState(false);
  const { createEntry } = useEntries();

  const handleCreateEntry = async (formData) => {
    await createEntry(formData);
  };

  return (
    <>
      <div className="dash-cont">
        {/* change to `Welcome ${name}`! */}

        <Header setNewEntriesModal={setNewEntriesModal} />
        <div className="flex justify-around">
          <Stats />
        </div>
        <div className="flex m-2">
          <h2 className="relative top-[10px] left-[8px] font-bold">
            Recent Entries
          </h2>
          <button
            className="btn-style relative left-[695px] top-[-10px]"
            onClick={() => setNewEntriesModal(true)}
          >
            <FilePlusCorner />
          </button>
        </div>

        <Modal
          show={newEntriesModal}
          onClose={() => setNewEntriesModal(false)}
          size="md"
          theme={{
            content: { base: "main-modal" },
            body: { base: "p-0 pt-0 pb-0" },
          }}
          className = "bg-black/40"
        >
          <ModalBody>
            <EntryModal
              mode="new"
              onClose={() => setNewEntriesModal(false)}
              onSubmit={handleCreateEntry}
            />
          </ModalBody>
        </Modal>

        {/* user entries */}
        <Entries/>

        {/* <Footer /> */}
      </div>
    </>
  );
};
export default DashBoard;
