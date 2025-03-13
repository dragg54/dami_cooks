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