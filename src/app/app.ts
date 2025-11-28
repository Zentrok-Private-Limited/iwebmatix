import { Component, signal, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user/navbar';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from './user/footer';
import { VisitService } from './visit.service';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('moon-marketing');

  constructor(
    private visitService: VisitService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Safe browser check (Fix for SSR error)
    if (isPlatformBrowser(this.platformId)) {

      if (!sessionStorage.getItem('visitLogged')) {
        sessionStorage.setItem('visitLogged', 'true');
        this.visitService.logVisit().subscribe();
      }

    }
  }
}
