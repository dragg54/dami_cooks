import * as shippingService from "../services/ShippingService.js"

export const getDeliveryQuote = async(req, res) =>{
     try {
            const shippingQuote = await shippingService.getDeliveryQuote(req.body)
            res.json(shippingQuote)
        }
        catch (error) {
            console.log(error.message)
            res.status(error.statusCode || 500).json(error.message
                || "Internal server error"
            );
        }
}

export const getAllShippings = async (req, res) => {
    try {
        const shippings = await shippingService.getShippings(req)
        res.json(shippings)
    }
    catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const processShippingWebhookEvents = async (req, res) => {
    try {
         await shippingService.processShippingWebhookEvents(req)
        res. json("Webhook processed")
    }
    catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}