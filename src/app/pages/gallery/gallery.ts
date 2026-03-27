import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule,RouterLink],
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
  lightboxSrc: string = '';

  galleryItems = [
    { cat: 'classroom', src: 'assets/classroom-1.jpeg', title: 'Classroom Sessions', featured: true },
    { cat: 'events', src: 'assets/event-1.jpeg', title: 'Annual Prize Distribution', featured: true },
    { cat: 'seminars', src: 'assets/seminar-1.jpeg', title: 'Career Guidance Seminar', featured: true },
    { cat: 'toppers', src: 'assets/topper-1.jpeg', title: 'Toppers Felicitation 2024', featured: true },
    { cat: 'doubt', src: 'assets/doubt-s-1.jpeg', title: 'Sunday Doubt Session', featured: true },
    { cat: 'classroom', src: 'assets/classroom-2.jpeg', title: 'Group Study Session', featured: true },
    { cat: 'events', src: 'assets/event-2.jpeg', title: 'Annual Day Function', featured: true },
    { cat: 'seminars', src: 'assets/seminar-2.jpeg', title: 'Motivational Talk Session', featured: true },
    { cat: 'classroom', src: 'assets/classroom-3.jpeg', title: 'Science Lab Practice', featured: true },
    { cat: 'toppers', src: 'assets/topper-2.jpeg', title: 'Board Result Celebration', featured: true },
    { cat: 'doubt', src: 'assets/doubt-s-2.jpeg', title: 'One-on-One Doubt Session', featured: true },
    { cat: 'events', src: 'assets/event-3.jpeg', title: 'Merit Award Ceremony', featured: true },
    { cat: 'classroom', src: 'assets/classroom-4.jpeg', title: 'Classroom Focus', featured: true },
    { cat: 'facilities', src: 'assets/area-clean-1.jpeg', title: 'Clean Campus', featured: true },
    { cat: 'toppers', src: 'assets/topper-3.jpeg', title: 'Topper Achievement', featured: true },

    // Non-featured items (only visible in their specific category tab)
    { cat: 'events', src: 'assets/event-4.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-5.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-6.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-7.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-8.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-9.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-10.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-11.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-12.jpeg', title: 'Student Event', featured: false },
    { cat: 'events', src: 'assets/event-13.jpeg', title: 'Student Event', featured: false },

    { cat: 'doubt', src: 'assets/doubt-s-3.jpeg', title: 'Doubt Clearing', featured: false },
    { cat: 'doubt', src: 'assets/doubt-s-4.jpeg', title: 'Doubt Clearing', featured: false },
    { cat: 'doubt', src: 'assets/doubt-s-5.jpeg', title: 'Doubt Clearing', featured: false },

    { cat: 'toppers', src: 'assets/topper-4.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-5.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-6.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-7.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-8.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-9.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-10.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-11.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-12.jpeg', title: 'Topper Achievement', featured: false },
    { cat: 'toppers', src: 'assets/topper-13.jpeg', title: 'Topper Achievement', featured: false },

    { cat: 'facilities', src: 'assets/area-clean-2.jpeg', title: 'Campus Facility', featured: false },
    { cat: 'facilities', src: 'assets/area-clean-3.jpeg', title: 'Campus Facility', featured: false },
    { cat: 'facilities', src: 'assets/area-clean-4.jpeg', title: 'Campus Facility', featured: false },
    { cat: 'facilities', src: 'assets/area-clean-5.jpeg', title: 'Campus Facility', featured: false },
    { cat: 'facilities', src: 'assets/area-clean-6.jpeg', title: 'Campus Facility', featured: false },
    { cat: 'facilities', src: 'assets/area-clean-7.jpeg', title: 'Campus Facility', featured: false },
    { cat: 'facilities', src: 'assets/area-clean-8.jpeg', title: 'Campus Facility', featured: false },
  ];

  // TAB CHANGE
  setTab(cat: string) {
    this.activeTab = cat;
  }

  // FILTER CHECK
  isVisible(item: any): boolean {
    if (this.activeTab === 'all') {
      return item.featured;
    }
    return this.activeTab === item.cat;
  }

  // OPEN LIGHTBOX
  openLightbox(title: string, category: string, src: string) {
    this.lightboxTitle = title;
    this.lightboxCategory = 'Category: ' + category;
    this.lightboxSrc = src;
    this.lightboxOpen = true;
  }

  // CLOSE LIGHTBOX
  closeLightbox() {
    this.lightboxOpen = false;
  }
}
