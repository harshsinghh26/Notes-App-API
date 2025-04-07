import { Notes } from '../models/notes.models.js';
import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

// Creating Notes

const createNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, 'Unauthorize Access!!');
  }

  const { title, content, tags } = req.body;

  if (!(title && content && tags)) {
    throw new ApiError(400, 'All fields are required!!');
  }
  const notes = await Notes.create({
    title,
    content,
    tags,
    user: req.user._id,
  });

  if (!notes) {
    throw new ApiError(500, 'Something went Wrong while generating Notes!!');
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { notes, user: user.username },
        'Notes Added Successfully!!',
      ),
    );
});

// Get All Notes

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find({ user: req.user?._id });
  //   console.log(task);
  return res
    .status(200)
    .json(new ApiResponse(200, notes, 'Notes fetched Successfully!!'));
});

// Get task by Id

const getNotesById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notes = await Notes.findById(id);

  return res
    .status(200)
    .json(new ApiResponse(200, notes, 'Notes fetched Successfullu!!'));
});

// Update Notes

const updateNotes = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const { id } = req.params;

  if (!(title && content && tags)) {
    throw new ApiError(400, 'All fields are required!!');
  }

  const newNotes = await Notes.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        content,
        tags,
      },
    },
    { new: true },
  );

  if (!newNotes) {
    throw new ApiError(500, 'Something went wrong while changing data!!');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newNotes, 'Notes Data Updated Successfully!!'));
});

// Delete Notes

const deleteNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Notes.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Data deleted Successfully!!'));
});

export { createNotes, getNotes, getNotesById, updateNotes, deleteNotes };
