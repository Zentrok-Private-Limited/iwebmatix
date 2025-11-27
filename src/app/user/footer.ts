import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VisitService } from '../visit.service'; 

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  email: string = '';
  message: string = '';

  constructor(private visitService: VisitService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.email) return;

    this.visitService.subscribeEmail(this.email).subscribe({
      next: (res) => {
        this.message = res.message || 'Subscribed successfully!';
        this.email = '';
      },
      error: (err) => {
        this.message = err.error?.message || 'Error subscribing';
      }
    });
  }
}
