import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Popover } from 'bootstrap';
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

  items: any[] = []; 
  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pageParam = params.get('page');
      this.currentPage = pageParam ? +pageParam : 1;
      this.loadItems();
    });
  }

  loadItems() {
    // Simulate loading data
    this.items = Array.from({ length: 30 }, (_, i) => ({
      title: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
      image: `/assets/images/voitures/Hyundai Grand I10 2024.jpg`
    }));

    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
    this.updatePageNumbers();
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedItems = this.items.slice(start, end);
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
}
