import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import File from "../models/File.js";
import fs from "fs"; // Import the fs module

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload file to Cloudinary
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // Automatically detect file type
      public_id: req.file.originalname, // Use the file name as the public ID
      access_mode: "public", // Make the file publicly accessible
    });

    // Save file metadata to MongoDB
    const newFile = new File({
      filename: req.file.originalname,
      url: result.secure_url,
    });
    await newFile.save();

    // Delete the temporary file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error uploading file" });
  }
});

// Get all files
router.get("/", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching files" });
  }
});

export default router;




// import express from "express";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import File from "../models/File.js";
// import fs from "fs";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // Upload file to Cloudinary and make it public
// router.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload the file to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "auto", // Automatically detect file type
//       public_id: req.file.originalname, // Use the file name as the public ID
//       access_mode: "public", // Make the file publicly accessible
//     });

//     // Save file metadata to MongoDB
//     const newFile = new File({
//       filename: req.file.originalname,
//       url: result.secure_url,
//     });
//     await newFile.save();

//     // Delete the temporary file
//     fs.unlinkSync(req.file.path);

//     res.status(201).json({
//       message: "File uploaded successfully",
//       file: newFile,
//     });
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ message: "Error uploading file" });
//   }
// });

// export default router;