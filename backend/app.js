import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/auth.js';
import userRouter from './routes/userRoutes.js';
import postsRouter from './routes/postsRoutes.js';
import connectionsRouter from './routes/connectionRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';
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

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/connections', connectionsRouter);

app.use('*', function (req, res, next) {
  res.send(`this is wrong path`);
});
app.use(globalErroHandler);
