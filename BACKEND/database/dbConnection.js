import mongoose from "mongoose";


export const dbConnection= ()  =>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "HOSPITATE_HOSPITAL-MANAGEMENT-SYSTEM",
    }).then(()=>{
        console.log("Connected to Database")
    }).catch(err=>{
        console.log(`Some error occured while connecting to database:${err}`);
    });


};