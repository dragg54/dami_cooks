import axios from "axios";
import dotenv from 'dotenv'
import User from "../models/User.js";
import { BadRequestError } from "../exceptions/BadRequestError.js";
import { AdminSetting } from "../models/AdminSettings.js";
import { addHours } from "date-fns";
import { UnauthorizedError } from "../exceptions/UnauthorizedError.js";
import { Order } from "../models/Order.js";
import { Shipping } from "../models/Shipping.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import { sendMerchantOrdeDeliveryJobAccepted } from "../emails/sendMessages/SendMerchantOrderDeliveryJobAccepted.js";
import { sendCustomerOrderPickedUp } from "../emails/sendMessages/SendCustomerOrderPickedUp.js";
import { sendMerchantOrderDelivered } from "../emails/sendMessages/SendMerchantOrderDelivered.js";
import { sendMerchantCourierWaitingEmail } from "../emails/sendMessages/SendMerchantCourierWaitingEmail.js";
import { sendCustomerCourierWaitingAtDropOff } from "../emails/sendMessages/sendCustomerCourierWaitingAtDropOff.js";


dotenv.config()

const STUART_BASE_URL = process.env.NODE_ENV == "Development" ? process.env.STUART_TEST_BASE_URL : process.env.STUART_PRD_BASE_URL
const STUART_CLIENT_ID = process.env.NODE_ENV == "Development" ? process.env.STUART_TEST_CLIENT_ID : process.env.STUART_PRD_CLIENT_ID
const STUART_CLIENT_SECRET = process.env.NODE_ENV == "Development" ? process.env.STUART_TEST_CLIENT_SECRET : process.env.STUART_PRD_CLIENT_SECRET


let cachedToken = null;
let tokenExpiry = null;

export async function getStuartToken() {
    if (cachedToken && tokenExpiry > Date.now()) {
        return cachedToken;
    }

    const response = await axios.post(
        `${STUART_BASE_URL}/oauth/token`,
        {
            grant_type: "client_credentials",
            client_id: STUART_CLIENT_ID,
            client_secret: STUART_CLIENT_SECRET,
        }
    );

    cachedToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);

    return cachedToken;
}

