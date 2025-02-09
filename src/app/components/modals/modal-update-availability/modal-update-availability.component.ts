import { Component, Input } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-update-availability',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './modal-update-availability.component.html',
  styleUrl: './modal-update-availability.component.css',
})
export class ModalUpdateAvailabilityComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalUpdateAvailabilityComponent>
  ) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
