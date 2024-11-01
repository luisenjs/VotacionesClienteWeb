import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  isScrolled = false;
  currentSlide: number = 0;

  testimonials = [
    {
      icon: 'fa fa-rocket',
      title: 'Datos precisos y actualizados',
      text: 'Información electoral gestionado en tiempo real con alta exactitud.',
    },
    {
      icon: 'fa fa-chart-line',
      title: 'Mayor transparencia',
      text: 'Informes claros y accesibles que fortalecen la confianza en el proceso.',
    },
    {
      icon: 'fa fa-thumbs-up',
      title: 'Mejora en coordinación',
      text: 'Comunicación eficiente en equipos de campaña y personal.',
    },
    {
      icon: 'fa fa-user-friends',
      title: 'Reducción de errores',
      text: 'Disminución de errores y retrasos gracias a la automatización.',
    },
    {
      icon: 'fa fa-cogs',
      title: 'Decisiones basadas en datos',
      text: 'Análisis detallado que apoya decisiones informales durante las elecciones.',
    },
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

}
