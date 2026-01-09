// services/eventBookingService.js
import { BadRequestError } from "../exceptions/BadRequestError.js";
import EventBooking from "../models/EventBooking.js";
import { EventBookingItem } from "../models/EventBookingItem.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import dotenv from 'dotenv'
import { generateCd } from "../utils/generateCd.js"
import { sendBookingQuotationAcknowlegementMail } from "../emails/sendMessages/sendBookingQuotationAcknowlegementMail.js";
import User from "../models/User.js";
import { generateQuotationPdf } from "../emails/misc/QuotationPdf.js";
import { Notification } from "../models/Notification.js";

dotenv.config()

class EventBookingService {
    static clientUrl = process.env.NODE_ENV == "Development" ? process.env.LOCAL_CLIENT_URL : process.env.PROD_CLIENT_URL

    static async createEventBooking(data, transaction) {
        data.bknId = generateCd("BKN")
        await EventBooking.create({...data, userId: req.user.id}, {transaction});
        await Notification.create({
            read: false,
            message: `You have a new booking`,
            notificationType: 'BookingNotification'
        }, { transaction: transaction })
    }

    static async getAllEventBookings(req) {
        const { page, size, status, searchText, name, email } = req.query;
        const { limit, offset } = getPagination(page, size);
        const queryOpts = {where: {}}
        if(status){
            queryOpts.where = {...queryOpts.where, status}
        }
        const bookings = await EventBooking.findAndCountAll({
            ...queryOpts,
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
        const { id: userId } = req.user
        const existingBooking = await EventBooking.findByPk(id, {
            include: [{
                model: EventBookingItem
            }]
        })
        if (!existingBooking) {
            throw new BadRequestError("Event booking not found for " + id)
        }
        await EventBooking.update({
            bookingCharge: req.body.bookingCharge,
            bookingStatus: "quote_computed", eventBookingAcknowlegementUrl:
                EventBookingService.clientUrl + `/eventBooking/${id}/quotation-acknowlegement/${existingBooking.userId}`
        }, { where: { id }, transaction })
        const user = await User.findByPk(userId)
        const userNames = existingBooking.dataValues.firstName + " " + existingBooking.dataValues.lastName
        const customerEventBookingLink = EventBookingService.clientUrl + `/eventBooking/${id}/quotation-acknowlegement/${existingBooking.dataValues.userId}`
        await EventBookingItem.destroy({ where: { eventBookingId: id }, transaction })
        await EventBookingItem.bulkCreate(bookingItems, { transaction })
        // await sendBookingQuotationAcknowlegementMail(userNames, customerEventBookingLink, existingBooking.dataValues.email)
    }

    static async getEventBookingItems(req) {
        const { id } = req.params
        const eventBookingItems = await EventBookingItem.findAll({
            where: {
                eventBookingId: id
            },
            include:[
                {
                    model: EventBooking
                }
            ]
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

    static async updateEventBookingStatus(req){
        const { id } = req.params
        const existingBooking = await EventBooking.findByPk(id, {
            include: [{
                model: EventBookingItem
            }]
        })
        if (!existingBooking) {
            throw new BadRequestError("Event booking not found for " + id)
        }

        switch (req.body.bookingStatus) {
            case "quote_acknowleged":
            case "quote_rejected":
                if (req.user.id != existingBooking.userId) {
                    throw new BadRequestError("User cannot acknowleged by another user")
                }
                if (existingBooking.bookingStatus != "quote_computed") {
                    throw new BadRequestError("Quote cannot be acknowleged or rejected without being computed")
                }
                await EventBooking.update({
                    bookingStatus: req.body.bookingStatus
                }, { where: { id } })

        }
    }
}

export default EventBookingService;
