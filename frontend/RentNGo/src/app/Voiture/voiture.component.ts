import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Popover } from 'bootstrap';
import { VoitureService } from '../Services/Voiture/voiture.service';
import { Voiture } from '../models/Voiture';
@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements AfterViewInit, OnInit {

  ngAfterViewInit(): void {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(popoverTriggerEl => new Popover(popoverTriggerEl, {
      trigger: 'hover',
      customClass: 'custom-popover',
      delay: { show: 500, hide: 100 }
    }));
  }
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
  fileToUpload: File | null = null;
  items: any[] = [];
  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(private route: ActivatedRoute, private voitureService: VoitureService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pageParam = params.get('page');
      this.currentPage = pageParam ? +pageParam : 1;
      this.loadItems();
    });
    this.loadVoitures();
  }

  loadVoitures(): void {
    this.voitureService.getAllCars().subscribe(data => {
      this.voitures = data.map(voiture => ({
        ...voiture,
        photoVoiture: this.baseUrl + voiture.photoVoiture
      }));
      this.loadItems();
    });
  }

  loadItems() {
    this.totalPages = Math.ceil(this.voitures.length / this.itemsPerPage);
    this.updatePageNumbers();
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedItems = this.voitures.slice(start, end);
  }

  updatePageNumbers() {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
      this.router.navigate(['Voiture/', this.currentPage]);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
      this.router.navigate(['Voiture/', this.currentPage]);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePage();
    this.router.navigate(['Voiture/', this.currentPage]);
  }

  goToEtape2(carId: number) {
    this.router.navigate(['/Reservation/etape2'], { state: { carId } });
  }


}