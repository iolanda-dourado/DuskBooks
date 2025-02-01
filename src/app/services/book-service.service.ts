import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Observable } from 'rxjs';
import { BookSummary } from '../interfaces/book-summary';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  private endpoint: string = 'https://shelfoftales.onrender.com/api/book/';

  constructor(private http: HttpClient) {}

  // 1 - Cria um novo livro
  //  Restrito a MANAGER
  postBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.endpoint, newBook);
  }

  // 2 - Obtém todos os livros existentes
  // -> Restrito a CLIENT
  getBooks(): Observable<BookSummary[]> {
    return this.http.get<BookSummary[]>(`${this.endpoint}s`);
  }

  // 3 - Obtém todos os livros disponíveis
  // -> SEM RESTRIÇÃO
  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}${'available'}`);
  }

  // 4 - Obtém todos os livros indisponíveis
  // -> RESTRITO A MANAGER
  getUnavailableBooks(): Observable<BookSummary[]> {
    return this.http.get<BookSummary[]>(`${this.endpoint}${'unavailable'}`);
  }

  // 5 - Otém um livro pelo ISBN 
  // -> SEM RESTRIÇÃO
  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.endpoint}${isbn}`);
  }

  // 6 - Atualiza informação do livro pelo ISBN -> Restrito a MANAGER
  putBook(updatedBook: Book, isbn: string): Observable<Book> {
    return this.http.put<Book>(
      `${this.endpoint}${updatedBook.isbn}${isbn}`,
      updatedBook
    );
  }

  // 7 - Atualiza a disponibilidade do livro pelo ISBN 
  // -> Restrito a MANAGER
  putBookDisponibility(updatedBook: Book, isbn: string): Observable<Book> {
    return this.http.put<Book>(
      `${this.endpoint}${updatedBook.isbn}${isbn}/availability`,
      updatedBook
    );
  }

  // 8 - Remove o livro pelo ISBN 
  // -> Restrito a MANAGER
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}${id}`);
  }
}
