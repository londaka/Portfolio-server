import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "MERN Stack Developer" },
    about: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    cvUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);