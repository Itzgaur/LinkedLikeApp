import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/auth.js';
import userRouter from './routes/userRoutes.js';
import postsRouter from './routes/postsRoutes.js';
import globalErroHandler from './controllers/errorController.js';

export const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postsRouter);
app.use(globalErroHandler);
