import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Cart } from "./Cart.js";
import { Item } from "./Item.js";
import EventBooking from "./EventBooking.js";

export const EventBookingItem = db.define("eventBookingItem", {
    item: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    unitPrice:{
        type: DataTypes.INTEGER
    },
    totalPrice:{
        type: DataTypes.INTEGER
    }
}) 


db.sync()
  .then(() => {
    console.log('Booking item table has been created.');
  })
  .catch(err => console.log(err));