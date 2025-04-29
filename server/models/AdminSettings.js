import { DataTypes } from "sequelize";
import db from "../configs/db.js";

export const AdminSetting = db.define('AdminSetting', {
    isOnline: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    offlineDuration: {
        type: DataTypes.TINYINT
    },
    orderReportFrequency: {
        type: DataTypes.ENUM("daily", "weekly", "monthly"),
        defaultValue: "monthly"
    },
    paymentReportFrequency: {
        type: DataTypes.ENUM("daily", "weekly", "monthly"),
        defaultValue: "monthly"
    },
    sendCancellationNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sendPaymentReportNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sendOrderReportNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sendNewOrderNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sendOrderPlacementNotification: { // fixed typo here
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sendPaymentNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

db.sync()
  .then(() => {
    console.log('Admin setting table has been created.');
  })
  .catch(err => console.log(err));
