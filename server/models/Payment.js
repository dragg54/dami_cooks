import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Item } from "./Item.js";
import User from "./User.js";
import { Cart } from "./Cart.js";
import { Order } from "./Order.js";

export const Payment = db.define("Payment", {
    paymentType:{
        type: DataTypes.ENUM('STRIPE', 'PAYSTACK', 'PAYMENT_ON_DELIVERY', 'BANK_TRANSFER')
    },
    amountPaid:{
        type: DataTypes.FLOAT
    }
}) 

Payment.belongsTo(Cart, {onDelete: 'CASCADE'})
Cart.hasOne(Payment)

Payment.belongsTo(Order, {onDelete: 'CASCADE'})
Order.hasOne(Payment)

db.sync()
  .then(() => {
    console.log('Payment table has been created.');
  })
  .catch(err => console.log(err));