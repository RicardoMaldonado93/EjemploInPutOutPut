import { Component, OnInit, Input, Output} from '@angular/core';
import { IAlumno } from '../../model/interfaces/ialumno';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //@Input() unAlumno:IAlumno;
  //alumno : { nombre:string};
  formulario:FormGroup;

  constructor( private _route : ActivatedRoute, private fb:FormBuilder ) { 
       
    this.formulario = fb.group({
      nombre:[null, Validators.required],
      apellido:[null, Validators.required],
      fecha_nacimiento :[null, Validators.required],
      tipo_doc:[null, Validators.required],
      nro_doc: [null, Validators.compose([Validators.required, Validators.maxLength(8)])],
      comunidad:[null],
      leg_utn:[null, Validators.required],
      curso:[null, Validators.required],
    })
  }

  ngOnInit() {
   /* this.alumno = { nombre : this._route.snapshot.params.nombre};
    this._route.params.subscribe( (params : Params) =>{ this.alumno.nombre = params.nombre;}  )
    console.log( this.alumno.nombre);
    console.log ( this.alumno , this.unAlumno);*/
  }

}
