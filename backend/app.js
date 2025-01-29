import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import profileRoutes from './routes/profile.routes.js';
import protectedRouter from './routes/protected.routes.js';

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));

app.use(express.json());
app.use(authRoutes)
app.use(postRoutes);
app.use(profileRoutes);
app.use(protectedRouter);

export default app;