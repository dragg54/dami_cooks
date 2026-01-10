import { HostNotFoundError, literal, Op, Sequelize } from "sequelize"
import { orderStatus } from "../constants/OrderStatus.js"
import { BadRequestError } from "../exceptions/BadRequestError.js"
import { UnauthorizedError } from "../exceptions/UnauthorizedError.js"
import { Cart } from "../models/Cart.js"
import { Item } from "../models/Item.js"
import { Order } from "../models/Order.js"
import { OrderItem } from "../models/OrderItem.js"
import { Shipping } from "../models/Shipping.js"
import User from "../models/User.js"
import { getPagination, getPagingData } from "../utils/pagination.js"
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { refundPayment } from "./PaymentService.js"
import { sendMerchantOrderCancelledMail } from "../emails/sendMessages/SendMerchantOrderCancelledMail.js"
import dotenv from 'dotenv'
import { sendCustomerOrderCancelledMail } from "../emails/sendMessages/SendCustomerOrderCancelledMail.js"
import { generateCd } from "../utils/generateCd.js"
import { Payment } from "../models/Payment.js"
import { createDeliveryJob } from "./ShippingService.js"
import { InternalServerError } from "../exceptions/InternalServerError.js"
import { AdminSetting } from "../models/AdminSettings.js"

dotenv.config()

export const createOrder = async (req, trans) => {
    const user = req.user
    let userId = user.id
    if(user.isAdmin){
        const { customerName, customerPhone,  orderItems } = req.body
        let totalAmount = 0;
        for(let item of orderItems){
            const existingItem = await Item.findOne({where:{id: item.id}, raw: true, transaction: trans})
            if(!existingItem){
                throw new BadRequestError("Item does not exist")
            }
            totalAmount += (Number(existingItem.price) * Number(item.quantity))
        }
        const existingUser = await User.findOne({where: {phone: customerPhone}, raw: true})
        let newUserId = existingUser?.id
        if(!existingUser){
            const nameArr = customerName.split(" ")
           const newUser =  await User.create({
                firstName: nameArr[0],
                lastName: nameArr[1],
                phone: customerPhone,
                // password: "System_Admin"
            }, {transaction: trans, raw: true})
            userId = newUser.id
        }
        const newOrder = await Order.create({
            amount: totalAmount,
            orderCd: generateCd("ORD"),
            status: "CONFIRMED",
            userId: newUserId
        }, {transaction: trans, raw: true})

        await Payment.create({
            orderId: newOrder.id,
            gatewayPaymentId: generateCd("SYS"),
            amount: totalAmount,
            paymentType: 'TRANSFER',
            paymentGateway: "TRANSFER",
        }, {transaction: trans})

         await Shipping.create({
                        userId: userId,
                        orderId: newOrder.id,
                        address: "UNSPECIFIED",
                        city:  "UNSPECIFIED",
                        phone: customerPhone,
                        email: "UNSPECIFIED",
                        postalCode:  "UNSPECIFIED",
                        state:  "UNSPECIFIED"
                    }, { transaction: trans })
        
        const newOrderItems = orderItems.map((itm)=> ({
            quantity: itm.quantity,
            "orderId": newOrder.id,
            "itemId": itm.id
        }))
        await OrderItem.bulkCreate(newOrderItems, {transaction: trans})
        return
    }
    const { cartId } = req.body
    const existingCart = await Cart.findByPk(cartId)
    if (!existingCart) {
        const errMsg = `Failed to create order: Cart must exist before order creation`
        throw BadRequestError(errMsg)
    }
    await Order.create({ ...req.body, amount: req.body.amount/100, userId, orderCd: generateCd("ORD") })
}


