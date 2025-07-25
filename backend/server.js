import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import ClerkWebhooks from './controllers/clerkWebhooks.js';

connectDB();
const app = express();

app.use(cors()); //enable cors origin resource sharing
//middleware
app.use(express.json());
app.use(clerkMiddleware());
//api to listen cleark webhooks
app.use('/api/clerk',ClerkWebhooks)
app.get('/', (req, res) => res.send("Api is working again"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 })