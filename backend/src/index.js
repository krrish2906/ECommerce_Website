// Module Imports:-
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Local Imports:-
import serverConfig from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';
import ApiRoutes from './routes/index.js'


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use('/api', ApiRoutes);


app.get('/', (req, res) => {
    res.send('E-Commerce App Backend Server')
});

app.listen(serverConfig.PORT, () => {
    console.log(`\nServer listening on http://localhost:${serverConfig.PORT}`);
    connectDB();
});