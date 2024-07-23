import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-composant4',
  templateUrl: './composant4.component.html',
  styleUrls: ['./composant4.component.css']
})
export class Composant4Component implements OnInit {
  cards = [
    {
      title: 'Location de voiture avec chauffeur',
      image: '/assets/images/accueil/produit et service/LOCATION-VOITURE.jpg',
      describe: 'Location de voiture avec chauffeur a disponible disposition 150 TND/Jour',
    },
    {
      title: 'GPS',
      image: '/assets/images/accueil/produit et service/GPS.jpg',
      describe: 'Trouver facilement votre destination sans perte de temps 2TND/Jour',
    },
    {
      title: 'Siege bebe',
      image: '/assets/images/accueil/produit et service/SIEGE-BEBE.jpg',
      describe:' Donner plus de securité a vos enfants Gratuite',
    },
    {
      title: 'Location de voiture long durée',
      image: '/assets/images/accueil/produit et service/locationlonguedure.jpg',
      describe:'Location voiture longue durée . Assurances tous risques et entretien inclus.',
    },
    
  ];

  currentIndex = 0;
  cardWidth = 410; // Card width in pixels
  cardMargin = 10; // Sum of left and right margins
  transitionTimeout: any; // Variable to hold timeout ID

  ngOnInit(): void {
    this.startAutoPlay(); // Start autoplay when component initializes
  }

  ngOnDestroy(): void {
    clearTimeout(this.transitionTimeout); // Clear timeout on component destroy
  }

  get transformStyle() {
    const cardWidthWithMargin = this.cardWidth + this.cardMargin;
    return `translateX(-${this.currentIndex * cardWidthWithMargin}px)`;
  }

  prev() {
    if (this.currentIndex == 0) {
      this.currentIndex =
        (this.currentIndex - 0 + this.cards.length) % this.cards.length;
    } else {
      this.currentIndex =
        (this.currentIndex - 1 + this.cards.length) % this.cards.length;
      this.restartAutoPlay();
    }
  }

  next() {
    if (this.currentIndex < this.cards.length - 3) {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    } else {
      this.currentIndex = 0; // Reset to the first card if at the last card
    }
    this.restartAutoPlay();
  }

  startAutoPlay() {
    this.transitionTimeout = setTimeout(() => {
      this.next(); // Automatically transition to next card
    }, 3000); // Set delay between transitions (5000 milliseconds = 5 seconds)
  }

  restartAutoPlay() {
    clearTimeout(this.transitionTimeout); // Clear previous timeout
    this.startAutoPlay(); // Restart autoplay with updated currentIndex
  }
}