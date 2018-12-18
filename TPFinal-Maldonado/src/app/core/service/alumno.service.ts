import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { IAlumno } from '../../model/interfaces/ialumno';
import { Observable, of } from 'rxjs';
import { map, filter, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

   private url:string = 'http://demo3744158.mockable.io/alumno'; 

  constructor( private http : HttpClient) { }

  AgregarAlumno(alumno):Observable<any>{

    return this.http.post<IAlumno>(this.url, alumno).pipe(catchError(error =>of("ERROR:{$error}")));
  }
}
