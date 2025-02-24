import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { userRouter } from './routes/UserRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import { itemRoute } from './routes/ItemRoute.js'
import { subItemRoute } from './routes/SubItemRoute.js'
import { itemRouteCategoryRoute } from './routes/ItemCategoryRoute.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

const whitelist = ['http://localhost:5173', 'https://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5173', 'https://squad-63mu.onrender.com']

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
app.use("/api/v1/itemCategories", itemRouteCategoryRoute)

const port = 8080
app.listen((port) =>{
    console.log(`Listening to port ${port}`)
})