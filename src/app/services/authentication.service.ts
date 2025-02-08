import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private endpoint = 'https://shelfoftales.onrender.com/api/user/';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null>;

  constructor(private http: HttpClient, private tokenSrv: TokenService) {
    if (this.tokenSrv.hasToken('user')) {
      this.userSubject.next(JSON.parse(this.tokenSrv.getToken('user')));
    }
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.endpoint}signin`, { email, password })
      .pipe(
        map((response) => {
          // Verifique se o token está presente na resposta
          if (response && response.token) {
            this.tokenSrv.saveToken('user', JSON.stringify(response));
            this.getUserData().subscribe((user) => {
              this.userSubject.next(user); // Atualiza o BehaviorSubject com os dados do usuário
            });
          }
          return response;
        }),
        catchError(this.handleError<User>('login'))
      );
  }

  register(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.endpoint}signup`, user)
      .pipe(catchError(this.handleError<User>('register')));
  }

  logout() {
    this.tokenSrv.deleteToken('user');
    this.userSubject.next(null); 
  }

  hasToken() {
    return this.tokenSrv.hasToken('user');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logout();
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUserData(): Observable<User> {
    return this.http
      .get<User>(this.endpoint)
      .pipe(catchError(this.handleError<User>('getUserData')));
  }
}