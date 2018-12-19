import { Component, OnInit, Input, Output} from '@angular/core';
import { IAlumno } from '../../model/interfaces/ialumno';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EnumTipoDocumento } from 'src/app/model/enums/enum-tipo-documento.enum';
import { CursoService } from 'src/app/core/service/curso.service';
import { Observable, Subscriber, observable } from 'rxjs';
import { AlumnoService } from 'src/app/core/service/alumno.service';
import { map, filter } from 'rxjs/operators';
import { validateConfig } from '@angular/router/src/config';




@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //@Input() unAlumno:IAlumno;
  //alumno : { nombre:string};

  @Output() NuevoAlumno:IAlumno;

  submitted:boolean = false;
  com_utn:Boolean;
  inscripcion:FormGroup;
  EDocumento : string[];
  ListaCursos:Array<string>;
  cursos=[];
  
  constructor( private _route : ActivatedRoute, private fb:FormBuilder, private service: CursoService, private alumnoService : AlumnoService) { 
 
      this.ListaCursos = [];
      this.EDocumento = Object.keys(EnumTipoDocumento);
      this.EDocumento = this.EDocumento.slice(this.EDocumento.length / 2);

  }

  ngOnInit() {

    this.com_utn = false;    
    this.service.getCurso().subscribe( resp => { resp.body.filter( curso => this.ListaCursos.push(curso.titulo));});
    this.inscripcion = new FormGroup({
      
      nombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      apellido: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      tipo_doc: new FormControl('', [Validators.required]),
      nro_doc: new FormControl('',[ Validators.compose([Validators.required, Validators.minLength(8)])]),
      fecha_nacimiento : new FormControl('',[ Validators.required]),
      comunidad: new FormControl(this.com_utn),
      leg_utn: new FormControl('', [ Validators.compose([Validators.maxLength(8), Validators.minLength(8), Validators.pattern('[0-9]*')])]),
      curso: new FormControl('', [Validators.required]),
      montoTotal: new FormControl('')
    });

    
      
   
    
  }

  AgregarCurso(value){
    this.cursos.push(value);
    this.cursos.filter((el, i, a) => i == a.indexOf(el));
    console.log("cursos->" + this.cursos);
  }

  onSubmit(value){

    this.NuevoAlumno = {
        apellido: value.apellido,
        nombre: value.nombre,
        tipoDocumento: value.tipo_doc,
        documento: value.nro_doc,
        fechaNacimiento: value.fecha_nacimiento,
        comunidad: value.comunidad,
        legajo: value.leg_utn,
        cursos: this.cursos,
        montoTotal: 0
      }

    this.service.getCurso().subscribe( resp =>  { let Curso = resp.body.find( curso => curso.titulo == value.curso );
      if(this.com_utn){
        this.NuevoAlumno.montoTotal = Curso.precio - (Curso.precio*0.2);
      }  
      else
        this.NuevoAlumno.montoTotal = Curso.precio;
      
      console.log(this.NuevoAlumno);
      this.alumnoService.AgregarAlumno(this.NuevoAlumno).subscribe(m => console.log(m));

     });
    
    
    /*this.service.getCurso().subscribe( resp => { 
      let Curso = resp.body.find( curso => curso.titulo == this.NuevoAlumno.curso); 
      if(this.com_utn){
        //this.NuevoAlumno.montoTotal = Curso.precio - (Curso.precio*0.2);
      }   
      this.alumnoService.AgregarAlumno(this.NuevoAlumno).subscribe(m => console.log(m));
 // });
    console.log(this.NuevoAlumno);*/

  }
 
}
