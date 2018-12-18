import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest } from '@angular/common/http';
import { IAlumno } from '../../model/interfaces/ialumno';
import { Observable, of, observable } from 'rxjs';
import { map, filter, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private url:string = 'http://demo3744158.mockable.io/alumno'; 
  private url2:string = 'http://demo3744158.mockable.io/alumnos'; 

  constructor( private http : HttpClient) { }

  AgregarAlumno(alumno):Observable<any>{

    return this.http.post<IAlumno>(this.url, alumno).pipe(catchError(error =>of("ERROR:{$error}")));
  }

  AlumnosInscriptos():Observable<HttpResponse<any>>{

    return this.http.get(this.url2,{observe:'response'});
  }
}
