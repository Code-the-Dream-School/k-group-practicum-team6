const Entries = () => {
  // add navigation
  // handler for selecting entries
  // another handler(s) for editing and deleting entries
  return (
    <>
      <div className="entry-master-cont">
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
