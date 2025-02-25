import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Item } from "./Item.js";
import User from "./User.js";

export const Cart = db.define("cart", {
}) 


Cart.belongsTo(User, {onDelete: 'CASCADE'})
User.hasOne(Cart)


db.sync()
  .then(() => {
    console.log('Cart table has been created.');
  })
  .catch(err => console.log(err));