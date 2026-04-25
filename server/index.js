import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { userRouter } from './routes/UserRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import cors from 'cors'
import { itemRoute } from './routes/ItemRoute.js'
import { subItemRoute } from './routes/SubItemRoute.js'
import { itemRouteCategoryRoute } from './routes/ItemCategoryRoute.js'
import { orderRoute } from './routes/OrderRoute.js'
import { cartRoute } from './routes/CartRoute.js'
import { cartItemRoute } from './routes/CartItemRoute.js'
import { paymentRoute } from './routes/PaymentRoute.js'
import http from 'http'
import { registerUser, removeUser } from './socket/registerUser.js'
import { sendBookingNotification, sendOrderNotification } from './socket/createNotification.js'
import { init } from './socket/socket.js'
import { notificationRoute } from './routes/NotificationRoute.js'
import { adminSettingRoute } from './routes/AdminSettingRoute.js'
import { allergenRoute } from './routes/AllergenRoute.js';
import morgan from 'morgan';
import { customerRouter } from './routes/CustomerRoute.js';
import  eventBookingRoute  from './routes/EventBookingRoute.js';
import { shippingRoute } from './routes/ShippingRoute.js';
import { sendEmail } from './services/EmailService.js';
import { startReceiptCron } from './jobs/SendReceiptJob.js';
import helmet from 'helmet'
import https from "https"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
app.use((req, res, next) => {
  if (req.originalUrl == "/api/v1/payments/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'));
app.use(helmet())
const whitelist = ['http://localhost:5173', 'https://localhost:5173', 'https://damicooks.com', 'https://dami-cooks-1.onrender.com', 'http://localhost:5000', 'http://127.0.0.1:5173']

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    } else if (whitelist.indexOf(origin) === -1) {
      return callback(new Error('not allowed by CORS'), false);
    }
    return callback(null, true);
  },
};

let server =  http.createServer(app, { cors: corsOptions });
if(process.env.NODE_ENV == "Production"){
  const options = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};
  server = https.createServer(options, app);
}
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use("/api/v1/users", userRouter)
app.use("/api/v1/items", itemRoute)
app.use("/api/v1/subItems", subItemRoute)
app.use("/api/v1/orders", orderRoute)
app.use("/api/v1/itemCategories", itemRouteCategoryRoute)
app.use("/api/v1/carts", cartRoute)
app.use("/api/v1/cartItems", cartItemRoute)
app.use("/api/v1/payments", paymentRoute)
app.use("/api/v1/notifications", notificationRoute)
app.use("/api/v1/adminSettings", adminSettingRoute)
app.use("/api/v1/allergens", allergenRoute)
app.use("/api/v1/customers", customerRouter)
app.use("/api/v1/eventBookings", eventBookingRoute)
app.use("/api/v1/shippings", shippingRoute)


app.post("/mail", async(req, res) =>{
 await sendEmail("ajibolasadiq@yahoo.com", "Testing Email", "Email Tested")
  res.json("Sent")
})

//Jobs
startReceiptCron()

const port = 8080
const io = init(server, corsOptions)

//Websocket
io.on('connection', (socket) => {
  let adminSocket = null;
  console.log("Connected")
  socket.on("admin-join", () => {
    console.log("✅ Admin joined:", socket.id);
    adminSocket = socket; // Save admin socket for notifications
  });
  
  socket.on('register', (userId) => {
    registerUser(userId, socket.id);
  });

  socket.on("order-placed", (userId)=>{
    sendOrderNotification()
  })

   socket.on("event-booked", (userId)=>{
    sendBookingNotification()
  })

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
    removeUser(socket.id)
  });
}
)

server.listen(process.env.PORT || port, () => {
  console.log(process.env.NODE_ENV)
  console.log(`Listening to port ${port}`)
})


process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});

