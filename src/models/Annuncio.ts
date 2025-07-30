import mongoose, { Document, Schema } from "mongoose";

//IAnnuncio: interfaccia TypeScript per il tipo del documento
export interface IAnnucio extends Document {
  titolo: string;
  descrizione: string;
  prezzo: number;
  citta: string;
  indirizzo: string;
  ospiti: number;
  servizi: string[];
  immagini: string[];
  disponibile: boolean;
}

//AnnuncioSchema: struttura dei dati su MongoDB
const AnnuncioSchema: Schema = new Schema(
  {
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    prezzo: { type: Number, required: true },
    citta: { type: String, required: true },
    indirizzo: { type: String, required: true },
    ospiti: { type: Number, required: true },
    servizi: [{ type: String }],
    immagini: [{ type: String }],
    disponibile: { type: Boolean, default: true },
  },
  { timestamps: true }
);

//mongoose.model(...): crea il modello esportabile e riutilizzabile
export default mongoose.model<IAnnucio>("Annuncio", AnnuncioSchema);
