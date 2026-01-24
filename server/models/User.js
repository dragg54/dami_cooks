import { DataTypes } from 'sequelize';
import db from '../configs/db.js'

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Ensures ID is auto-generated
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  postalCode: {
    type: DataTypes.STRING,

  },
  isFirst: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailVerificationToken: DataTypes.TEXT,
  emailTokenExpiresAt: DataTypes.DATE,
  resetPasswordToken: DataTypes.TEXT,
  resetPasswordTokenExpiresAt: DataTypes.DATE
});

db.sync()
  .then(() => {
    console.log('User table has been created.');
  })
  .catch(err => console.log(err));

export default User