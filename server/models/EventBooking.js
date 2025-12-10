// models/EventBooking.js
import { DataTypes } from "sequelize";
import sequelize from "../configs/db.js"; 
import { EventBookingItem } from "./EventBookingItem.js";

const EventBooking = sequelize.define("eventBooking", {
    bknId:{
        type: 
            DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    guestCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bookingCharge:{
        type: DataTypes.INTEGER
    },
    eventDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    eventStartTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    eventEndTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    eventLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bookingStatus: {
        type: DataTypes.ENUM("quote_requested", "quote_computed", "quote_acknowleged", "booked", "completed", "postponed"),
        defaultValue: "quote_requested"
      },
    eventBookingAcknowlegementUrl:{
        type: DataTypes.STRING
    },
    cateringType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dietaryRequirements: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    foodPackageReferences: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});
EventBooking.hasMany(EventBookingItem)
EventBookingItem.belongsTo(EventBooking, {onDelete: 'CASCADE'})

export default EventBooking;
