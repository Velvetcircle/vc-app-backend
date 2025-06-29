import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bookingsRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// default
app.get("/", (req, res) => {
  res.send("Velvet Circle backend is running");
});

// bookings route
app.use("/api/bookings", bookingsRoutes);

// run server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
