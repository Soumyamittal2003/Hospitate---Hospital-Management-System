import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";



// create patient record module
export const patientRegister = catchAsyncError(async(req,res,next)=>{
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
    } =req.body;

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !role){
            return next(new ErrorHandler("Please Fill Full Form!",400));
        }
        let user= await User.findOne({email});
         if (user) {
            return next(new ErrorHandler("User Already Registered!",400));
         }

         user= await User.create({
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
         generateToken(user,"User Registered!",200,res)
        

});


// login module
export const login = catchAsyncError(async(req,res,next)=>{
    const{email,password,confirmPassword,role}=req.body;
    if(!email || !password|| !confirmPassword|| !role){
        return next(new ErrorHandler("Please Provide All DEtails!",400));
    }

    if(password!==confirmPassword){
        return next (new ErrorHandler("Password And COnfirm Password Do not match",400))
    }
    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next (new ErrorHandler("Invaild Password Or Email",400))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next (new ErrorHandler("Invaild Password Or Email",400))
    }
    if(role !== user.role){
        return next (new ErrorHandler("user with this Role not found",400))
    }
    generateToken(user,"User Login successfully!",200,res)


})

// create admin module

export const addnewAdmin = catchAsyncError(async(req,res,next)=>{
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        
    } =req.body;

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic){
            return next(new ErrorHandler("Please Fill Full Form!",400));
        }
    let isRegistered= await User.findOne({email});
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this Email Already Registered!`,400));
        }

    const admin= await User.create({
           firstName,
           lastName,
           email,
           phone,
           password,
           gender,
           dob,
           nic,
           role:"Admin",

        });
        res.status(200).json({
            success:true,
            message:"New Admin Registered"
        });
});
