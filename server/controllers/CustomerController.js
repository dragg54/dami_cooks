import * as customerService from "../services/CustomerService.js"

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers(req)
        res.json(customers)
    }
    catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}