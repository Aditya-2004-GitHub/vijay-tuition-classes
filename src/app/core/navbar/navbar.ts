import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {

    // Navbar scroll
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.vtc-nav');

      if (nav) {
        if (window.scrollY > 50) {
          this.renderer.addClass(nav, 'scrolled');
        } else {
          this.renderer.removeClass(nav, 'scrolled');
        }
      }
    });
  }

}
