import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-provide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provide.html',
  styleUrls: ['./provide.css']
})
export class ProvideComponent implements OnInit {

  index = 0;
  dots = [1, 2, 3];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {

    // AOS INITIALIZATION
    if (isPlatformBrowser(this.platformId)) {
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 1500,
        easing: 'ease-in-out',
        once: true,
      });
    }

    // AUTO SLIDE
    this.autoSlide();
  }

  // -------------------------
  // CAROUSEL FUNCTIONS
  // -------------------------
  autoSlide() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => this.nextSlide(), 4000);
    }
  }

  nextSlide() {
    this.index = (this.index + 1) % this.dots.length;
    this.updateSlide();
  }

  prevSlide() {
    this.index = (this.index - 1 + this.dots.length) % this.dots.length;
    this.updateSlide();
  }

  goToSlide(i: number) {
    this.index = i;
    this.updateSlide();
  }

  updateSlide() {
    if (isPlatformBrowser(this.platformId)) {
      const carousel = document.getElementById('carousel');
      if (carousel) {
        carousel.style.transform = `translateX(-${this.index * 100}%)`;
      }
    }
  }

  // -------------------------
  // SPEAKER ON/OFF FUNCTION
  // -------------------------
  toggleSound() {
    if (isPlatformBrowser(this.platformId)) {
      const video = document.getElementById("myVideo") as HTMLVideoElement;
      const btn = document.getElementById("soundBtn") as HTMLElement;

      if (video && btn) {
        video.muted = !video.muted;
        btn.innerHTML = video.muted ? "🔇" : "🔊";
      }
    }
  }

}
