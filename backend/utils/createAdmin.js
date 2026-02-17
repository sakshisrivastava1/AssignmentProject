import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createAdmin = async () => {
  const existingAdmin = await userModel.findOne({ role: "admin" });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("12345678", 12);

  await userModel.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created successfully");
};
