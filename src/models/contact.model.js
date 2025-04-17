import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
