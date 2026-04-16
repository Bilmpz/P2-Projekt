import dotenv from "dotenv";
import mongoose from "mongoose";
import Group from "./src/models/Group.model.js";
import connectDB from "./src/config/db.js";

dotenv.config({
  path: "./.env",

});

const hardcodedGroups = [
  {
    name: "ALG",
    description: "Algorithms and Data Structures",
    location: "CPH",
    department: "Computer Science",
  },
  {
    name: "DEB",
    description: "Design and Evaluation of User Interfaces",
    location: "CPH",
    department: "Computer Science",
  },
  {
    name: "IWP",
    description: "Internetworking and Web-programming",
    location: "CPH",
    department: "Computer Science",
  },
  {
    name: "SLIAL",
    description: "Probability Theory and Linear Algebra",
    location: "CPH",
    department: "Computer Science",
  },
];

const seedGroups = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    // Indsætter hardcoded groups
    const groups = await Group.insertMany(hardcodedGroups);
    console.log(`Successfully seeded ${groups.length} groups`);

    groups.forEach((group) => {
      console.log(`  - ${group.name}: ${group.description}`);
    });

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding groups:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};



export {seedGroups}