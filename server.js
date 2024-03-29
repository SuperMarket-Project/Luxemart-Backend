import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(()=>{
  console.log('Connected to MongoDB');
}).catch((err)=>{
  console.log('Error:',err.message);
});


const PORT=process.env.PORT || 5000;
app.use(cookieParser());
app.listen(PORT,()=>{
    console.log('Server is running on port '+PORT+'...');
});

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

