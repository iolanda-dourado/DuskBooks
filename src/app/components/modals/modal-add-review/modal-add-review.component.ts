import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-add-review',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './modal-add-review.component.html',
  styleUrl: './modal-add-review.component.css',
})
export class ModalAddReviewComponent {
  reviewForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ModalAddReviewComponent>) {
    this.reviewForm = new FormGroup({
      review: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  close(result: boolean = false) {
    this.dialogRef.close(result);
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.dialogRef.close(this.reviewForm.value.review);
    }
  }
}
