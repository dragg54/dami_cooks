import { DataTypes } from 'sequelize';
import db from '../configs/db.js'
import { ItemCategory } from './ItemCategory.js';

export const Item = db.define("item", {
  itemCd:{
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  itemType: {
    type: DataTypes.ENUM("MAIN_ITEM", "SUB_ITEM"),
    defaultValue: "MAIN_ITEM"
  },
  uom:{
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type: DataTypes.ENUM('OFFLINE', 'ONLINE', 'OUTOFSTOCK'),
    defaultValue: 'OFFLINE'
  }
});

Item.belongsTo(ItemCategory, {onDelete: 'CASCADE'})
ItemCategory.hasMany(Item)

db.sync()
  .then(() => {
    console.log('Item table has been created.');
  })
  .catch(err => console.log(err));

