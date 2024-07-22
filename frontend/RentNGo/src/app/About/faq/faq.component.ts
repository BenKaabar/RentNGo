import { AfterViewInit, Component } from '@angular/core';
import { Popover } from 'bootstrap';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(popoverTriggerEl => new Popover(popoverTriggerEl, {
      trigger: 'focus',
      placement: 'top',
      title: 'Custom title',
      delay: { show: 500, hide: 100 }
    }));
  }
}
