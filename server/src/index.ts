import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import projectRoutes from './router/projectRoutes';
import taskRoutes from './router/taskRoutes';
import searchRoutes from './router/searchRoutes';
import usersRoutes from './router/userRoutes';
import teamRoutes from './router/teamRoutes';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is home route!');
});

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/search', searchRoutes);
app.use('/users', usersRoutes);
app.use('/teams', teamRoutes);

const port = Number(process.env.PORT) || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port} 🚀🚀🚀🚀`);
});
