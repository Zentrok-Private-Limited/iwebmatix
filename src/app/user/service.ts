import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './service.html',
  styleUrls: ['./service.css']
})
export class ServiceComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // Dynamically import AOS only in the browser
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 1500,
        easing: 'ease-in-out',
        once: true,
      });
    }
  }
  
}
