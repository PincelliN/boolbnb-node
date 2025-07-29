import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Annuncio from "./models/Annuncio";
import annunciRouter from "./routes/annunci";
console.log(" Modello Annuncio caricato:", Annuncio.modelName);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// view Engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "..", "views"));

//Rotte
app.get("/", (req, res) => {
  res.render("home", { title: "Benvenuto su BoolBnB con TypeScript!" });
});
app.use("/annunci", annunciRouter);
//MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connessione a MongoDB riuscita"))
  .catch((err) => console.error("Errore MongoDB: ", err));

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
