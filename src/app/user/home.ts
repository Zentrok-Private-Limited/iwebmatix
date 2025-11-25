import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  showModal = false; 
  selectedProject: any = null;

  projects = [
    {
      title: 'E-commerce Growth Campaign',
      image: 'images/project1.jpg',
      description:
        'Increased website traffic by 250% and boosted online sales within 3 months through targeted Google Ads and SEO.',
      details:
        'This campaign helped an e-commerce brand grow their sales by leveraging search and display ads with a focus on high-ROI keywords and optimized landing pages.',
    },
    {
      title: 'Real Estate Lead Generation',
      image: 'images/project2.jpg',
      description:
        'Generated 500+ quality leads using Facebook Ads & landing page optimization.',
      details:
        'By designing visually appealing Facebook ad creatives and mobile-optimized landing pages, we significantly improved conversion rates and lead quality.',
    },
    {
      title: 'Social Media Branding for a Startup',
      image: 'images/project3.jpg',
      description:
        'Built a strong brand presence and grew Instagram followers from 0 to 10K organically.',
      details:
        'This project focused on consistent visual branding, content strategy, and influencer collaborations to establish credibility and engagement on social media.',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 1500,
        easing: 'ease-in-out',
        once: true,
      });
    }
  }

  // Contact Modal
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  closeIfOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.id === 'contactModal') {
      this.closeModal();
    }
  }

  // Project Lightbox
  openProject(project: any) {
    this.selectedProject = project;
  }

  closeProject() {
    this.selectedProject = null;
  }

  // Form Object
  form = {
    name: "",
    phone: "",
    email: "",
    service: "",
    city: "",
    message: ""
  };

  // Submit Form
  submitForm() {
    fetch("http://localhost:5000/api/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.form)
    })
      .then(res => res.json())
      .then((data) => {
        alert("Message sent successfully!");
        console.log(data);

        // Reset the form
        this.form = {
          name: "",
          phone: "",
          email: "",
          service: "",
          city: "",
          message: ""
        };

        // Close modal
        this.closeModal();
      })
      .catch(err => console.log(err));
  }
}
