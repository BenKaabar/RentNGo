import { Component } from '@angular/core';

@Component({
  selector: 'app-composant5',
  templateUrl: './composant5.component.html',
  styleUrls: ['./composant5.component.css']
})
export class Composant5Component {
  reviews = [
    {
      client: 'sghaier (18/07/2024)',
      cmnt: 'Honnêtement, j apprécie la livraison de la voiture à l endroit exact, cela m a rendu la tâche très facile',
    },
    {
      client: 'Sipma (11/07/2024)',
      cmnt: 'Parfait, rien à dire au top! Merci beaucoup je ferai de nouveau appel à cette compagnie pour sûr.',
    },
    {
      client: 'Salhi (09/06/2024)',
      cmnt: 'Bonjour, J ai beaucoup apprécié le service qui était courtoi et ponctuel. Le seul point c était que ma rése',
    },
    {
      client: 'Khalfaoui (06/02/2024)',
      cmnt: 'C est la deuxième que nous louons une voiture avec mamicar. Un excellent service ponctuel, voitures propres et neuves. A l écout',
    },
  ];
}
