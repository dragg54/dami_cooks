import { DataTypes } from 'sequelize';
import db from '../configs/db.js'
import { ItemCategory } from './ItemCategory.js';

export const Item = db.define("item", {
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
    type: DataTypes.STRING, // Store image path/URL
    allowNull: true,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Available by default
  },
});

Item.belongsTo(ItemCategory, {onDelete: 'CASCADE'})
ItemCategory.hasMany(Item)

db.sync()
  .then(() => {
    console.log('Item table has been created.');
  })
  .catch(err => console.log(err));

