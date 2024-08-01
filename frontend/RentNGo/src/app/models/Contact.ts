import { Client } from "./Client";

export interface Contact {
    id: number;
    email: string;
    message: string;
    client: Client;
  }