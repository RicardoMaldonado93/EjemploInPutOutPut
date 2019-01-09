import { Component, OnInit, Input } from '@angular/core';
import { IAlumno } from 'src/app/model/interfaces/ialumno';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from 'src/app/core/service/alumno.service';
import { CursoService } from 'src/app/core/service/curso.service';
import { ICurso } from 'src/app/model/interfaces/icurso';
import { Alert } from 'selenium-webdriver';
import { WebdriverWebElement } from 'protractor/built/element';


@Component({
  selector: 'app-alumno-item',
  templateUrl: './alumno-item.component.html',
  styleUrls: ['./alumno-item.component.css']
})
export class AlumnoItemComponent implements OnInit {

    
    unCurso:ICurso;
    Lcursos:string[] = [];
  @Input() td:string;
  @Input() unAlumno : IAlumno;
  
  constructor ( private ActivatedRoute: ActivatedRoute, private servicio: AlumnoService, private cursoService:CursoService, private route : Router){}

  
  ngOnInit(){
    this.unAlumno = { 
      nombre:'',
      apellido:'',
      tipoDocumento:0,
      documento:0,
      fechaNacimiento:0,
      cursos:[],
      legajo:'',
      comunidad:false,
      montoTotal:0,
    }
     
      this.ActivatedRoute.paramMap.subscribe( params => {
         let doc = +params.get('doc');
  
         this.servicio.getUnAlumno(doc).subscribe(data => { 
          this.unAlumno = data.body.find( a => a.documento == doc );
          let monto = 0;

         for(let i=0; i< this.unAlumno.cursos.length; i++) {
            let id = Number(this.unAlumno.cursos[i]);
            this.cursoService.getUnCurso( id ).subscribe(data => { this.unCurso = data.body.find( a => a.id == id), this.Lcursos.push(this.unCurso.titulo), console.log(this.unCurso),
            this.unAlumno.cursos = this.Lcursos;
            if(this.unAlumno.comunidad == true){
              monto += this.unCurso.precio - this.unCurso.precio*0.2;
            }
            else
              monto += this.unCurso.precio;
            this.unAlumno.montoTotal = monto;


            switch(this.unAlumno.tipoDocumento.toString()){
              case '0': { this.td = "DNI"; break}
              case '1': { this.td = "LE"; break}
              default: {this.td = "ASDASDasd"; break}
            }
            console.log(this.Lcursos)}); 
        };
        
      });

  });
}

  eliminar( unAlumno: IAlumno){

    let r = confirm("Desea eliminar el registro?");
    if(r)
      this.servicio.EliminarAlumno(unAlumno).subscribe( m => alert(m.msg));
    else
      alert("no se elimino");
  }
}