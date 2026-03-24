import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admission',
  imports: [CommonModule],
  templateUrl: './admission.html',
  styleUrl: './admission.css',
})
export class Admission implements AfterViewInit {
  private revealObserver!: IntersectionObserver;

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

  faqs = [
    {
      question: 'When does the 2025–26 batch start?',
      answer: 'New batches start from April 2025. We also have mid-year admissions in June and July for late joiners. Contact us for the latest batch start dates for your specific programme.'
    },
    {
      question: 'What are the fees? Are there any hidden charges?',
      answer: 'Fees range from ₹1,200 to ₹3,500 per month depending on the programme. There are absolutely no hidden charges. Study material, notes, and test papers are all included in the fees.'
    },
    {
      question: 'Can I attend a demo class before paying any fees?',
      answer: 'Yes, absolutely! We offer a completely free demo class for every programme. You can attend one full session and then decide whether you want to enrol. No payment required for the demo.'
    },
    {
      question: 'What is the maximum batch size?',
      answer: 'We maintain a strict maximum of 20 students per batch. This ensures every student gets individual attention and every doubt gets addressed in class itself.'
    },
    {
      question: 'Do you cover both CBSE and SSC board syllabi?',
      answer: 'Yes, we cover CBSE, SSC (Maharashtra State Board), and ICSE syllabi across all classes and subjects. Please mention your board when enquiring so we can assign you to the right batch.'
    },
    {
      question: 'Are both morning and evening batches available?',
      answer: 'Yes, we offer both morning (6:30 AM – 9:30 AM) and evening (4:30 PM – 8:00 PM) batches for all major programmes. Specific timings vary by subject — please call for the latest schedule.'
    },
    {
      question: 'What payment methods are accepted for fees?',
      answer: 'We accept cash, UPI (PhonePe, GPay, Paytm), and direct bank transfer. Monthly fee receipts are always provided. We do not accept advance fees for more than one month without prior discussion.'
    },
  ]

  // ✅ FAQ
  activeFaqIndex: number | null = null;

  toggleFaq(index: number) {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  // ✅ Toast
  toastMessage: string = '';
  showToastFlag: boolean = false;

  showToast(msg: string) {
    this.toastMessage = msg;
    this.showToastFlag = true;

    setTimeout(() => {
      this.showToastFlag = false;
    }, 3500);
  }

  // ✅ Form Submit
  submitForm(type: string) {
    if (type === 'demo') {
      this.showToast('✅ Demo class booked! We will call you shortly.');
    } else {
      this.showToast('✅ Enquiry sent! We will WhatsApp you soon.');
    }
  }
}
