import { UnauthorizedError } from "../exceptions/UnauthorizedError.js"
import { AdminSetting } from "../models/AdminSettings.js"
import { addHours, addMinutes, addSeconds, differenceInMilliseconds } from "date-fns";

export const updateAdminSettings = async (req) => {
    const isAdmin = req.user.isAdmin
    if (!isAdmin) {
        throw new UnauthorizedError("Only admin can perform operation")
    }
    await AdminSetting.update({ ...req.body }, {
        where: {
            id: !null
        }
    })

    await goOnline(req)
}

export const getAdminSettngs = async (req) => {
    const adminSettings = await AdminSetting.findOne({ where: { id: !null } })
    return adminSettings
}


async function goOnline( request) {
    const adminSettings = await AdminSetting.findOne({ raw: true });
    console.log(request.body)
    console.log(adminSettings)
    if (!request.body.isOnline && !adminSettings.isOnline) {
        const offlineEndTime = addHours(new Date(), adminSettings.offlineDuration);
        const timeoutDuration = differenceInMilliseconds(offlineEndTime, new Date());
        setTimeout(async () => {
            await AdminSetting.update({isOnline: true}, {where: {id: adminSettings.id}})
            console.log("Restaurant is now back online!");
        }, timeoutDuration);
    }

}
