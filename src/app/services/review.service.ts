import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../interfaces/review';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private endpoint: string = 'https://shelfoftales.onrender.com/api/review/';

  constructor(private http: HttpClient) {}

  // 1 - Cria uma nova review
  // -> Restrito a manager
  postReview(isbn: string, review: string): Observable<Review> {
    return this.http.post<Review>(this.endpoint, { isbn, review }).pipe(
      catchError((error) => {
        console.error('Error creating review:', error);
        throw error;
      })
    );
  }

  // 2 - Obtém todas as reviews existentes
  // -> Sem restrição
  getReviews(isbn: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.endpoint}/${isbn}`);
  }
}