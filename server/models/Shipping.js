import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { Order } from "./Order.js";
import User from "./User.js";

export const Shipping = db.define('shipping', {
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: "United Kingdom"
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provider: {
    type: DataTypes.STRING,
    defaultValue: "STUART"
  },
  stuartJobId: {
    type: DataTypes.STRING
  },
  stuartTrackingUrl: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM(
      "QUOTE_CREATED",
      "PENDING",
      "ACCEPTED",
      "PICKUP_STARTED",
      "PICKED_UP",
      "DROP_OFF_STARTED",
      "DELIVERED",
      "CANCELLED",
      "FAILED"
    )
  },
  deliveryFee: {
    type: DataTypes.DECIMAL(10, 2)
  },
  etaMinutes: {
    type: DataTypes.INTEGER
  },
  distanceKm: {
    type: DataTypes.DECIMAL(10, 2)
  }
})

Shipping.belongsTo(Order, { onDelete: 'CASCADE' })
Order.hasOne(Shipping)

Shipping.belongsTo(User, { onDelete: 'CASCADE' })
User.hasOne(Shipping)


db.sync()
  .then(() => {
    console.log('Shipping table has been created.');
  })
  .catch(err => console.log(err));