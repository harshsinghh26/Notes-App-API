import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_URL,
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import Userrouter from './routes/user.routes.js';

app.use('/api/v1/users', Userrouter);

import Notesrouter from './routes/notes.routes.js';

app.use('/api/v1/notes', Notesrouter);

export default app;
