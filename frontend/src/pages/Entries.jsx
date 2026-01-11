const Entries = () => {
  // add navigation
  // handler for selecting entries
  // another handler(s) for editing and deleting entries
  return (
    <>
      <div className="bg-blue-500 rounded-lg p-1 m-1 border-2 border-solid border-[black]">
        {/* Change to `${}'s entries` */}
        <h1 className="user-title-style">User Entries</h1>

        {/* placeholder entries */}
        <div>
          <div className="user-entry-cont-style">
            {/* change to have each entry and edit and delete buttons */}
            <button className="btn-style">Entry 1</button>
            <button className="btn-style">Entry 2</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Entries;
