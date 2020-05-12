import { AddressInfo } from "net";
import app from "./presentation/index";
import dotenv from 'dotenv';
import { createLambdaHandler } from "lbn-lambda-express";

dotenv.config()

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

export const handler = createLambdaHandler(app);