import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Button, Card } from "flowbite-react";
import {
  CircleArrowLeft,
  CircleArrowRight,
  SquarePen,
  Trash,
  CalendarDays,
  Hourglass,
} from "lucide-react";
import EntryModal from "../components/EntryModal";
import jsonData from "../utils/entries";

const Entries = () => {
  const [entries, setEntries] = useState(jsonData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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
    if (totalPages > 0) {
      if (currentPage < 1 || currentPage > totalPages) {
        navigate("/");
      }
    }
  }, [currentPage, totalPages, navigate]);

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
                <Card className="bg-gray-50 m-2">
                  <div>
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-3">
                        <h1 className="text-xl font-semibold">
                          {item.subject}
                        </h1>
                        <Button pill outline>
                          {item.mood}
                        </Button>
                        <Button pill outline>
                          {item.focus}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button onClick={() => handleEditClick(item)}>
                          <SquarePen />
                        </Button>

                        <Button>
                          <Trash />
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-3 py-4">
                      <CalendarDays />
                      <p className="text-lg">{item.date}</p>
                      <Hourglass />
                      <p className="text-lg">{item.duration}m</p>
                    </div>
                    <p className="text-base">{item.details}</p>
                  </div>
                </Card>
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
        <div className=" flex items-center justify-center mx-2 space-x-3">
          <Button
            className="cursor-pointer"
            onClick={() => handlePreviousPage(currentPage)}
            disabled={currentPage === 1}
          >
            <CircleArrowLeft />
          </Button>

          <span>
            Page {currentPage} of {totalPages}{" "}
          </span>

          <Button
            className="cursor-pointer"
            onClick={() => handleNextPage(currentPage)}
            disabled={currentPage === totalPages}
          >
            <CircleArrowRight />
          </Button>
          {/* Not working with footer right now */}
          {/* <Footer/> */}
        </div>
      </div>
    </>
  );
};
export default Entries;
