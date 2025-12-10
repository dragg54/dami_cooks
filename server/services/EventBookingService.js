// services/eventBookingService.js
import { BadRequestError } from "../exceptions/BadRequestError.js";
import EventBooking from "../models/EventBooking.js";
import { EventBookingItem } from "../models/EventBookingItem.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import dotenv from 'dotenv'
import { generateCd } from "../utils/generateCd.js"

dotenv.config()

class EventBookingService {
    static clientUrl = process.env.NODE_ENV == "Development" ? process.env.LOCAL_CLIENT_URL : process.env.PROD_CLIENT_URL
    
    static async createEventBooking(data) {
        data.bknId = generateCd("BKN")
        return await EventBooking.create(data);
    }

    static async getAllEventBookings(req) {
        const { page, size, status, searchText, name, email } = req.query;
            const { limit, offset } = getPagination(page, size);
        const bookings = await EventBooking.findAndCountAll({
            limit,
            offset,
            });
            return getPagingData(bookings, page, limit)
    }

    static async getEventBookingById(id) {
        return await EventBooking.findByPk(id);
    }

    static async updateEventBookingCharge(req, transaction) {
        const { bookingItems } = req.body
        const { id } = req.params
        const existingBooking = await EventBooking.findByPk(id)
        if (!existingBooking) {
            throw new BadRequestError("Event booking not found for " + id)
        }
        console.log(EventBookingService.clientUrl)
        await EventBooking.update({ bookingCharge: req.body.bookingCharge, 
             bookingStatus: "quote_computed", eventBookingAcknowlegementUrl:  
              EventBookingService.clientUrl + `/eventBooking/${id}/quotion-acknowlegement`
            }, { where: { id }, transaction })
 
        await EventBookingItem.destroy({ where: { eventBookingId: id }, transaction})
        await EventBookingItem.bulkCreate(bookingItems, {transaction})
    }

    static async getEventBookingItems(req){
        const { id } = req.params
        const eventBookingItems = await EventBookingItem.findAll({
            where:{
                eventBookingId: id
            }
        })
        return eventBookingItems
    }

    static async updateEventBooking(id, data) {
        const booking = await EventBooking.findByPk(id);
        if (!booking) throw new Error("Booking not found");
        return await booking.update(data);
    }

    static async deleteEventBooking(id) {
        const booking = await EventBooking.findByPk(id);
        if (!booking) throw new Error("Booking not found");
        return await booking.destroy();
    }
}

export default EventBookingService;
