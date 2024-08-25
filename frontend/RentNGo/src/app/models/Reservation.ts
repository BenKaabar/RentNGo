import { Client } from "./Client";
import { Voiture } from "./Voiture";

export interface Reservation {
    id : number;
    dateDebut : String;
    dateFin : String;
    localisation : String;
    message : String;
    status : String;
    client : Client;
    voiture : Voiture;
}
