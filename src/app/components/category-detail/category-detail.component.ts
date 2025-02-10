import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent {
  @Input() category!: Category; // Recebe os dados da categoria
}
