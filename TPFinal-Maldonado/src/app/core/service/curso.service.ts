import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICurso } from '../../model/interfaces/icurso';
import { Observable } from 'rxjs';
import { IDocente } from 'src/app/model/interfaces/idocente';
import { IAlumno } from 'src/app/model/interfaces/ialumno';


 
@Injectable({
  providedIn: 'root'
})

export class CursoService {


  item: Observable<HttpResponse<ICurso>>;
  unCurso: ICurso;
  lista:ICurso[];
  prof:string[];
  inscriptos:IAlumno[];


  private URL:string = 'http://demo3744158.mockable.io/cursos';
  
   constructor( private http: HttpClient ) {

  }
   
  getCurso(): Observable<HttpResponse<ICurso[]>>{
    return  this.http.get<ICurso[]>(this.URL, { observe : 'response'});
  }
  
  getUnCurso(param:number):Observable<HttpResponse<ICurso[]>>{
    return this.http.get<ICurso[]>(this.URL, { observe : 'response'});
  }


  getUnDocente(param:number): Observable<HttpResponse<ICurso[]>>{
  
    return this.http.get<ICurso[]>(this.URL, { observe : 'response'});

  }

  setUnAlumno(param:IAlumno){
    this.inscriptos.push(param);
  }
  

}
