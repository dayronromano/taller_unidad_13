import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private apiUrl = environment.apiUrl;

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.token
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  obtenerInscripciones(curso: number): Observable<any> {
    return this.http.get(this.apiUrl + 'inscripcion/' + curso, this.httpOption);
  }

  actualizarInscripcion(id: number, estado: any): Observable<any> {
    return this.http.put(this.apiUrl + 'inscripcion/' + id, estado, this.httpOption);
  }

  registrarInscripcion(inscripcion: any): Observable<any> {
    return this.http.post(this.apiUrl + 'inscripcion', inscripcion, this.httpOption);
  }

  inhabilitarInscripcion(id: number, estado: any): Observable<any> {
    return this.http.put(this.apiUrl + 'inscripcion/estado/' + id, estado, this.httpOption);
  }

}
