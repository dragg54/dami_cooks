import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Order } from "./Order.js";

export const Receipt = db.define("receipt", {
    status:{
        type: DataTypes.ENUM("sent", "failed")
    }
}) 


Receipt.belongsTo(Order, {onDelete: 'CASCADE'})
Order.hasOne(Receipt)


db.sync()
  .then(() => {
    console.log('Receipt table has been created.');
  })
  .catch(err => console.log(err));