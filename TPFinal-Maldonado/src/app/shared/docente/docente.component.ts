import { Component, OnInit, Input } from '@angular/core';
import { IDocente } from '../../model/interfaces/idocente';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/core/service/curso.service';
import { ICurso } from 'src/app/model/interfaces/icurso';
import { CursoComponent } from 'src/app/feature/curso-item/curso-item.component';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  @Input() unDocente : IDocente;
  
  constructor ( private ActivatedRoute: ActivatedRoute, private servicio: CursoService){}


  ngOnInit(){
    this.unDocente = { 
      id: 0,
      nombre: '',
      apellido: ''
    }
     
      this.ActivatedRoute.paramMap.subscribe( params => {
         let id = +params.get('id');
         //console.log(id);
         //this.servicio.getUnDocente(22).subscribe(data => { this.c = data.body, console.log(data.body.profesor) , console.log(this.a)} );
         this.servicio.getUnDocente(id).subscribe(data => { 

          let a ;
          for( let i=0; i< data.body.length; i++){
    
            if ( data.body[i].profesor['id'] == id ){
                 let c = data.body[i].profesor;
                 this.unDocente = {
                   id : c['id'],
                   nombre: c['nombre'],
                   apellido: c['apellido']
                 }
            };
          }
    
       });

  });
}

}
