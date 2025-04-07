import { User } from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

// Genrate Token

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return accessToken, refreshToken;
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating tokens!!');
  }
};

// User Registration

const userRegister = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  //   console.log(req.body);

  if (
    [fullName, email, username, password].some((field) => field?.trim() == '')
  ) {
    throw new ApiError(400, 'All Fields are required');
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User Already Exist!!');
  }

  const user = await User.create({
    fullName,
    email,
    username,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while creating user!!');
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'User Registered Successfully!!'));
});

// Login User

const userLogin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(email || username)) {
    throw new ApiError(400, 'email or username are required!!');
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, 'User not Found!!');
  }

  const isPassword = await user.isPasswordCorrect(password);

  if (!isPassword) {
    throw new ApiError(401, 'Invalid User Credentials!!');
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, 'User Logged In Successfully!!'));
});

export { userRegister, userLogin };
