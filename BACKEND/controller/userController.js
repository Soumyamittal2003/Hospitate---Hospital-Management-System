import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

// create patient record module

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  });
  generateToken(user, "User Registered!", 200, res);
});

// login module

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All DEtails!", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password And COnfirm Password Do not match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invaild Password Or Email", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invaild Password Or Email", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("user with this Role not found", 400));
  }
  generateToken(user, "User Login successfully!", 200, res);
});

// create admin module

export const addnewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this Email Already Registered!`,
        400
      )
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered",
  });
});

//module for getting all doctors

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

//module for getting all user

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//module for logout Admin

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Log out Successfully",
    });
});

//module for logout Patient

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Log out Successfully",
    });
});

//module for add new doctor

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Provide Full Details", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email`,
        400
      )
    );
  }
  const cloudinararyResponce = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinararyResponce || cloudinararyResponce.error) {
    console.errror(
      "cloudinary Error:",
      cloudinararyResponce.error || "Unknown Cloudinary Error"
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar:{
      public_id: cloudinararyResponce.public_id,
      url: cloudinararyResponce.secure_url,
    },

  });
  res.status(200).json({
    success:true,
    message:"New Doctor Registered",
    doctor
  })


});
