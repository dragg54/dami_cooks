import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Cart } from "./Cart.js";
import { Item } from "./Item.js";

export const CartItem = db.define("cartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}) 


CartItem.belongsTo(Cart, {onDelete: 'CASCADE'})
Cart.hasMany(CartItem)

CartItem.belongsTo(Item, {onDelete: 'CASCADE'})
Item.hasMany(CartItem)


db.sync()
  .then(() => {
    console.log('Cart item table has been created.');
  })
  .catch(err => console.log(err));