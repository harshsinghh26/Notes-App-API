import { Notes } from '../models/notes.models.js';
import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

const createNotes = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const user = await User.findById(req.user._id);

  if ([title, content, tags].some((field) => field?.trim() == '')) {
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

export { createNotes };
