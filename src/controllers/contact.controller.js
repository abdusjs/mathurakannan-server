import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Create a new contact document and save it to the database
export const createContact = async (req, res) => {
  try {
    const { name, email, state } = req.body;

    // Validate input fields
    if (!name || !email || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new contact document
    const newContact = new Contact({
      name,
      email,
      state,
    });

    // Save the contact document to the database
    await newContact.save();

    // Set up the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Subscribe Form Submission",
      text: `You have a new subscribe form submission:
      
      Name: ${name}
      Email: ${email}
      State: ${state}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ error: "Failed to send email", details: error.message });
      }
      console.log("Email sent:", info.response);
    });

    // Send a response back to the client
    res
      .status(201)
      .json({ message: "Subscribe created and email sent successfully" });
  } catch (error) {
    console.error("Error creating subscribe:", error.message);
    res
      .status(500)
      .json({ error: "Failed to create subscribe", details: error.message });
  }
};
