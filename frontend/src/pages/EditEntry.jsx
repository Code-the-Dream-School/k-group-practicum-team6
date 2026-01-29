import React from "react";
import EntryForm from "../components/EntryForm";

const EditEntry = () => {
  const existingEntry = {
    date: "2025-01-10",
    subject: "React",
    hours: "1",
    minutes: "30",
    mood: "4",
    focusLevel: "5",
    details: "Worked on EntryForm component",
  };

  const handleUpdateEntry = (entryData) => {
    console.log("Updating entry:", entryData);
  };

  return (
    <>
      <div className="master-cont">
        <div>
          <h1 className="new-entry-title-style">Edit Entry</h1>
          <EntryForm initialData={existingEntry} onSubmit={handleUpdateEntry} />
        </div>
      </div>
    </>
  );
};
export default EditEntry;
