import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit{
    private observer!: IntersectionObserver;
    private counterObserver!: IntersectionObserver;
    constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {

    // Loader
    const hideLoader = () => {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
          this.renderer.addClass(loader, 'hide');
        }
      }, 1800);
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }
  }

  ngAfterViewInit(): void {

    // Reveal animation
    const elements = this.el.nativeElement.querySelectorAll('.reveal');

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'up');
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach((el: Element) => {
      this.observer.observe(el);
    });

    // ✅ COUNT UP LOGIC
    const countUp = (el: HTMLElement) => {
      const target = Number(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';

      let current = 0;
      const step = target / 60;

      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;

        if (current >= target) {
          clearInterval(interval);
        }
      }, 25);
    };

    const elements1 = this.el.nativeElement.querySelectorAll('[data-target]');

    this.counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target as HTMLElement);
          this.counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    elements1.forEach((el: Element) => {
      this.counterObserver.observe(el);
    });
  }
}
