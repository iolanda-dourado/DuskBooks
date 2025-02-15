import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private endpoint: string = 'https://shelfoftales.onrender.com/api/book/';

  constructor(private http: HttpClient) {}

  // 1 - Cria um novo livro
  //  Restrito a MANAGER
  postBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.endpoint, newBook);
  }

  // 2 - Obtém todos os livros existentes
  // -> Restrito a CLIENT
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}`);
  }

  // 3 - Obtém todos os livros disponíveis
  // -> SEM RESTRIÇÃO
  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}${'available'}`);
  }

  // 4 - Obtém todos os livros indisponíveis
  // -> RESTRITO A MANAGER
  getUnavailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}${'unavailable'}`);
  }

  // 5 - Otém um livro pelo ISBN
  // -> SEM RESTRIÇÃO
  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.endpoint}${isbn}`);
  }

  // 6 - Atualiza informação do livro pelo ISBN 
  // -> Restrito a MANAGER
  putBook(isbn: string, updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(
      `${this.endpoint}${isbn}`,
      updatedBook
    );
  }

  // 7 - Atualiza a disponibilidade do livro pelo ISBN
  // -> Restrito a MANAGER
  patchBookDisponibility(isbn: string): Observable<Book> {
    return this.http.patch<Book>(`${this.endpoint}${isbn}/availability`, null, {
      observe: 'body', // Faz com que a resposta seja tratada como o corpo (não como ArrayBuffer)
    });
  }

  // 8 - Remove o livro pelo ISBN
  // -> Restrito a MANAGER
  deleteBook(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}${isbn}`);
  }

  getBooksByCategory(categoryName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}?category=${categoryName}`);
  }
}
