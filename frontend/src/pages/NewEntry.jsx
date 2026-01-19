import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import EntryForm from "../components/EntryForm";



const NewEntry = () => {
  
  const handleCreateEntry = (entryData) => {
    console.log("Creating entry with data: ", entryData);
    
  };


  const navigate = useNavigate();

  const handleLogout = () => {
    authService.removeToken();
    authService.removeUsername();
    navigate("/"); // redirect to login page after logout
  };

  

  

  return (
    <>
      <div className="master-cont">
        {/* change to `Welcome ${name}`! */}
        <h1 className="new-entry-title-style">New Entry</h1>
        {/* placeholder entries */}
        <div className="master-cont">
          <div>
            <EntryForm onSubmit={handleCreateEntry} />

          </div>
        </div>

      </div>
    </>
  );
};
export default NewEntry;
