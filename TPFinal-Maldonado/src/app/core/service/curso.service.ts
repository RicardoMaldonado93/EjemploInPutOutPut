import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICurso } from '../../model/interfaces/icurso';
import { Observable } from 'rxjs';


 
@Injectable({
  providedIn: 'root'
})

export class CursoService {


  item: Observable<HttpResponse<ICurso>>;
  unCurso: ICurso;
  lista:ICurso[];
  prof:string[];


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


  

}
