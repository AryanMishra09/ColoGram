import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.log(err);
    });

//for authRoutes:
app.use('/api/auth', authRoutes);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

// middleware to handle errors 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});