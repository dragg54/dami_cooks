import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Item } from "./Item.js";
import { Order } from "./Order.js";

export const OrderItem = db.define('orderItem',{
    quantity: {
        type: DataTypes.INTEGER
    }
})

OrderItem.belongsTo(Item, {onDelete: 'CASCADE'})
Item.hasOne(OrderItem)

OrderItem.belongsTo(Order, {onDelete: 'CASCADE'})
Order.hasMany(OrderItem)


db.sync()
  .then(() => {
    console.log('Order item table has been created.');
  })
  .catch(err => console.log(err));