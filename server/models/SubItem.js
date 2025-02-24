import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Item } from "./Item.js";

export const SubItem = db.define("subItem", {
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL
    },
    imageUrl: {
        type: DataTypes.STRING
    }
}) 

SubItem.belongsTo(Item, {onDelete: 'CASCADE'})
Item.hasMany(SubItem)


db.sync()
  .then(() => {
    console.log('Sub item table has been created.');
  })
  .catch(err => console.log(err));