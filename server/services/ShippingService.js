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


dotenv.config()

const STUART_BASE_URL = process.env.NODE_ENV == "Development" ? process.env.STUART_TEST_BASE_URL : process.env.START_PRD_BASE_URL
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
                    address: "32 Coombe Ln, Raynes Park, London SW20 0LA",
                    // address: adminSettings.pickupAddress,
                    firstName: adminUser.firstName,
                    lastName: adminUser.lastName,
                    phone: adminUser.phone,
                    email: adminUser.phone,
                    company: process.env.COMPANY_NAME
                }],
                dropoffs: [{
                    address: "23 Ethelbert Rd, London SW20 8QD",
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
    console.log("I came here")
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

    console.log("Job delivery creation response", response)

    return response.data;
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
        attributes: ["id", "orderCd", "status", "amount"]
      }
    ],
    order: [[sortBy, order]],
    limit: Number(limit),
    offset,
    distinct: true
  });

 return getPagingData(data, page, limit);

}

export async function processShippingWebhook(request){
 if(process.env.NODE_ENV != "Development"){
   const isValid =  verifySignature(request)
   if(!isValid){
    console.log("Failed to validate request")
    throw UnauthorizedError("Invalid webhook secret")
   }
   const event = req.body;

    const shipping = await Shipping.findOne({
      where: { stuartJobId: event.id }, raw: true
    });

    // Always acknowledge webhook
    if (!shipping) return res.sendStatus(200);

    switch (event.status) {
      case "job.created":
        shipping.status = "PENDING";
        break;

      case "job.pickup.en_route":
        shipping.status = "PICKUP_STARTED";
        break;

      case "job.pickup.completed":
        shipping.status = "PICKED_UP";
        shipping.pickedUpAt = new Date();
        break;

      case "job.delivery.completed":
        shipping.status = "DELIVERED";
        shipping.deliveredAt = new Date();

        await Order.update(
          { status: "DELIVERED" },
          { where: { id: shipping.orderId } }
        );
        break;

      case "job.failed":
        shipping.status = "FAILED";
        break;

      case "job.cancelled":
        shipping.status = "CANCELLED";
        break;
    }

    if (event.eta) shipping.etaMinutes = event.eta;
    if (event.price) shipping.deliveryFee = event.price;

    await shipping.save();
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
