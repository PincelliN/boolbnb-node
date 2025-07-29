import { Router, Request, Response } from "express";
import Annuncio from "../models/Annuncio";

const router = Router();

//GET mostra tutti gli annunci

router.get("/", async (req: Request, res: Response) => {
  try {
    //migliora le performance con Handlebars
    const annunci = await Annuncio.find().lean();
    res.render("annunci/index", { title: "Annunci disponibili", annunci });
  } catch (err) {
    console.error("Errore nel recupero annunci: ", err),
      res.status(500).send("Errore interno del server");
  }
});

export default router;
