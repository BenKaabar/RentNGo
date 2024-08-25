import { Component, OnInit } from '@angular/core';
import { Voiture } from 'src/app/models/Voiture';
import { VoitureService } from 'src/app/Services/Voiture/voiture.service';

@Component({
  selector: 'app-composant3',
  templateUrl: './composant3.component.html',
  styleUrls: ['./composant3.component.css']
})
export class Composant3Component implements OnInit {
  voitures: any[] = []; // Change type according to your model
  baseUrl: string = 'data:image/jpeg;base64,'; // Change MIME type according to your image type

  selectedVoiture: Voiture | null = null;
  selectedFile: File | null = null;
  newVoiture: Voiture = {
    id: 0,
    immatriculation: '',
    marque: '',
    prix: 0,
    couleur: '',
    categorie: '',
    garantie: 0,
    nomPhotoVoiture: '',
    estDisponible: true,
    typePhotoVoiture: '',
    photoVoiture: new Uint8Array()
  };
  currentIndex = 0;
  cardWidth = 410; // Card width in pixels
  cardMargin = 10; // Sum of left and right margins
  transitionTimeout: any; // Variable to hold timeout ID

  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.startAutoPlay();
    this.loadVoitures(); // Start autoplay when component initializes
  }

  ngOnDestroy(): void {
    clearTimeout(this.transitionTimeout); // Clear timeout on component destroy
  }

  //  ********************************************************************** load **********************************************************************

  loadVoitures(): void {
    this.voitureService.getAllCars().subscribe(data => {
      // Get the last 5 items from the data array
      const lastFiveVoitures = data.slice(-5).map(voiture => ({
        ...voiture,
        photoVoiture: this.baseUrl + voiture.photoVoiture
      }));

      // Assign to the voitures property
      this.voitures = lastFiveVoitures;
    }, error => {
      console.error('Error loading voitures:', error);
    });
  }


  //  ********************************************************************** pagination **********************************************************************

  get transformStyle() {
    const cardWidthWithMargin = this.cardWidth + this.cardMargin;
    return `translateX(-${this.currentIndex * cardWidthWithMargin}px)`;
  }

  prev() {
    if (this.currentIndex == 0) {
      this.currentIndex =
        (this.currentIndex - 0 + this.voitures.length) % this.voitures.length;
    } else {
      this.currentIndex =
        (this.currentIndex - 1 + this.voitures.length) % this.voitures.length;
      this.restartAutoPlay();
    }
  }

  next() {
    if (this.currentIndex < this.voitures.length - 3) {
      this.currentIndex = (this.currentIndex + 1) % this.voitures.length;
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

  //  ********************************************************************** files **********************************************************************
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Log file data to verify
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}