export const getAllOrders = async (req) => {
    const { page, size, status,
        searchText, customerName, orderCd, city, address, toDate, fromDate, customerId } = req.query;
    const user = req.user;

    // if (!user.isAdmin) {
    //     throw new UnauthorizedError("Only admin is allowed to complete operation");
    // }

    const { limit, offset } = getPagination(page, size);

    const queryOpts = { where: {} };
    const shippingQueryOpts = { where: {} }
    const userQueryOpts = { where: {} }

    if (searchText) {
        queryOpts.where = {
            [Op.or]: [
                { status: { [Op.like]: `%${searchText}%` } }
            ]
        };
    }
    if (customerName) {
        userQueryOpts.where = {
            ...userQueryOpts.where,
            [Op.or]: [
                {
                    firstName: { [Op.like]: `%${customerName}%` }
                }
            ]
        }
    }

    if (customerId) {
        userQueryOpts.where = {
            ...userQueryOpts.where,
            [Op.or]: [
                {
                    id: customerId
                }
            ]
        }
    }

    if (city) {
        shippingQueryOpts.where = {
            ...shippingQueryOpts.where,
            city: { [Op.like]: `%${city}%` }
        }
    }
    if (address) {
        shippingQueryOpts.where = {
            ...shippingQueryOpts.where,
            address: { [Op.like]: `%${address}%` }
        }
    }

    // Apply status filter without overwriting `where`
    if (status) {
        queryOpts.where.status = status.toUpperCase();
    }

    if (orderCd) {
        queryOpts.where.orderCd = orderCd;
    }

    if (fromDate && !toDate) {
        queryOpts.where = {
            ...queryOpts.where,
            createdAt: { [Op.gte]: new Date(fromDate) }
        }
    }

    if (!fromDate && toDate) {
        queryOpts.where = {
            ...queryOpts.where,
            createdAt: { [Op.lte]: new Date(toDate) }
        }
    }

    if (fromDate && toDate) {
        queryOpts.where = {
            ...queryOpts.where,
            createdAt: {
                [Op.gte]: new Date(fromDate),
                [Op.lte]: new Date(toDate)
            }
        }
    }

    const data = await Order.findAndCountAll({
        include: [
            {
                model: User,
                ...userQueryOpts,
                attributes: ["firstName", "lastName"],
            },
            {
                model: OrderItem,
                attributes: ["quantity"],
                include: {
                    model: Item,
                    attributes: ["id", "name"]
                }
            },
            {
                model: Shipping,
                ...shippingQueryOpts,
                attributes: ["address", "city", "phone", "postalCode", "email"],
            }
        ],
        limit,
        offset,
        distinct: true,
        order: [["createdAt", "DESC"]],
        ...queryOpts
    });

    return getPagingData(data, page, limit);
};


