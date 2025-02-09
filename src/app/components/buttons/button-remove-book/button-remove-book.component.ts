import { Component, Input } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-remove-book',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './button-remove-book.component.html',
  styleUrl: './button-remove-book.component.css',
})
export class ButtonRemoveBookComponent {
  @Input() isbn!: string;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  removeBook() {
    if (!this.isbn) {
      console.error('ISBN is undefined');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.deleteBook(this.isbn).subscribe({
          next: () => {
            console.log('Livro removido com sucesso');
            this.router.navigate(['/books/available']);
          },
          error: (err) => console.error('Erro ao remover livro: ', err),
        });
      }
    });
  }
}
