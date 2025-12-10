// routes/eventBookingRoutes.js
import express from "express";
import EventBookingController from "../controllers/EventBookingController.js";

const router = express.Router();

// Create booking
router.post("/", EventBookingController.createBooking);

// Get all bookings
router.get("/", EventBookingController.getAllBookings);

router.put("/:id/charges", EventBookingController.updateBookingCharge);

router.get("/:id/bookingItems", EventBookingController.getEventBookingItems);


// Get booking by id
router.get("/:id", EventBookingController.getBookingById);

// Update booking
router.put("/:id", EventBookingController.updateBooking);

// Delete booking
router.delete("/:id", EventBookingController.deleteBooking);

export default router;
