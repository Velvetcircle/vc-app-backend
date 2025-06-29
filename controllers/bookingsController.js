export const createBooking = (req, res) => {
  const data = req.body;
  console.log("New Booking: ", data);
  res.status(201).json({ message: "Booking created", data });
};

export const getBookings = (req, res) => {
  // dummy for now
  res.status(200).json([{ id: 1, user: "test", hours: 2 }]);
};
