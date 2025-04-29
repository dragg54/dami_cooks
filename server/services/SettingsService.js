import { UnauthorizedError } from "../exceptions/UnauthorizedError.js"
import { AdminSetting } from "../models/AdminSettings.js"

export const updateAdminSettings = async (req) =>{
   const isAdmin = req.user.isAdmin
   if(!isAdmin){
    throw new UnauthorizedError("Only admin can perform operation")
   }
   await AdminSetting.update({...req.body}, {where:{
    id: !null
   }})
}

export const getAdminSettngs = async(req) =>{
    const isAdmin = req.user.isAdmin
    if(!isAdmin){
     throw new UnauthorizedError("Only admin can perform operation")
    }
    const adminSettings = await AdminSetting.findOne({where:{id: !null}})
    return adminSettings
}