export const getOrderById = async (req) => {
    const { id } = req.params
    const user = req.user
    // if (!req.user.isAdmin) {
    //     throw new UnauthorizedError('Only admin is allowed to complete operation')
    // }
    const order = await Order.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: OrderItem,
                attributes: ['quantity'],
                include: {
                    model: Item,
                    attributes: ['id', 'name', 'imageUrl', 'price']
                }
            },
            {
                model: Shipping,
                attributes: ['address', 'city', 'phone', 'postalCode', 'email']
            }
        ],
    });
    if (!order) {
        const errMsg = `Order with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return order
};

export const updateOrderStatus = async (req, transaction) => {
    const user = req.user
    // if (!req.user.isAdmin) {
    //     throw new UnauthorizedError('Only admin is allowed to complete operation')
    // }
    const { status } = req.body
    const { id } = req.params
    const existingOrder = await Order.findByPk(id, {raw: true})
    if (!existingOrder) {
        const errMsg = `Order ${id} not found`
        throw new BadRequestError(errMsg)
    }
    const isInvalidOrderStatus = (
        (existingOrder.status == orderStatus.DELIVERED
            || existingOrder.status == orderStatus.CANCELLED
            || existingOrder.status == orderStatus.CONFIRMED
            || existingOrder.status == orderStatus.CANCELLED
            || existingOrder.status == orderStatus.SHIPPED
        ) && (
            status == orderStatus.CONFIRMED
            || status == orderStatus.CANCELLED
            || status == orderStatus.PENDING)) || (existingOrder.status != orderStatus.CONFIRMED && status == orderStatus.SHIPPED)
    if (isInvalidOrderStatus) {
        const errMsg = `Order status is invalid for this operation`
        throw new BadRequestError(errMsg)
    }

    if (status == orderStatus.SHIPPED) {
         const adminUser = await User.findOne({ where: { isAdmin: true } })
            if (!adminUser) {
                throw BadRequestError("Admin user not found")
            }
            const adminSettings = await AdminSetting.findOne()
            if (!adminSettings) {
                throw BadRequestError("Admin settings not found")
            } 
        const initializedShipping = await Shipping.findOne({
            where:{orderId: id}, raw: true
        })
        if(!initializedShipping){
            throw new BadRequestError("Shipping has not been initialized for this order")
        }

        const customer = await User.findOne({
            where: {
                id: existingOrder.userId
            }
        })

        if(!customer){
            throw new BadRequestError("Customer not found for this order")
        }
        const createDeliveryJobRequest = {
            "job": {
                "pickups": [
                    {
                    address: "32 Coombe Ln, Raynes Park, London SW20 0LA",
                    // address: adminSettings.pickupAddress,
                    firstName: adminUser.firstName,
                    lastName: adminUser.lastName,
                    phone: adminUser.phone,
                    email: adminUser.phone,
                    company: process.env.COMPANY_NAME
                    }
                ],
                "dropoffs": [
                    {
                        "package_type": "small",
                        "package_description": "Food item",
                        "client_reference": "{{client_reference}}",
                        "address": "23 Ethelbert Rd, London SW20 8QD",
                        "comment": "Delivery of food item",
                        "contact": {
                            "firstname": customer.firstName,
                            "lastname": customer.lastName,
                            "phone":  initializedShipping.phone,
                            "phone": "+33712222222",
                            "email": initializedShipping.email,
                            "company":""
                        }
                    }
                ]
            }
        }
        try{
           await createDeliveryJob(createDeliveryJobRequest)
        }
        catch(err){
            console.log(err)
            throw new InternalServerError(err)
        }
    }
    if (status == orderStatus.CANCELLED) {
        const customer = await User.findOne({ where: { id: existingOrder.createdBy } })
        if (!customer) {
            throw new NotFoundError("Registered Customer does not exist")
        }
        const refundPaymentRequest = {
            orderId: id,
            orderCd: existingOrder.orderCd,
            customer: {
                name: customer.dataValues.firstName,
                email: customer.dataValues.email
            }
        }
        await refundPayment(refundPaymentRequest, customer.dataValues.firstName, transaction)
        await sendCustomerOrderCancelledMail(existingOrder.orderCd, customer.dataValues.firstName, customer.dataValues.email)
    }

    await Order.update({ status }, { where: { id } }, { transaction })

}

export const cancelOrder = async (req, transaction) => {
    const user = req.user
    const { status } = req.body
    const { id } = req.params
    const existingOrder = await Order.findByPk(id)
    if (status != orderStatus.CANCELLED && status != orderStatus.CANCELLED) {
        return
    }
    if (!existingOrder) {
        const errMsg = `Order ${id} not found`
        throw new BadRequestError(errMsg)
    }
    const isInvalidOrderStatus =
        existingOrder.status == orderStatus.DELIVERED
        || existingOrder.status == orderStatus.CANCELLED
        || existingOrder.status == orderStatus.CONFIRMED
        || existingOrder.status == orderStatus.CANCELLED
        || existingOrder.status == orderStatus.SHIPPED
    if (isInvalidOrderStatus) {
        const errMsg = `Order status is invalid for this operation`
        throw new BadRequestError(errMsg)
    }
    try {
        const customer = await User.findOne({ where: { id: existingOrder?.dataValues?.userId } })
        if (!customer) {
            throw new NotFoundError("Registered Customer does not exist")
        }
        const refundPaymentRequest = {
            orderId: id,
            customer: {
                name: customer.dataValues.firstName,
                email: customer.dataValues.email
             }
        }
        await refundPayment(refundPaymentRequest, transaction)
        await Order.update({ status }, { where: { id } }, { transaction })
        await sendMerchantOrderCancelledMail(existingOrder.dataValues.orderCd, customer.dataValues?.firstName, process.env.MERCHANT_GMAIL)
    }
    catch (ex) {
        console.log(ex)
        throw new Error(ex.message)
    }

}

export const getOrderAggregates = async(req) =>{
    const result = await Order.findAll({
        attributes: [
          'status', 
          [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
        ],
        group: ['status'],
        raw: true 
      });
      const successfulOrders = result.filter(order => order.status !== "CANCELLED");

      const totalSuccessfulOrders = successfulOrders.reduce((sum, order) => sum + parseInt(order.count), 0);
    
      const totalCancelled = result.find(order => order.status === "CANCELLED")?.count || 0;
    
      return {
        totalOrders: totalSuccessfulOrders,
        totalCancelled: parseInt(totalCancelled)
      };
}



  