import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal-add-category',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
  ], // Adicione ReactiveFormsModule
  templateUrl: './modal-add-category.component.html',
  styleUrl: './modal-add-category.component.css',
})
export class ModalAddCategoryComponent {
  categoryForm: FormGroup; // Formulário reativo

  constructor(private dialogRef: MatDialogRef<ModalAddCategoryComponent>) {
    // Inicializa o formulário
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  // Método para fechar o modal
  close(result: boolean) {
    this.dialogRef.close(result);
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value.name); 
    }
  }
}
