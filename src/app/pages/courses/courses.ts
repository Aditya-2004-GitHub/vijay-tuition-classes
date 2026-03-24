import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements AfterViewInit {
  private revealObserver!: IntersectionObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  activeFilter: string = 'all';

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  isVisible(category: string): boolean {
    return this.activeFilter === 'all' || this.activeFilter === category;
  }

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
  }
}
