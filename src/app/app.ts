import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './user/navbar';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './user/footer';
import { VisitService } from './visit.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule,FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('moon-marketing');

  
  constructor(private visitService: VisitService) {}

 ngOnInit() {
  if (!sessionStorage.getItem('visitLogged')) {
    sessionStorage.setItem('visitLogged', 'true');
    this.visitService.logVisit().subscribe();
  }
}


}

