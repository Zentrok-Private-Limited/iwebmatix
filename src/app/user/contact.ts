import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  submitForm(contactForm: any) {
    if (!contactForm.valid || this.form.service === "") {
      alert("Please fill all fields correctly!");
      return; // stop submission
    }

    fetch("https://digital-backend-seven.vercel.app/api/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.form)
    })
      .then(res => res.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Message sent successfully!");
        contactForm.resetForm(); // reset form
      })
      .catch((err) => {
        console.error(err);
        alert("Message bhejne me problem aayi. Try karo fir se.");
      });
  }

}
