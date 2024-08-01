import { Client } from "./Client";

export interface Temoignage {
    id: number;               // Correspond au 'id' dans la réponse
    messageTemoignage: string;
    dateTemoignage: string;
    client: Client;
  }
  