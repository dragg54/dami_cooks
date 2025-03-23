import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Item } from "./Item.js";
import User from "./User.js";
import { Cart } from "./Cart.js";
import { Order } from "./Order.js";

export const Payment = db.define("payment", {
    paymentGateway:{
       type: DataTypes.ENUM('STRIPE', 'PAYSTACK', 'TRANSFER'),
        defaultValue: 'STRIPE'
    },
    gatewayPaymentId:{
        type: DataTypes.STRING
    },
    paymentType: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM('succeeded', 'cancelled', 'processing'),
      defaultValue: 'processing'
    }
}) 

Payment.belongsTo(Order)
Order.hasOne(Payment)

db.sync()
  .then(() => {
    console.log('Payment table has been created.');
  })
  .catch(err => console.log(err));