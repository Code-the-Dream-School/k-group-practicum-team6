import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";



const NewEntry = () => {
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [mood, setMood] = useState("");
  const [focusLevel, setFocusLevel] = useState("");
  const [details, setDetails] = useState("");


  const navigate = useNavigate();

  const handleLogout = () => {
    authService.removeToken();
    authService.removeUsername();
    navigate("/"); // redirect to login page after logout
  };

  

  let durationContent;

  if (isDurationOpen) {
    durationContent = (
      <div className="input-style flex gap-2 items-center bg-white text-black">
        <select
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="bg-transparent outline-none w-1/2"
        >
          <option value="0">0 hrs</option>
          <option value="1">1 hr</option>
          <option value="2">2 hrs</option>
          <option value="3">3 hrs</option>
        </select>
    
        <select
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="bg-transparent outline-none w-1/2"
        >
          <option value="0">0 mins</option>
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
          <option value="45">45 mins</option>
        </select>
      </div>
    )
  } else {
    durationContent = (
      <button
        className="input-style w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
        onClick={() => setIsDurationOpen(true)}
      >
        Duration
      </button>
    )
  }

  return (
    <>
      <div className="master-cont">
        {/* change to `Welcome ${name}`! */}
        <h1 className="title-style">New Entry</h1>
        <div className="header-style">
          <button className="btn-style">+ New Entry</button>
          <button className="btn-style">View</button>
          <button className="btn-style" onClick={handleLogout}>
            Log out
          </button>
        </div>
        {/* placeholder entries */}
        <div className="entry-cont-style">
          <div>
            <h1 className="new-entry-title-style">New Entry</h1>
            <input 
                type="text" 
                placeholder="Date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-style bg-white placeholder-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p>You enter: {date}</p>


            <input
              type="text"
              placeholder="Entry subject(s)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input-style bg-white placeholder-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />


            {durationContent}

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="input-style w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
            >
              <option value="">Mood</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

           
            <select
              value={focusLevel}
              onChange={(e) => setFocusLevel(e.target.value)}
              className="input-style w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
            >
              <option value="">Focus Level</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            
            <input
              type="text"
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="input-style bg-white placeholder-black border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />


            <div className="flex relative left-[20px]">
              <button className="btn-style">Save</button>
              <button className="btn-style">Cancel</button>
            </div>
          </div>
        </div>
        <div className="footer-style">
          <select className="dropdown-style">
            <option value="default">Sort</option>
            <option value="Date">Date</option>
            <option value="Subject">Subject</option>
            <option value="Duration">Duration</option>
            <option value="Mood">Mood</option>
          </select>
          <button className="btn-style">Search</button>
          <button className="btn-style">Pagination</button>
        </div>
      </div>
    </>
  );
};
export default NewEntry;
