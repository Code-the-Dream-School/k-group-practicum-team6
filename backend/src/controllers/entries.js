//-- GET all entries
const getAllEntries = async (req, res) => {
  res.send('Get all jobs');
}

//-- GET an entry
const getEntry = async(req, res) => {
  res.json({ id: req.params.id });
}

//-- CREATE a new entry
const createEntry = async(req, res) => {
  res.json(req.body);
}

//-- UPDATE an entry
const updateEntry = async(req, res) => {
  res.send('Update entry');
}

//-- DELETE an entry
const deleteEntry = async(req, res) => {
  res.json({ msg: 'Entry deleted successfully'});
}

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
}