export interface Voiture {
  id: number;
  immatriculation: string;
  marque: string;
  prix: number;
  couleur: string;
  categorie: string;
  garantie: number;
  estDisponible: boolean;
  nomPhotoVoiture: string;
  typePhotoVoiture: string;
  photoVoiture: Uint8Array; // Propriété pour les données binaires de l'image
}
