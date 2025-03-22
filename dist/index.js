import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import "dotenv/config";
import { Router } from "express";
import { listTasks } from './app/useCases/tasks/listTask';
export const router = Router();
const app = express();
app.use(cors());
const sequelize = new Sequelize(`${process.env.DB_URL}`, {
    dialect: "postgres",
    logging: false,
});
sequelize
    .authenticate()
    .then(() => console.log("Conectado ao banco de dados"))
    .catch((err) => console.error("Erro ao conectar ao banco:", err));
router.get("/tasks", listTasks);
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(router);
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
