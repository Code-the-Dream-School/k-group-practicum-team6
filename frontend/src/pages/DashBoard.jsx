import { useState } from "react";
import { Button, Modal, ModalBody } from "flowbite-react";
import { FilePlusCorner } from "lucide-react";
import Header from "../components/Header";
import Entries from "./Entries";
import EntryModal from "../components/EntryModal";
import Stats from "../components/stats/Stats";

const DashBoard = () => {
  const [newEntriesModal, setNewEntriesModal] = useState(false);
  const [entriesModal, setEntriesModal] = useState(false);

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
            size="md"
            theme={{
              content: { base: "main-modal" },
              body: { base: "p-0 pt-0 pb-0" },
            }}
          >
            <ModalBody>
              <EntryModal
                mode="new"
                onClose={() => setNewEntriesModal(false)}
                onSave={(data) => {
                  console.log("Create entry:", data);
                }}
              />
            </ModalBody>
          </Modal>
        </div>
        {/* user entries */}
        <Entries
          entriesModal={entriesModal}
          setEntriesModal={setEntriesModal}
        />

        {/* <Footer /> */}
      </div>
    </>
  );
};
export default DashBoard;
