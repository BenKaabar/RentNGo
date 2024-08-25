import { Component, OnInit } from '@angular/core';
import { Temoignage } from '../models/Temoignage';
import { ClientService } from '../Services/Client/client.service';
import { TemoignageService } from '../Services/Temoignage/temoignage.service';

@Component({
  selector: 'app-temoignages',
  templateUrl: './temoignages.component.html',
  styleUrls: ['./temoignages.component.css']
})
export class TemoignagesComponent implements OnInit {

  clients: any[] = []; 
  temoignages: Temoignage[] = [];
  selectedTemoignage: Temoignage | null = null;

  activeYear: number = 2024; // Default active year

  constructor(
    private temoignageService: TemoignageService,
    private clientService: ClientService // Injecter le service ClientService
  ) { }

  ngOnInit(): void {
    this.loadTemoignages();
    this.loadClients(); // Charger les clients lors de l'initialisation
  }

  setActiveYear(year: number): void {
    this.activeYear = year;
  }

  // Charger les témoignages depuis le service
  loadTemoignages(): void {
    this.temoignageService.getAllTemoignages().subscribe({
      next: (response) => this.temoignages = response,
      error: (err) => console.error('Erreur lors de la récupération des témoignages:', err)
    });
  }

  // Charger les clients depuis le service
  loadClients(): void {
    this.clientService.getAllClient().subscribe({
      next: (response) => this.clients = response,
      error: (err) => console.error('Erreur lors de la récupération des clients:', err)
    });
  }

  // Filtrer les témoignages par année
  getTemoignagesForYear(): Temoignage[] {
    return this.temoignages.filter(temoignage => 
      new Date(temoignage.dateTemoignage).getFullYear() === this.activeYear
    );
  }
}
