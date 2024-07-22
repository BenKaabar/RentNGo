import { Component } from '@angular/core';

@Component({
  selector: 'app-temoignages',
  templateUrl: './temoignages.component.html',
  styleUrls: ['./temoignages.component.css']
})
export class TemoignagesComponent {
  activeYear: number = 2024; // Default active year

  setActiveYear(year: number): void {
    this.activeYear = year;
  }
}
