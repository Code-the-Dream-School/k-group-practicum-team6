
export default function Footer() {

    return (
      <>
        <div className="footer-style">
          <select className="dropdown-style">
            <option value="default">Sort</option>
            <option value="Date">Date</option>
            <option value="Subject">Subject</option>
            <option value="Duration">Duration</option>
            <option value="Mood">Mood</option>
          </select>
          <button className="btn-style">Search</button>
          {/* <button className="btn-style">Pagination</button> */}
        </div>
      </>
    );
}