import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddCategoryComponent } from '../../modals/modal-add-category/modal-add-category.component';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-button-add-category',
  standalone: true,
  imports: [],
  templateUrl: './button-add-category.component.html',
  styleUrl: './button-add-category.component.css',
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

            // Show success message
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'The category has been successfully added.',
            }).then(() => {
              // Reload the page after the user clicks "OK"
              window.location.reload();
            });
          },
          error: (err) => {
            console.error('Error adding category: ', err);

            // Show error message
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'The category could not be added. Please try again later.',
            });
          },
        });
      }
    });
  }
}
