import { Component, OnInit, Input, Output} from '@angular/core';
import { IAlumno } from '../../model/interfaces/ialumno';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumTipoDocumento } from 'src/app/model/enums/enum-tipo-documento.enum';
import { CursoService } from 'src/app/core/service/curso.service';
import { ICurso } from 'src/app/model/interfaces/icurso';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //@Input() unAlumno:IAlumno;
  //alumno : { nombre:string};
  submitted:boolean = false;
  com_utn:Boolean = false;
  inscripcion:FormGroup;
  EDocumento : string[];
  ListaCursos:Array<string>;
  
  constructor( private _route : ActivatedRoute, private fb:FormBuilder, private service: CursoService ) { 
       
      this.ListaCursos = [];
      this.EDocumento = Object.keys(EnumTipoDocumento);
      this.EDocumento = this.EDocumento.slice(this.EDocumento.length / 2);

     // console.log(this.com_utn);

      this.inscripcion = fb.group({
        nombre:[null, Validators.required],
        apellido:[null, Validators.required],
        tipo_doc:[EnumTipoDocumento[0], Validators.required],
        nro_doc: [null, Validators.compose([Validators.required, Validators.maxLength(8)])],
        fecha_nacimiento :[null, Validators.required],
        comunidad:[null],
        leg_utn:['XXXXXX-XX', Validators.required],
        curso:[null, Validators.required],
      })
  }

  ngOnInit() {

    this.service.getCurso().subscribe( resp => { resp.body.filter( curso => this.ListaCursos.push(curso.titulo));});
    
  }

  get f() { return this.inscripcion.controls; }

  onSubmit({ value, valid }: { value: IAlumno, valid: boolean }){

    console.log(value, valid);
    
  }

 

}
