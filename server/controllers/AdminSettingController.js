import * as adminSettingService from "../services/SettingsService.js"

export const updateAdminSettings = async(req, res) =>{
    try {
            await adminSettingService.updateAdminSettings(req)
            res.json("Admin settings updated")
        }
        catch (error) {
            console.log(error.message)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
}

export const getAdminSettings = async(req, res) =>{
    try {
           const adminSettings = await adminSettingService.getAdminSettngs(req)
            res.json(adminSettings)
        }
        catch (error) {
            console.log(error.message)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
}