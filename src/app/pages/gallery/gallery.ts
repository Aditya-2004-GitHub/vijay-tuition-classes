import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements AfterViewInit {
  private revealObserver!: IntersectionObserver;
  private countObserver!: IntersectionObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

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

  activeTab: string = 'all';

  // Lightbox state
  lightboxOpen: boolean = false;
  lightboxTitle: string = '';
  lightboxCategory: string = '';

  // TAB CHANGE
  setTab(cat: string) {
    this.activeTab = cat;
  }

  // FILTER CHECK
  isVisible(cat: string): boolean {
    return this.activeTab === 'all' || this.activeTab === cat;
  }

  // OPEN LIGHTBOX
  openLightbox(item: HTMLElement, category: string) {
    const text = item.innerText || '';

    this.lightboxTitle = text.trim();
    this.lightboxCategory = 'Category: ' + category;
    this.lightboxOpen = true;
  }

  // CLOSE LIGHTBOX
  closeLightbox() {
    this.lightboxOpen = false;
  }
}
