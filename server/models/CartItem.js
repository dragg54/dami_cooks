import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Cart } from "./Cart";

export const CartItem = db.define("cartItem", {
}) 


CartItem.belongsTo(Cart, {onDelete: 'CASCADE'})
Cart.hasMany(CartItem)


db.sync()
  .then(() => {
    console.log('Cart item table has been created.');
  })
  .catch(err => console.log(err));