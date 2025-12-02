import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";

const appV1Router = Router();

// welcome route
appV1Router.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to API v1' });
});

appV1Router.use('/user', UserRouter);



export { appV1Router };