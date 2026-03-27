import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Courses } from './pages/courses/courses';
import { Testimonials } from './pages/testimonials/testimonials';
import { Gallery } from './pages/gallery/gallery';
import { Admission } from './pages/admission/admission';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: "", component: Home, title: "Home" },
  { path: "about", component: About, title: "About" },
  { path: "courses", component: Courses, title: "Courses" },
  // { path: "testimonials", component: Testimonials, title: "Testimonials" },
  { path: "gallery", component: Gallery, title: "Gallery" },
  { path: "admission", component: Admission, title: "Admissions" },
  { path: "contact", component: Contact, title: "Contact" },
  // { path: "", component: , title: "" },
];
