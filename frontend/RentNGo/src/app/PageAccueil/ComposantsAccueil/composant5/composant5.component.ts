import { Component, OnInit } from '@angular/core';
import { Temoignage } from 'src/app/models/Temoignage';
import { TemoignageService } from 'src/app/Services/Temoignage/temoignage.service';

@Component({
  selector: 'app-composant5',
  templateUrl: './composant5.component.html',
  styleUrls: ['./composant5.component.css']
})
export class Composant5Component implements OnInit {

  temoignages: Temoignage[] = [];
  selectedTemoignage: Temoignage | null = null;


  constructor(private temoignageService: TemoignageService) { }
  ngOnInit(): void {
    this.loadTemoignages();
  }
  loadTemoignages(): void {
    this.temoignageService.getAllTemoignages().subscribe({
      next: (response) => {
        // Get the last 4 témoignages from the response
        this.temoignages = response.slice(-4);
      },
      error: (err) => console.error('Erreur lors de la récupération des témoignages:', err)
    });
  }
}
