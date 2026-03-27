import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {
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
  }

  submitContact(name: string, mobile: string, email: string, subject: string, studentClass: string, prefTime: string, message: string) {
    const msg = `*New Contact Enquiry*\n\n*Name:* ${name}\n*Mobile:* ${mobile}\n*Email:* ${email}\n*Subject:* ${subject}\n*Class:* ${studentClass}\n*Preferred Time:* ${prefTime}\n*Message:* ${message}`;
    const url = `https://wa.me/919371013687?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
}
