import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-composant3',
  templateUrl: './composant3.component.html',
  styleUrls: ['./composant3.component.css']
})
export class Composant3Component implements OnInit {
  cards = [
    {
      title: 'FOOTBALL1',
      image: '/assets/images/accueil/composant3/imageactivite/football.png',
    },
    {
      title: 'BASKETBALL2',
      image: '/assets/images/accueil/composant3/imageactivite/basketball.png',
    },
    {
      title: 'HANDBALL3',
      image: '/assets/images/accueil/composant3/imageactivite/handball.png',
    },
    {
      title: 'NATATION4',
      image: '/assets/images/accueil/composant3/imageactivite/natation.png',
    },
    {
      title: 'VOLLEYBALL5',
      image: '/assets/images/accueil/composant3/imageactivite/volleyball.png',
    },
    {
      title: 'VOLLEYBALL6',
      image: '/assets/images/accueil/composant3/imageactivite/volleyball.png',
    },
    {
      title: 'VOLLEYBALL7',
      image: '/assets/images/accueil/composant3/imageactivite/volleyball.png',
    },
    {
      title: 'VOLLEYBALl8',
      image: '/assets/images/accueil/composant3/imageactivite/volleyball.png',
    },
    {
      title: 'VOLLEYBALl9',
      image: '/assets/images/accueil/composant3/imageactivite/volleyball.png',
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
    }, 2000); // Set delay between transitions (5000 milliseconds = 5 seconds)
  }

  restartAutoPlay() {
    clearTimeout(this.transitionTimeout); // Clear previous timeout
    this.startAutoPlay(); // Restart autoplay with updated currentIndex
  }
}