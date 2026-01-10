const Entries = () => {
  return (
    <>
      <div className="master-cont">
         {/* Change to `${}'s entries` */}
        <h1 className="title-style">User Entries</h1>
       
        {/* placeholder entries */}
        <div
          className="bg-blue-500 rounded-lg m-1 mt-2 p-5 
          border-2 border-solid border-[black]">
          <div className="entry-cont-style">
            <button className="btn-style">Entry 1</button>
            <button className="btn-style">Entry 2</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Entries;
