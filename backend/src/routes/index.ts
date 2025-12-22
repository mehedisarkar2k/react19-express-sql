import { Router } from "express";
import { modules } from "../modules";

const appV1Router = Router();

// welcome route
appV1Router.get('/', (_, res) => {
    res.status(200).json({ success: true, message: 'Welcome to API v1' });
});

console.log("\n=====================================")
modules.forEach((module) => {
    console.log("Registering module in routes(v1): ", module.path);
    appV1Router.use(module.path, module.router);
});
console.log("=====================================\n")



export { appV1Router };