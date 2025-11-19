import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import morgan from 'morgan';

import { connect } from './database';
import { config } from './config';
import itemRoutes from './routers/item.router';

const port = config.port || 8080;
const origin = config.origin || 'http://localhost:8080';

const startServer = async () => {
    await connect();

    const app = express();

    app.set('trust-proxy', 1);

    app.use(cors({ origin: origin, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(morgan('dev'));

    app.use(itemRoutes);

    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
};

startServer();
