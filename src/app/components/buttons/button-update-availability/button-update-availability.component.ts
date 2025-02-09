import { Component, Input } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalUpdateAvailabilityComponent } from '../../modals/modal-update-availability/modal-update-availability.component';

@Component({
  selector: 'app-button-update-availability',
  standalone: true,
  imports: [],
  templateUrl: './button-update-availability.component.html',
  styleUrl: './button-update-availability.component.css',
})
export class ButtonUpdateAvailabilityComponent {
  @Input() isbn!: string;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  updateAvailability() {
    if (!this.isbn) {
      console.error('ISBN is undefined');
      return;
    }

    const dialogRef = this.dialog.open(ModalUpdateAvailabilityComponent, {
      width: '30vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.patchBookDisponibility(this.isbn).subscribe({
          next: () => {
            console.log('Disponibilidade alterada com sucesso');
            window.location.reload();
          },
          error: (err) => console.error('Erro ao atualizar disponibilidade do livro: ', err),
        });
      }
    });
  }
}
