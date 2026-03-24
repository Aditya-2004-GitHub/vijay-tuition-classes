import { AfterViewInit, Component, ElementRef, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./core/footer/footer";
import { Navbar } from "./core/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  private observer!: IntersectionObserver;

  protected readonly title = signal('Vijay-Tuition-Classes');

  constructor(private renderer: Renderer2, private el: ElementRef) {}

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
  }
}
