import mongoose from "mongoose";
import { createAdmin } from "../utils/createAdmin.js";

export const connectToDb = async () => {
    await mongoose.connect(process.env.MONGO).then(async (data)=>{
    console.log('MONGODB CONNECTED WITH SERVER')
    await createAdmin();
}).catch(err => {console.log(err.message)})
} 