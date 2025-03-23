import * as paymentService from '../services/PaymentService.js'

export const initializePayment = async(req, res) =>{

    try{
       const clientSecret = await paymentService.initializePayment(req)
        res.json(clientSecret)
    }
    catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const paymentWebhook = async(req, res) =>{

    try{
         await paymentService.paymentWebhook(req)
    }
    catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getPayments = async(req, res) =>{
    try{
        const payments = await paymentService.getPayments(req)
        return res.json(payments)
    }
    catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}