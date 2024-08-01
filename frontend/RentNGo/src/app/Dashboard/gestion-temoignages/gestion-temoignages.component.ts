import { Component, OnInit } from '@angular/core';
import { Temoignage } from 'src/app/models/Temoignage';
import { TemoignageService } from 'src/app/Services/Temoignage/temoignage.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-gestion-temoignages',
  templateUrl: './gestion-temoignages.component.html',
  styleUrls: ['./gestion-temoignages.component.css']
})
export class GestionTemoignagesComponent implements OnInit {
  temoignages: Temoignage[] = [];
  selectedTemoignage: Temoignage | null = null;
  isDeleteModalOpen: boolean = false;
  isConsultModalOpen: boolean = false;

  constructor(private temoignageService: TemoignageService) { }

  ngOnInit(): void {
    this.loadTemoignages();
  }

  loadTemoignages(): void {
    this.temoignageService.getAllTemoignage().subscribe(response => {
      this.temoignages = response.map(item => ({
        id: item.id,
        messageTemoignage: item.messageTemoignage,
        dateTemoignage: item.dateTemoignage,
        client: item.client
      }));
    });
  }

  openConsultModal(temoignage: Temoignage): void {
    if (!this.isDeleteModalOpen) {
      this.selectedTemoignage = temoignage;
      this.isConsultModalOpen = true; // Ouvre le modal de consultation
    }
  }

  closeConsultModal(): void {
    this.isConsultModalOpen = false; // Ferme le modal de consultation
    this.selectedTemoignage = null;
  }

  openDeleteModal(temoignage: Temoignage): void {
    this.selectedTemoignage = temoignage;
    this.isDeleteModalOpen = true; // Ouvre le modal de suppression
    const deleteModalElement = document.getElementById('staticBackdropsupprimer');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false; // Ferme le modal de suppression
  }

  deleteTemoignage(id?: number): void {
    if (id !== undefined) {
      this.temoignageService.deleteTemoignage(id).subscribe({
        next: () => {
          this.loadTemoignages();
          this.closeDeleteModal();
        },
        error: (err) => {
          this.isDeleteModalOpen = false;
          console.error('Erreur lors de la suppression du témoignage:', err);
          // alert('Une erreur est survenue lors de la suppression du témoignage.');
          // Fermer le modal même en cas d'erreur
        }
      });
    } else {
      console.error('ID client est undefined');
    }
  }

}
