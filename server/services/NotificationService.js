import { Op } from "sequelize"
import { Notification } from "../models/Notification.js"

export const createNotification = async (req) =>{
   await Notification.create(req)
}

export const getNotifications = async(req) =>{
   return Notification.findAll({
      where:{read: false}
   })
}

export const updateNotificationStatus = async(req) =>{
   await Notification.update({read: true}, {where:{
     read: false
   }})
}