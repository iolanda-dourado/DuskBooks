import { Component, Input } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

    // Abre o modal de confirmação
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30vw',
      disableClose: true,
    });

    // Após o modal ser fechado
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Se o usuário confirmou, remove o livro
        this.bookService.deleteBook(this.isbn).subscribe({
          next: () => {
            console.log('Livro removido com sucesso');

            // Exibe mensagem de sucesso
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'The book has been successfully removed.',
            });

            // Redireciona para a página de livros disponíveis
            this.router.navigate(['/books/available']);
          },
          error: (err) => {
            console.error('Erro ao remover livro: ', err);

            // Exibe mensagem de erro
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'The book could not be removed. Please try again later.',
            });
          },
        });
      }
    });
  }
}
