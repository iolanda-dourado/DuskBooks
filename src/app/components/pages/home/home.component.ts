import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../button/button.component";
import { Book } from '../../../interfaces/book';
import { NgFor, NgIf } from '@angular/common';
import { BookDetailComponent } from "../../book-detail/book-detail.component";
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonComponent, BookDetailComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: Book[] = []; // Lista de livros

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAvailableBooks().subscribe({
      next: (books) => {
        this.books = this.getRandomBooks(books, 3); // Seleciona 3 livros aleatórios
      },
      error: (err) => {
        console.error('Error obtaining the books list: ', err);
      },
    });
  }

  // Função para selecionar livros aleatórios
  getRandomBooks(books: Book[], count: number): Book[] {
    const shuffled = books.sort(() => 0.5 - Math.random()); // Embaralha a lista
    return shuffled.slice(0, count); // Retorna os primeiros "count" livros
  }
}
