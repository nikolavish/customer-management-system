import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { apiRouter } from './routes/api.js';

// Reads .env file for environment variables
dotenv.config();

/**
 * Creating, configuring and starting a web server
 * Express, Body Parsers, CORS
 */
const startServer = () => {

    // Creating express aplication
    const expressApp = express();

    // Body parsers initialization
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));

    // CORS + Allowing only needed headers 
    expressApp.use(cors({ allowedHeaders: ['Authorization', 'Content-Type'] }));

    // Linking API endpoints to the application
    expressApp.use('/', apiRouter);

    // Create HTTP server with the express application
    const server = http.createServer(expressApp);


    // Exposing the server on the network
    const serverURL = process.env.SERVER_URL || '127.0.0.1';
    const serverPort = process.env.SERVER_PORT || 3000;
    server.listen(serverPort, serverURL, () => {
        console.log(`Server started listening on ${serverURL}:${serverPort}`);
    });
}

/**
 * Prepares for REST API launch (checking database conection,...)
 */
const selfInit = () => {
    const dbURL = process.env.DATABASE_URL;
    mongoose.connect(dbURL);
    const db = mongoose.connection;

    // Listens for possible failures before starting the application
    db.on('error', (error) => {
        console.log(error);
    });
    db.once('open', startServer);
}

selfInit();