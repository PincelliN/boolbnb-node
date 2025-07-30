import { Router, Request, Response } from "express";
import Annuncio, { IAnnucio } from "../models/Annuncio";
import { error } from "console";

const router = Router();

//Form crea annuncio

router.get("/nuovo", (req: Request, res: Response) => {
  res.render("annunci/nuovo", { title: "Crea un nuovo annuncio" });
});

//salva nuovo annuncio
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      titolo,
      descrizione,
      prezzo,
      citta,
      indirizzo,
      ospiti,
      servizi,
      immagini,
    } = req.body;

    const nuovoAnnuncio = new Annuncio({
      titolo,
      descrizione,
      prezzo: parseFloat(prezzo),
      citta,
      indirizzo,
      ospiti: parseInt(ospiti),
      servizi:
        typeof servizi === "string"
          ? servizi.split(",").map((s: string) => s.trim())
          : [],
      immagini:
        typeof immagini === "string"
          ? immagini.split(",").map((i: string) => i.trim())
          : [],
    });

    await nuovoAnnuncio.save();
    res.redirect("/annunci");
  } catch (error: any) {
    console.error("Errore nel salvataggio annuncio: ", error.message);
    console.error("Dati ricevuti:", req.body);
    res.status(500).send("Errore durante la creazione dell'Annucio");
  }
});

//GET mostra tutti gli annunci

router.get("/", async (req: Request, res: Response) => {
  try {
    //migliora le performance con Handlebars
    const annunci = await Annuncio.find().lean();
    const annunciConAnteprima = annunci.map((a) => ({
      ...a,
      previewImage: a.immagini?.[0] || null,
    }));
    res.render("annunci/index", { title: "Annunci disponibili", annunci });
  } catch (err) {
    console.error("Errore nel recupero annunci: ", err),
      res.status(500).send("Errore interno del server");
  }
});

export default router;
