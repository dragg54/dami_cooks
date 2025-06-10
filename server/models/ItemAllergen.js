import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Item } from "./Item.js";
import User from "./User.js";
import { Cart } from "./Cart.js";
import { Order } from "./Order.js";
import { Allergens } from "./Allergens.js";

export const ItemAllergen = db.define("itemAllergen", {
}) 

ItemAllergen.belongsTo(Item, {foreignKey: "itemId", onDelete: "cascade"})
Item.belongsToMany(Allergens, {through: ItemAllergen, foreignKey: "itemId", onDelete: "cascade"})

ItemAllergen.belongsTo(Allergens, {foreignKey: "allergenId", onDelete: "cascade"})
Allergens.belongsToMany(Item, {through: ItemAllergen, foreignKey: "allergenId", onDelete: "cascade"})

db.sync()
  .then(() => {
    console.log('Payment table has been created.');
  })
  .catch(err => console.log(err));