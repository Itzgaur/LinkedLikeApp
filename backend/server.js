import dotenv from "dotenv";

import { app } from "./app.js";

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});