import { useState } from "react";
import { Button, Modal, ModalBody } from "flowbite-react";
import { FilePlusCorner } from "lucide-react";
import Header from "../components/Header";
import Entries from "./Entries";
import EntryModal from "../components/EntryModal";
import Stats from "../components/stats/Stats";
import { useEntries } from "../hooks/useEntries";

const DashBoard = () => {
  const [newEntriesModal, setNewEntriesModal] = useState(false);
  const { createEntry } = useEntries();

  return (
    <>
      <div>
        <div className="mx-auto max-w-6xl px-6 py-4 font-medium">
          <Header />
          <div className="flex justify-around m-8">
            <Stats />
          </div>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl">Recent Entries</h2>
            <Button onClick={() => setNewEntriesModal(true)}>
              <FilePlusCorner />
              Add New Entry
            </Button>
          </div>
          <Modal
            show={newEntriesModal}
            onClose={() => setNewEntriesModal(false)}
            theme={{
              content: { base: "main-modal w-fit h-fit" },
              body: { base: "p-0 pt-0 pb-0" },
            }}
            className="bg-black/40"
          >
            <ModalBody>
              <EntryModal
                mode="new"
                persistEntry={createEntry}
                onClose={() => setNewEntriesModal(false)}
              />
            </ModalBody>
          </Modal>
        </div>
        <Entries />
        {/* <Footer /> */}
      </div>
    </>
  );
};
export default DashBoard;
