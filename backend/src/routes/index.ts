import { Router } from "express";

const appV1Router = Router();

// welcome route
appV1Router.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to API v1' });
});

export { appV1Router };