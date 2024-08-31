import { Component, OnInit } from '@angular/core';
import { Voiture } from 'src/app/models/Voiture';
import { VoitureService } from 'src/app/Services/Voiture/voiture.service';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-gestion-voiture',
  templateUrl: './gestion-voiture.component.html',
  styleUrls: ['./gestion-voiture.component.css']
})
export class GestionVoitureComponent implements OnInit {
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
  page: number = 1;
  itemsPerPage: number = 5;

  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.loadVoitures();
  }

  //  ********************************************************************** load **********************************************************************
  loadVoitures(): void {
    this.voitureService.getAllCars().subscribe(data => {
      this.voitures = data.map(voiture => ({
        ...voiture,
        photoVoiture: this.baseUrl + voiture.photoVoiture
      }));
    });
  }
  //  ********************************************************************** consulting **********************************************************************

  openConsultModal(voiture: Voiture): void {
    this.selectedVoiture = voiture;
    const consultModalElement = document.getElementById('consultingVoitureModal');
    if (consultModalElement) {
      const consultModal = new bootstrap.Modal(consultModalElement);
      consultModal.show();
    }
  }

  closeConsultModal(): void {
    const consultModalElement = document.getElementById('consultingVoitureModal');
    if (consultModalElement) {
      const consultModal = bootstrap.Modal.getInstance(consultModalElement);
      consultModal?.hide();
    }
  }
  //  ********************************************************************** delete **********************************************************************

  openDeleteModal(voiture: Voiture): void {
    this.selectedVoiture = voiture;
    const deleteModalElement = document.getElementById('deleteVoitureModal');
    if (deleteModalElement) {
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      deleteModal.show();
    }
  }

  closeDeleteModal(): void {
    const deleteModalElement = document.getElementById('deleteVoitureModal');
    if (deleteModalElement) {
      const deleteModal = bootstrap.Modal.getInstance(deleteModalElement);
      deleteModal?.hide();
    }
  }

  deleteVoiture(id?: number): void {
    if (id != null) {
      this.voitureService.deleteCar(id).subscribe({
        next: (response) => {
          console.log('Response from server:', response);
          this.loadVoitures();
          this.closeDeleteModal();
        }
      });
    } else {
      console.error('ID voiture est undefined');
    }
  }
  //  ********************************************************************** create **********************************************************************
  openCreateModal(): void {
    const addModalElement = document.getElementById('createModal');
    if (addModalElement) {
      const addModal = new bootstrap.Modal(addModalElement);
      addModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  closeCreateModal(): void {
    const addModalElement = document.getElementById('createModal');
    if (addModalElement) {
      const addModal = bootstrap.Modal.getInstance(addModalElement);
      addModal?.hide();
    }
  }

  createVoiture(form: NgForm): void {
    if (form.valid && this.selectedFile) {
      this.voitureService.addCar(this.newVoiture, this.selectedFile).subscribe(
        response => {
          console.log('Response:', response);
          this.loadVoitures();
          this.closeCreateModal();
        },
        error => {
          console.error('Error adding car:', error);
        }
      );
    } else {
      console.error('Formulaire invalide ou fichier non sélectionné');
    }
  }

  //  ********************************************************************** update **********************************************************************

  openUpdateModal(voiture: Voiture): void {
    this.selectedVoiture = { ...voiture };
    const updateModalElement = document.getElementById('updateVoitureModal');
    if (updateModalElement) {
      const updateModal = new bootstrap.Modal(updateModalElement);
      updateModal.show();
    }
  }

  closeUpdateModal(): void {
    const updateModalElement = document.getElementById('updateVoitureModal');
    if (updateModalElement) {
      const updateModal = bootstrap.Modal.getInstance(updateModalElement);
      updateModal?.hide();
    }
  }
  updateVoiture(form: NgForm): void {
    if (form.valid && this.selectedVoiture) {
      if (this.selectedFile) {
        this.voitureService.updateCar(this.selectedVoiture, this.selectedFile, this.selectedVoiture.id).subscribe((response) => {
          console.log('Response from server:', response);
          this.loadVoitures();
          this.closeUpdateModal();
        });
      }
    }
  }
  //  ********************************************************************** Pagination **********************************************************************

  get paginatedVoitures(): Voiture[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.voitures.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.voitures.length / this.itemsPerPage);
  }

  get isPreviousPageDisabled(): boolean {
    return this.page === 1;
  }

  get isNextPageDisabled(): boolean {
    return this.page === this.totalPages;
  }

  goToNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  goToPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  //  ********************************************************************** file **********************************************************************

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Ce fichier n\'est pas une image.');
        return;
      }
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          const byteArray = this.base64ToUint8Array(base64String);
          this.newVoiture.photoVoiture = byteArray;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  base64ToUint8Array(base64: string): Uint8Array {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    return new Uint8Array(byteNumbers);
  }

}
