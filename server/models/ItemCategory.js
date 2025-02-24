import { DataTypes } from "sequelize";
import db from "../configs/db.js";

export const ItemCategory = db.define("itemCategory", {
    name: {
        type: DataTypes.STRING
    }
})

db.sync()
  .then(() => {
    console.log('Item category table has been created.');
  })
  .catch(err => console.log(err));