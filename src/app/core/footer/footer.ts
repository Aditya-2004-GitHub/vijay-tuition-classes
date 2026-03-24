import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {

    // Scroll top button
    window.addEventListener('scroll', () => {
      const stb = document.getElementById('scrollTop');

      if (stb) {
        if (window.scrollY > 400) {
          this.renderer.addClass(stb, 'show');
        } else {
          this.renderer.removeClass(stb, 'show');
        }
      }
    });
  }

  // Scroll to top function (bind this in HTML)
  scrollToSection(event: Event, id: string) {
    event.preventDefault();

    const el = document.getElementById(id);
    if (el) {
      const navHeight = 70;

      window.scrollTo({
        top: el.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
