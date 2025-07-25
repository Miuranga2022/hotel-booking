import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import ClerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRouters.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB();
connectCloudinary()
const app = express();

app.use(cors()); //enable cors origin resource sharing
//middleware
app.use(express.json());
app.use(clerkMiddleware());

//api to listen cleark webhooks
app.use('/api/clerk',ClerkWebhooks)
app.get('/', (req, res) => res.send("Api is working again"));
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 })