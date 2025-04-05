import * as NotificationService from '../services/NotificationService.js'

export const createNotification = async (req, res) => {
    try {
        await NotificationService.createNotification(req)
        res.json("Notification created")
    }
    catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const updateNotification = async (req, res) => {
    try {
        await NotificationService.updateNotificationStatus(req)
        res.json("Notification updated")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}



export const getAllNotifications = async (req, res) => {
    try {
        const Notifications = await NotificationService.getNotifications(req)
        res.json(Notifications)
    }
    catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}




