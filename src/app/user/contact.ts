import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';   // ⭐ ADD THIS

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],  // ⭐ ADD THIS
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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

  form = {
    name: "",
    phone: "",
    email: "",
    service: "",
    city: "",
    message: ""
  };

  submitForm() {
    fetch("https://digital-backend-seven.vercel.app//api/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.form)
    })
    .then(res => res.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Message sent!");
    })
    .catch((err) => console.error(err));
  }

}
