import { DataTypes } from "sequelize";
import db from "../configs/db.js";

export const Allergens = db.define("allergens", {
    name:{
        type: DataTypes.STRING
    }
}) 

db.sync()
  .then(() => {
    console.log('Allergens table has been created.');
  })
  .catch(err => console.log(err));