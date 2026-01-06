const { createCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middleware/async");

//-- GET all entries
const getAllEntries = asyncWrapper(async (req, res) => {
  // res.send('Get all jobs');

  // const entries = await Entry.find({});
  // res.status(200).json({ entries });
  res.status(200).json({ msg: "Success - getAllEntries" });
});

//-- GET an entry
const getEntry = asyncWrapper(async(req, res, next) => {
 //// res.json({ id: req.params.id });

  const { id: entryId } = req.params;
  const entry = await Entry.findOne({ _id: entryId });
  if (!entry) {
  //   return res.status(404).json({ msg: `No entry with ID: ${entryId}` });
    return next(createCustomError(`No entry with ID: ${entryId}`, 404));
  }
  res.status(200).json({ entry });
  res.status(200).json({ msg: "Success - getEntry"});
});

//-- CREATE a new entry
const createEntry = asyncWrapper(async(req, res) => {
  // res.json(req.body);

  // const entry = await Entry.create(req.body);
  // res.status(201).json({ entry });
  res.status(201).json({ msg: "Success - Entry created" });
});

//-- UPDATE an entry
const updateEntry = asyncWrapper(async(req, res, next) => {
  // res.send('Update entry');

  // const { id: entryId } = req.params;
  // const entry = await Entry.findOneAndUpdate({ _id: entryId }, req.body, {
  //   new: true,
  //   runValidators: true,
  // })

  // if (!entry) {
  //// return res.status(404).json({ msg: `No entry with ID: ${entryId}`});
  //   return next(createCustomError(`No entry with ID: ${entryId}`, 404));
  // }
  // res.status(200).json({ entry });

  res.status(200).json({ msg: "Success - Update entry"});
});

//-- DELETE an entry
const deleteEntry = asyncWrapper(async(req, res, next) => {
  // res.json({ msg: 'Entry deleted successfully'});

  // const { id: entryId } = req.params;
  // const entry = await Entry.findOneAndDelete({ _id: entryId });
  // if (!entry) {
  //// return res.status(404).json({ msg: `No entry with ID: ${entryId}`});
  //   return next(createCustomError(`No entry with ID: ${entryId}`, 404));
  // }
  // res.status(200).json({ entry });
  res.status(200).json({ msg: "Success - Delete entry"});
});

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
}