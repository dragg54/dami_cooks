import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Item } from "./Item.js";
import User from "./User.js";
import { Cart } from "./Cart.js";

export const Order = db.define("order", {
    status: {
        type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'DELIVERED'),
        defaultValue: 'PENDING'
    },
    amount: {
      type: DataTypes.INTEGER
    }
}) 

Order.belongsTo(Cart, {onDelete: 'CASCADE'})
Cart.hasMany(Order)

Order.belongsTo(User, {onDelete: 'CASCADE'})
User.hasMany(Order)

db.sync()
  .then(() => {
    console.log('Order table has been created.');
  })
  .catch(err => console.log(err));