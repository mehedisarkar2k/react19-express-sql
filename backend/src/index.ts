import express from 'express';
import { ENV } from './config';

const app = express();

const PORT = ENV.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});