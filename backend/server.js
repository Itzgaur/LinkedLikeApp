import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import { connectDB } from './utils/db.js';

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT}`);
});
