const Entry = require('../models/Entry');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

//-- GET all entries
const getAllEntries = async (req, res) => {
  const entries = await Entry.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ entries, count: entries.length });
};

//-- GET an entry
const getEntry = async(req, res, next) => {
  const {
    user: { userId },
    params: { id: entryId }
  } = req;

  const entry = await Entry.findById(entryId);
  if (!entry) {
    throw new NotFoundError(`No entry with ID: ${entryId}`);
  }

  if (entry.createdBy.toString() !== userId) {
    throw new ForbiddenError('You are not authorized to view this entry');
  }
  res.status(StatusCodes.OK).json({entry});
};

//-- CREATE a new entry
const createEntry = async(req, res) => {
  const allowedFields = ['subject', 'duration', 'mood', 'focus', 'details'];

  const entryData = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      entryData[field] = req.body[field];
    }
  });

  entryData.createdBy = req.user.userId;

  const entry = await Entry.create(entryData);
  res.status(StatusCodes.CREATED).json({ entry });
};

//-- UPDATE an entry
const updateEntry = async(req, res, next) => {
  const {
    user: { userId },
    params: { id: entryId },
    body    // fields from the frontend to update
  } = req;

  // Only allow specific fields to be updated
  const updateData = {};
  const allowedFields = ['subject', 'duration', 'mood', 'focus', 'details'];

  // Only fields provided by the frontend will be updated
  allowedFields.forEach((field) => {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    throw new BadRequestError('No valid fields provided for update');
  }

  const entry = await Entry.findById(entryId);
  if (!entry) {
    throw new NotFoundError(`No entry with ID: ${entryId}`);
  }

  if (entry.createdBy.toString() !== userId) {
    throw new ForbiddenError('You are not authorized to update this entry');
  }

  Object.assign(entry, updateData);
  await entry.save();
  res.status(StatusCodes.OK).json({entry});
};

//-- DELETE an entry
const deleteEntry = async(req, res, next) => {
  const {
    user: { userId },
    params: { id: entryId }
  } = req;

  const entry = await Entry.findById(entryId);
  if (!entry) {
    throw new NotFoundError(`No entry with ID: ${entryId}`);
  }

  if (entry.createdBy.toString() !== userId) {
    throw new ForbiddenError('You are not authorized to delete this entry');
  }

  await entry.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Entry deleted" });
};

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
}