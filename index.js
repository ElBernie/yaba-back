import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './src/routes/router.js';
import ErrorMiddleware from './src/middlewares/error.middleware.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(apiRouter);
app.use(ErrorMiddleware);

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
