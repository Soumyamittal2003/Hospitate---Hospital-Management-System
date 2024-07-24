import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";




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
         res.status(200).json({
            success:true,
            message:"user Registerd",
         });

});

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
    res.status(200).json({
        success:true,
        message:"User Logged In Successfully",
     });


})