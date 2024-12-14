import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';
import path from 'node:path';

const app = express();

const PORT = process.env.PORT || 3001;


//DONE: Serve static files of entire client dist folder
const staticDist = path.join(__dirname, 'dist'); 
app.use(express.static(staticDist)); //

//DONE: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the routes --?
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
