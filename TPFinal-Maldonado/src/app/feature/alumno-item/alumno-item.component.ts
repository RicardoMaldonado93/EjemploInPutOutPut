import { Component, OnInit, Input } from '@angular/core';
import { IAlumno } from 'src/app/model/interfaces/ialumno';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from 'src/app/core/service/alumno.service';


@Component({
  selector: 'app-alumno-item',
  templateUrl: './alumno-item.component.html',
  styleUrls: ['./alumno-item.component.css']
})
export class AlumnoItemComponent implements OnInit {

    nombre:string;
    apellido:string;
    tipoDocumento:string;
    documento:number;
    fechaNacimiento:number;
    cursos:string[];
    legajo:string;
    comunidad:boolean;
    montoTotal:number;

  @Input() unAlumno : IAlumno;
  
  constructor ( private ActivatedRoute: ActivatedRoute, private servicio: AlumnoService, private route : Router){}

  
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
         console.log(doc);
         this.servicio.getUnAlumno(doc).subscribe(data => { this.unAlumno = data.body.find( a => a.documento == doc )} );
        
      })

  }

}
