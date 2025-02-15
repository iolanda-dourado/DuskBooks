import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from '../../modals/modal-add-category/modal-add-category.component';

@Component({
  selector: 'app-button-add-category',
  standalone: true,
  imports: [],
  templateUrl: './button-add-category.component.html',
  styleUrl: './button-add-category.component.css'
})
export class ButtonAddCategoryComponent {
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  openAddCategoryModal() {
    const dialogRef = this.dialog.open(ModalAddCategoryComponent, {
      width: '30vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.postCategory({ name: result }).subscribe({
          next: () => {
            console.log('Category added successfully');
            window.location.reload();
          },
          error: (err) => {
            console.error('Error adding category: ', err);
          },
        });
      }
    });
  }
}
