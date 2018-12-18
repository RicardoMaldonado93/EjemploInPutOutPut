import { Component, OnInit, Input, Output} from '@angular/core';
import { IAlumno } from '../../model/interfaces/ialumno';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EnumTipoDocumento } from 'src/app/model/enums/enum-tipo-documento.enum';
import { CursoService } from 'src/app/core/service/curso.service';
import { Observable, Subscriber } from 'rxjs';
import { AlumnoService } from 'src/app/core/service/alumno.service';



@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  //@Input() unAlumno:IAlumno;
  //alumno : { nombre:string};

  @Output() NuevoAlumno:IAlumno;

  observable = new Observable( subscriber =>);
  submitted:boolean = false;
  com_utn:Boolean = false;
  inscripcion:FormGroup;
  EDocumento : string[];
  ListaCursos:Array<string>;
  opcionSeleccionada: string;
  
  constructor( private _route : ActivatedRoute, private fb:FormBuilder, private service: CursoService, private alumnoService : AlumnoService) { 
       
      this.ListaCursos = [];
      this.EDocumento = Object.keys(EnumTipoDocumento);
      this.EDocumento = this.EDocumento.slice(this.EDocumento.length / 2);

     // console.log(this.com_utn);

      /*this.inscripcion = fb.group({
        nombre:[null, Validators.required, Validators.pattern('[a-zA-Z ]*')],
        apellido:[null, Validators.required],
        tipo_doc:[null, Validators.required],
        nro_doc: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        fecha_nacimiento :[null, Validators.required],
        comunidad:[this.com_utn],
        leg_utn:[null,  Validators.compose([Validators.maxLength(8), Validators.minLength(8)])],
        curso:[null, Validators.required],
        montoTotal:[null],
      })*/
  }

  ngOnInit() {

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


  /*onSubmit({ value, valid }: { value: IAlumno, valid: boolean }){

    console.log(value, valid);
    
  }*/

  onSubmit(value){
    this.NuevoAlumno = <IAlumno>value;
    let monto;
    this.service.getCurso().subscribe( resp => { 
      let Curso = resp.body.find( curso => curso.titulo == this.NuevoAlumno.curso); 
      
      if(this.com_utn){
        this.NuevoAlumno.montoTotal = Curso.precio - (Curso.precio*0.2);
        console.log( this.NuevoAlumno.montoTotal);
      }   
      this.alumnoService.AgregarAlumno(this.NuevoAlumno).subscribe(m => console.log(m));
  });
    console.log(this.NuevoAlumno);

  }
 
  capturar(value){
    this.opcionSeleccionada = value;
    console.log(this.opcionSeleccionada);
  }

}
