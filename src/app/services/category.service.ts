import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  private endpoint: string =
    'https://shelfoftales.onrender.com/api/bookcategory/';

  constructor(private http: HttpClient) {}

  // 1 - Cria uma nova categoria
  // -> Restrito a manager
  postCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(this.endpoint, newCategory);
  }

  // 2 - Obtém todas as categorias existentes
  // -> Sem restrição
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.endpoint}`);
  }
}
