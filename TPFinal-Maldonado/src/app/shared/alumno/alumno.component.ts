import { Component, OnInit, Input, Output} from '@angular/core';
import { IAlumno } from '../../model/interfaces/ialumno';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { EnumTipoDocumento } from 'src/app/model/enums/enum-tipo-documento.enum';
import { CursoService } from 'src/app/core/service/curso.service';
import { Observable, Subscriber, observable } from 'rxjs';
import { AlumnoService } from 'src/app/core/service/alumno.service';
import { map, filter } from 'rxjs/operators';
import { validateConfig } from '@angular/router/src/config';
import { DatePipe } from '@angular/common';
import { ICurso } from 'src/app/model/interfaces/icurso';




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
  doc;
  datePipe = new DatePipe('en-US');
  edicion: boolean = false;
  unAlumno: IAlumno;
  curso:ICurso;
  monto: number;

  constructor( private _route : ActivatedRoute, private fb:FormBuilder, private service: CursoService, private alumnoService : AlumnoService) { 
 
      this.ListaCursos = [];
      this.EDocumento = Object.keys(EnumTipoDocumento);
      this.EDocumento = this.EDocumento.slice(this.EDocumento.length / 2);
      this.inscripcion = new FormGroup({
        
        nombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        apellido: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
        tipo_doc: new FormControl('', [Validators.required]),
        nro_doc: new FormControl('',[ Validators.compose([Validators.required, Validators.minLength(8)])]),
        fecha_nacimiento : new FormControl('',[ Validators.required]),
        comunidad: new FormControl(this.com_utn),
        leg_utn: new FormControl('', [ Validators.compose([Validators.maxLength(8), Validators.minLength(8), Validators.pattern('[0-9]*')])]),
        curso: new FormControl('', [Validators.required]),
        //montoTotal: new FormControl('')
      });
      this.service.getCurso().subscribe( resp => { resp.body.filter( curso => this.ListaCursos.push(curso.titulo));});
      this.doc = this._route.snapshot.params['doc'];
  }

  ngOnInit() {

    if(this.doc != null){
      this.edicion = true;
      this.alumnoService.getUnAlumno(this.doc).subscribe(data => { 
         this.unAlumno = data.body.find( a => a.documento == this.doc ),
         this.service.getCurso().subscribe( resp => { this.curso = resp.body.find( c => c.id == parseInt(this.unAlumno.cursos[0]))
          this.com_utn = this.unAlumno.comunidad,
          this.calcularMonto(this.unAlumno),
          this.inscripcion.setValue({
            nombre : this.unAlumno.nombre,
            apellido : this.unAlumno.apellido,
            tipo_doc: EnumTipoDocumento[this.unAlumno.tipoDocumento],
            nro_doc: this.unAlumno.documento,
            fecha_nacimiento: this.datePipe.transform(this.unAlumno.fechaNacimiento, "yyyy-MM-dd"),
            curso: this.ListaCursos.find(a => this.curso.titulo == a ),
            leg_utn : this.unAlumno.legajo,
            comunidad : <boolean>this.unAlumno.comunidad,
            
          })
          
        })
          
         
      });
      }
    else{
      this.com_utn = false;    
      
      
    }
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

    if(!this.edicion){
      
    this.service.getCurso().subscribe( resp =>  { let Curso = resp.body.find( curso => curso.titulo == value.curso );
        if(this.com_utn){
          this.NuevoAlumno.montoTotal = Curso.precio - (Curso.precio*0.2);
        }  
        else
          this.NuevoAlumno.montoTotal = Curso.precio;
        
        console.log(this.NuevoAlumno);
        this.alumnoService.AgregarAlumno(this.NuevoAlumno).subscribe(m => { alert(m.status); this.inscripcion.reset({
          tipoDocumento : -1,
          curso: -1
        }); if(m[status] == "realizado"){this.alumnoService.Alumnos.push(this.NuevoAlumno)}}); 
      }); 
      
      }
    else
    {
      this.alumnoService.ModificarAlumno(this.NuevoAlumno).subscribe(m => { alert(m.msg)});
      
    }
      
  }

  calcularMonto(value: IAlumno){
 
  let Curso;
  this.service.getCurso().subscribe( resp =>  { Curso = resp.body.find( curso => curso.id == parseInt(value.cursos[0]) );
    if(value.comunidad){
      return Curso.precio - (Curso.precio*0.2);
      
    }  
    else
      return Curso.precio;
  });

  }


}