export async function getDeliveryQuote({
    address,
    packageSize = "small"
}) {
    const token = await getStuartToken();
    const adminUser = await User.findOne({ where: { isAdmin: true } })
    if (!adminUser) {
        throw BadRequestError("Admin user not found")
    }
    const adminSettings = await AdminSetting.findOne()
    if (!adminSettings) {
        throw BadRequestError("Admin settings not found")
    }
    const response = await axios.post(
        `${STUART_BASE_URL}/v2/jobs/pricing`,
        {
            job: {
                "pickup_at": addHours(new Date(), adminSettings.maximumPreparationTimeInHours),
                pickups: [{
                    address: adminSettings.pickupAddress,
                    firstName: adminUser.firstName,
                    lastName: adminUser.lastName,
                    phone: adminUser.phone,
                    email: adminUser.phone,
                    company: process.env.COMPANY_NAME
                }],
                dropoffs: [{
                    address,
                    package_type: packageSize
                }],

            }
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

export async function createDeliveryJob(request) {
    try{
      const token = await getStuartToken();

    const response = await axios.post(
        `${STUART_BASE_URL}/v2/jobs`,
         request,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
    }
    catch(exception){
      console.log(exception)
      throw exception;
    }
}


export async function getShippings(req){
    const {
    status,
    orderId,
    fromDate,
    toDate,
    page = 1,
    size = 10,
    sortBy = "createdAt",
    order = "DESC"
  } = req.query;

  const { limit, offset } = getPagination(page, size);
  const where = {};

  // 🔎 Filters
  if (status) {
    where.status = status;
  }

  if (orderId) {
    where.orderId = orderId;
  }

  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) where.createdAt[Op.gte] = new Date(fromDate);
    if (toDate) where.createdAt[Op.lte] = new Date(toDate);
  }

  const data = await Shipping.findAndCountAll({
    where,
    include: [
      {
        model: Order,
        attributes: ["id", "orderCd", "status", "amount"
        ],
        include:[{
          model: User,
          attributes: ["firstName", "lastName"]
        }]
      }
    ],
    order: [[sortBy, order]],
    limit: Number(limit),
    offset,
    distinct: true
  });

 return getPagingData(data, page, limit);

}

export const processShippingWebhookEvents = async(req) =>{
    const event = req.body
      const jobId = event.data.id;
      const shippingData = await Shipping.findOne({
        include:[{
            model: Order,
            attributes: ["id", "orderCd"],
            where:{orderCd: event.data.jobReference || event.data.clientReference},
            include: [{
                model: User,
                attributes: ["firstName", "email"]
            }]
        }]})
      if(!shippingData){
        throw new BadRequestError(`Shipping with job id ${jobId} not found`)
      }
    switch (event.data.status) {            
        case 'picking':
            if (shippingData.dataValues.status == "ACCEPTED") {
                return
            }
            await Shipping.update({
                etaMinutes: event.data.etaToDestination,
                status: "ACCEPTED",
                stuartTrackingUrl: event.data.trackingUrl
            }, { where: { id: shippingData.id } })
            await sendMerchantOrdeDeliveryJobAccepted(shippingData.dataValues.order.orderCd, jobId, shippingData.dataValues.order.user.firstName + " " +
                shippingData.dataValues.order.user.lastName,  process.env.MERCHANT_GMAIL)
            break;

        case 'waiting_at_pickup':
             if (shippingData.dataValues.status == "PICK_UP_STARTED") {
                return
            }
            await Shipping.update({
                status: "PICK_UP_STARTED",
            }, { where: { id: shippingData.id } })
            await sendMerchantCourierWaitingEmail(shippingData.dataValues.order.orderCd, process.env.MERCHANT_GMAIL)
            break;

        case 'delivering':
        // case 'almost_picking':
            if (shippingData.dataValues.status == "DROP_OFF_STARTED") {
                return
            }
            await sendCustomerOrderPickedUp(shippingData.dataValues.order.user.firstName + " " +
                shippingData.dataValues.order.user.lastName, shippingData.dataValues.order.orderCd, shippingData.dataValues.email, jobId);
                 await Shipping.update({
              status: "DROP_OFF_STARTED",
            }, {where:{id: shippingData.id}})
            break;
        
        case 'waiting_at_dropoff':
            if (shippingData.dataValues.status == "COURIER_WAITING_AT_DROPOFF") {
                return
            }
            await sendCustomerCourierWaitingAtDropOff(shippingData.dataValues.order.orderCd, shippingData.dataValues.email, shippingData.dataValues.order.user.firstName + " " +
                shippingData.dataValues.order.user.lastName);
            await Shipping.update({
                status: "COURIER_WAITING_AT_DROPOFF",
            }, { where: { id: shippingData.id } })
            break;

        case 'finished':
        case 'delivered':
            if (shippingData.dataValues.status == "DELIVERED") {
                return
            }
            await sendMerchantOrderDelivered(shippingData.dataValues.order.id, shippingData.dataValues.order.user.firstName + " " +
                shippingData.dataValues.order.user.lastName, process.env.MERCHANT_GMAIL, jobId);
            await Shipping.update({
                status: "DELIVERED",
            }, { where: { id: shippingData.id } })

            await Order.update({
                status: "DELIVERED"
            }, { where: { id: shippingData.dataValues.order.id } })
            break;

        case 'failed':
            await onFailed(event);
            break;

        default:
            console.log('Unhandled event:', event.data.status);
    }
}

function verifySignature(req) {
  const signature = req.headers["x-stuart-signature"];
  if (!signature) return true;

  const secret = process.env.STUART_WEBHOOK_SECRET;
  const payload = JSON.stringify(req.body);

  const hash = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return signature === hash;
}
