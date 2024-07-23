export const catchAsyncError =(theFunction) =>{
    return (Req,res,next) =>{
        Promise.resolve(theFunction(req,res,next)).catch(next);
    };
};