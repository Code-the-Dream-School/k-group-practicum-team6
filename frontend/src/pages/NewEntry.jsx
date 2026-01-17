import React, { useState } from "react";
import EntryForm from "../components/EntryForm";

const NewEntry = () => {
  return (
    <>
      <div className="master-cont-2">
        <div className="entry-cont-style">
          <div>
              <h1 className="new-entry-title-style">New Entry</h1>
            <EntryForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default NewEntry;
