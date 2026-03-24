import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit {
  private revealObserver!: IntersectionObserver;
  private countObserver!: IntersectionObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {

    // ✅ REVEAL ANIMATION
    const revealElements = this.el.nativeElement.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    );

    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'up');
          this.revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el: Element) => {
      this.revealObserver.observe(el);
    });


    // ✅ COUNT UP ANIMATION
    const countElements = this.el.nativeElement.querySelectorAll('[data-target]');

    this.countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
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

        this.countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    countElements.forEach((el: Element) => {
      this.countObserver.observe(el);
    });
  }
}
