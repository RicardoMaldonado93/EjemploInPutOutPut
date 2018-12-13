import { Component, OnInit, Input, Output} from '@angular/core';
import { IAlumno } from '../../model/interfaces/ialumno';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumTipoDocumento } from 'src/app/model/enums/enum-tipo-documento.enum';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //@Input() unAlumno:IAlumno;
  //alumno : { nombre:string};
  formulario:FormGroup;
  EDocumento : string[];

  constructor( private _route : ActivatedRoute, private fb:FormBuilder ) { 
       
      this.EDocumento = Object.keys(EnumTipoDocumento);
      this.EDocumento = this.EDocumento.slice(this.EDocumento.length / 2);

      this.formulario = fb.group({
        nombre:[null, Validators.required],
        apellido:[null, Validators.required],
        fecha_nacimiento :[null, Validators.required],
        tipo_doc:[null, Validators.required],
        nro_doc: [null, Validators.compose([Validators.required, Validators.maxLength(8)])],
        comunidad:[null],
        leg_utn:['XXXXXX-XX', Validators.required],
        curso:[null, Validators.required],
      })
  }

  ngOnInit() {
   /* this.alumno = { nombre : this._route.snapshot.params.nombre};
    this._route.params.subscribe( (params : Params) =>{ this.alumno.nombre = params.nombre;}  )
    console.log( this.alumno.nombre);
    console.log ( this.alumno , this.unAlumno);*/
  }

  onSubmit($value){
    console.log($value);
  }

}
