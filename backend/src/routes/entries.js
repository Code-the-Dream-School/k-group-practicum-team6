
const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
  loadEntries,
} = require("../controllers/entries");

router
  .route("/")
  .get(getAllEntries)
  // .get(loadEntries)
  .post(createEntry);

router.route("/:id").get(getEntry).patch(updateEntry).delete(deleteEntry);

module.exports = router;
