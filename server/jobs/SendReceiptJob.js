// cron/sendReceiptsCron.js
import cron from 'node-cron';
import { sendEmail } from '../services/EmailService.js';
import { Op } from 'sequelize';
import { generateReceiptPDF } from '../services/OrderService.js';
import { Order } from '../models/Order.js';
import User from '../models/User.js';
import { OrderItem } from '../models/OrderItem.js';
import { Item } from '../models/Item.js';
import dotenv from "dotenv"
import { Receipt } from '../models/OrderReceipt.js';

dotenv.config()

export const startReceiptCron = () => {
  const cronInterval = process.env.RECEIPT_CRON_INTERVAL || "0 * * * *"
  cron.schedule(cronInterval, async () => {
    console.log(`[${new Date().toISOString()}] Running receipt cron...`);

    try {
      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getMinutes() - 10);

      const ordersToSend = await Order.findAll({
        where: {
          status: 'SHIPPED',
          updatedAt: { [Op.lte]: twoHoursAgo },
        }, include: [{
            model: User,
            attributes: ["firstName", "lastName", "email"]
        },
        {
            model: OrderItem,
            include: [
              {
                model: Item,
                attributes: ["name", "price"]
              }
            ]
        },
        {
          model: Receipt
        }
    ]
      });

      for (const order of ordersToSend) {
        try {
          if(order.dataValues.receipt == null && order.dataValues.orderItems && order.dataValues.orderItems.length > 0){
              console.log("Found orders pending receipts")
              const pdfBuffer = await generateReceiptPDF(order.dataValues);
          const attachments = [{
                filename: `receipt-${order.dataValues.orderCd}.pdf`,
            content: Buffer.isBuffer(pdfBuffer)
              ? pdfBuffer
              : Buffer.from(pdfBuffer)
            }]
          await sendEmail(order.dataValues.user.email, "Order Receipt","<h1>Receipt</h1>", attachments);
          await Receipt.create({status: "sent", orderId: order.id})
          console.log(`Receipt sent to ${order.dataValues.user.email} for order ${order.id}`);
            }
        } catch (err) {
          await Receipt.create({ status: "failed", orderId: order.id })
          console.error(`Failed to send receipt for order ${order.id}:`, err.message);
        }
      }
    } catch (err) {
      console.error('Error running receipt cron:', err.message);
    }
  });
};
