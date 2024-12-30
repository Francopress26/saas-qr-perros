import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import petRoutes from './routes/pet-routes.js';
import userRoutes from './routes/user-routes.js';
import mercadopagoRoutes from './routes/memberrship-routes.js';
import adminRoutes from './routes/admin-routes.js';
import { configDotenv } from "dotenv";
const app = express();
const port = 3001;

app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // Algunos navegadores requieren 204
};
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`La API está funcionando en http://localhost:${port}/tasks`);
});

// Rutas
app.use("/api", petRoutes);
app.use("/api", userRoutes);
app.use("/api", mercadopagoRoutes);
app.use("/api", adminRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
