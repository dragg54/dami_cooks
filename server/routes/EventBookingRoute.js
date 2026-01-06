// routes/eventBookingRoutes.js
import express from "express";
import EventBookingController from "../controllers/EventBookingController.js";
import { authMiddleware } from "../middlewares/validate.js";

const router = express.Router();

router.post("/", authMiddleware, EventBookingController.createBooking);

router.get("/", EventBookingController.getAllBookings);

router.put("/:id/charges", authMiddleware, EventBookingController.updateBookingCharge);

router.patch("/:id/status", authMiddleware, EventBookingController.updateBookingStatus);

router.get("/:id/bookingItems", EventBookingController.getEventBookingItems);

router.get("/:id", EventBookingController.getBookingById);

router.put("/:id", authMiddleware, EventBookingController.updateBooking);

router.delete("/:id", EventBookingController.deleteBooking);

export default router;
