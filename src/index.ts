import express  from "express";
import cors  from "cors";
import { Sequelize }  from "sequelize";
import "dotenv/config";
import { router } from './router';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(`${process.env.DB_URL}`, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));



app.use(router);



app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
