import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewService } from '../../../services/review.service';
import { ModalAddReviewComponent } from '../../modals/modal-add-review/modal-add-review.component';

@Component({
  selector: 'app-button-add-review',
  standalone: true,
  templateUrl: './button-add-review.component.html',
  styleUrl: './button-add-review.component.css',
})
export class ButtonAddReviewComponent {
  @Input() isbn!: string; // ISBN do livro para o qual a review será adicionada

  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService
  ) {}

  openAddReviewModal() {
    const dialogRef = this.dialog.open(ModalAddReviewComponent, {
      width: '30vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        this.reviewService.postReview(this.isbn, result).subscribe({
          next: () => {
            console.log('Review added successfully');
            window.location.reload(); // Recarrega a página para atualizar as reviews
          },
          error: (err) => {
            console.error('Error adding review: ', err);
          },
        });
      }
    });
  }
}
