import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import AppDataSource from './database/db';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log('err');

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

async function main() {
    await AppDataSource.initialize();
    app.listen(3333, () => {
        console.log('🚀 Server started on port 3333');
    });
}

main();
