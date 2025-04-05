import { DataTypes } from "sequelize";
import db from "../configs/db.js";

export const Notification = db.define("notification", {
    message: {
        type: DataTypes.STRING
    },
    sourceid:{
        type: DataTypes.INTEGER
    },
    notificationType: {
        type: DataTypes.STRING
    },
    read:{
        type: DataTypes.BOOLEAN
    }
})

db.sync()
  .then(() => {
    console.log('Notification table has been created.');
  })
  .catch(err => console.log(err));