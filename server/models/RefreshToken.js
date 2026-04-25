import { DataTypes } from "sequelize";
import db from "../configs/db.js";

export const RefreshTokens = db.define("refreshTokens", {
    userId: {
        type: DataTypes.INTEGER,
        references:{
            model: "users",
            key: "id"
        }
    },
    token: {
        type: DataTypes.TEXT
    },
    expiresAt: {
        type: DataTypes.DATE
    }
}) 

db.sync()
  .then(() => {
    console.log('Refresh tokens table has been created.');
  })
  .catch(err => console.log(err));