// controllers/eventBookingController.js
import db from "../configs/db.js";
import EventBookingService from "../services/EventBookingService.js";

class EventBookingController {
    static async createBooking(req, res) {
        const transaction = await db.transaction()
        try {
            const booking = await EventBookingService.createEventBooking(req.body, transaction, req.user);
            await transaction.commit()
            res.status(201).json({ message: "Booking created successfully", booking });
        } catch (error) {
            console.log(error)
            await transaction.rollback()
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }

    static async getAllBookings(req, res) {
        try {
            const bookings = await EventBookingService.getAllEventBookings(req);
            res.status(200).json(bookings);
        } catch (error) {
            console.log(error)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }

    static async getBookingById(req, res) {
        try {
            const booking = await EventBookingService.getEventBookingById(req.params.id);
            if (!booking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json(booking);
        } catch (error) {
            console.log(error)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }

    static async updateBookingCharge(req, res) {
        const transaction = await db.transaction()
        try {
            const booking = await EventBookingService.updateEventBookingCharge(req, transaction);
            await transaction.commit()
            res.status(200).json({ message: "Booking charge updated successfully", booking });
        } catch (error) {
            console.log(error)
            await transaction.rollback()
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }

    static async updateBooking(req, res) {
        try {
            const booking = await EventBookingService.updateEventBooking(req.params.id, req.body);
            res.status(200).json({ message: "Booking updated successfully", booking });
        } catch (error) {
            console.log(error)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }

     static async updateBookingStatus(req, res) {
        try {
            const booking = await EventBookingService.updateEventBookingStatus(req);
            res.status(200).json({ message: "Booking updated successfully", booking });
        } catch (error) {
            console.log(error)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }

    static async getEventBookingItems(req, res){
         try {
            const booking = await EventBookingService.getEventBookingItems(req);
            if (!booking) return res.status(404).json({ message: "Booking not found" });
            res.status(200).json(booking);
        } catch (error) {
            console.log(error)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }

    static async deleteBooking(req, res) {
        try {
            await EventBookingService.deleteEventBooking(req.params.id);
            res.status(200).json({ message: "Booking deleted successfully" });
        } catch (error) {
            console.log(error)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
    }
}

export default EventBookingController;
