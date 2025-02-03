import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isScrolled = false;
  @ViewChild('heroSection') heroSection!: ElementRef;

  @HostListener('window:scroll')
  onWindowScroll() {
    const heroHeight = this.heroSection?.nativeElement.offsetHeight || 0;
    this.isScrolled = window.scrollY > heroHeight;
  }
}
